/* FieldShift — Pure deterministic ranking & sensitivity engine (browser + Node) */
(function (root) {
  "use strict";

  var PRESETS = [
    {
      id: "balanced",
      labelTh: "สมดุลทุกด้าน (ค่าเริ่มต้น)",
      labelEn: "Balanced Priorities",
      weights: { yield: 3, water: 3, income: 3, soil: 3, risk: 3 }
    },
    {
      id: "cash",
      labelTh: "เน้นรายได้เสริม (มีน้ำเสริม)",
      labelEn: "Cash Income (Have Water)",
      weights: { yield: 4, water: 2, income: 5, soil: 2, risk: 2 }
    },
    {
      id: "drought",
      labelTh: "แล้งมาก / ห่วงเรื่องน้ำที่สุด",
      labelEn: "Water-Scarce / Minimize Risk",
      weights: { yield: 1, water: 5, income: 1, soil: 3, risk: 5 }
    },
    {
      id: "soil",
      labelTh: "ดินโทรม / อยากบำรุงดินและลดปุ๋ย",
      labelEn: "Rebuild Soil & Save Fertilizer",
      weights: { yield: 2, water: 4, income: 2, soil: 5, risk: 3 }
    }
  ];

  function normalizeWeights(raw) {
    var dims = ["yield", "water", "income", "soil", "risk"];
    var out = {};
    var sum = 0;
    dims.forEach(function (d) {
      var v = raw && typeof raw[d] === "number" ? raw[d] : 3;
      v = Math.max(1, Math.min(5, Math.round(v)));
      out[d] = v;
      sum += v;
    });
    return { weights: out, sum: sum };
  }

  function topDimensions(weights) {
    var maxVal = 0;
    var tops = [];
    Object.keys(weights).forEach(function (k) {
      if (weights[k] > maxVal) {
        maxVal = weights[k];
        tops = [k];
      } else if (weights[k] === maxVal) {
        tops.push(k);
      }
    });
    return { maxVal: maxVal, dims: tops };
  }

  function buildReasons(topId, weights, data, isTied) {
    var dimsInfo = topDimensions(weights);
    var primary = dimsInfo.dims[0];
    var d24 = data.summary;

    if (isTied) {
      return {
        th: "คะแนนรวมใกล้เคียงกัน (" + topId + " สูสีกับอีกทางเลือก): ไม่มีคำตอบเดียวที่ดีที่สุดสำหรับทุกแปลง — ถ้าแปลงมีน้ำชลประทานเสริม 2–3 ครั้งและเน้นรายได้ให้เลื่อน \"รายได้เสริม\" ขึ้น แต่ถ้าน้ำน้อยหรืออยากฟื้นดินให้เลื่อน \"น้ำ\" หรือ \"สุขภาพดิน\" ขึ้น",
        en: "Top options are tied under equal weights: there is no single universal winner. Slide \"Extra Income\" up if you have 2–3 supplemental irrigations, or raise \"Water Use\" / \"Soil Health\" if water is tight."
      };
    }

    if (topId === "B") {
      if (primary === "income" || primary === "yield") {
        return {
          th: "ถ้าเน้นผลผลิตและรายได้: B (ถั่วเขียว ชัยนาท 84-1) ขึ้นอันดับ 1 เพราะเก็บเกี่ยวไว 65 วัน (พ.ย.–ม.ค.) คาดได้ ~153 กก./ไร่ ราคาหน้าฟาร์ม ~23 บ./กก. (กำไร ~1,156 บ./ไร่ [ค่าประมาณ สศก.]) — แต่ต้องย้ำว่า พ.ย.–ม.ค. 2024 ฝนมีแค่ " + d24.novJan2024Mm + " มม. จึงต้องมีน้ำเสริม 2–3 ครั้ง",
          en: "When yield & income lead: B (Chai Nat 84-1 mungbean) ranks #1 via a 65-day harvest (~153 kg/rai at ~23 THB/kg, est. ~1,156 THB/rai net). Caveat: Nov–Jan 2024 rainfall was only " + d24.novJan2024Mm + " mm, so 2–3 irrigations are essential."
        };
      }
      return {
        th: "B (ถั่วเขียว ชัยนาท 84-1) ได้อันดับ 1 จากน้ำหนักที่คุณตั้งไว้ โดยช่วยสร้างรายได้เสริมหลังนาใน 65 วันก่อนอากาศร้อน 42.9°C — ทั้งนี้แปลงยังต้องอาศัยความชื้นดินร่วน + น้ำชลประทานเสริมช่วงออกดอกด้วย",
        en: "B (Chai Nat 84-1 mungbean) ranks #1 for your weights, delivering cash return within 65 days before 42.9°C heat — provided supplemental irrigation is available during flowering."
      };
    }

    if (topId === "C") {
      if (primary === "soil") {
        return {
          th: "ถ้าสุขภาพดินสำคัญที่สุด: C (ปอเทือง 50–60 วัน) ดีกว่า A และ B เพราะเติมต้น–ใบสด 1.5–3.0 ตัน/ไร่ และให้ไนโตรเจน ~10–20 กก.N/ไร่ (เทียบเท่ายูเรีย 15 กก./ไร่) ช่วยฟื้นชั้นดิน 5–15 ซม. ที่ SoilGrids พบว่าคาร์บอนเหลือแค่ 1.23%",
          en: "When soil health leads: C (Sunn hemp cover, 50–60 d) outperforms A and B by adding 1.5–3.0 t/rai biomass and ~10–20 kg N/rai (15 kg urea equivalent), directly rebuilding the 5–15 cm subsoil (1.23% SOC)."
        };
      }
      if (primary === "water") {
        return {
          th: "ถ้าน้ำสำคัญที่สุด: C (ปอเทืองคลุมดิน 50–60 วัน) เหมาะกว่า B เพราะมีรากแก้วลึกทนแล้งและอาศัยความชื้นตกค้างหลังเกี่ยวข้าว พ.ย. (ไม่ต้องให้น้ำตลอดฤดูแบบถั่วเขียว — อาจให้น้ำช่วยงอกแค่ 1 ครั้งถ้าดินแห้ง และห้ามน้ำขัง >2 วัน)",
          en: "When water efficiency leads: C (Sunn hemp cover) beats B thanks to deep roots using Nov residual paddy moisture without multiple pod-fill irrigations (only 1 start watering if dry; drain standing water)."
        };
      }
      return {
        th: "C (ปอเทืองคลุมดิน) ได้อันดับ 1 ตามน้ำหนักของคุณ เพราะสมดุลระหว่างการใช้น้ำแล้งน้อย (~28.8 มม. ฝน พ.ย.–ก.พ. ไม่พอปลูกพืชให้น้ำมาก) และการเพิ่มอินทรียวัตถุ–ลดปุ๋ยเคมีให้ข้าวนาปีรอบถัดไป",
        en: "C (Sunn hemp cover) ranks #1 under your priorities by balancing low dry-season water demand against strong soil organic matter and nitrogen benefits before next season's rice."
      };
    }

    // topId === "A"
    return {
      th: "ถ้าน้ำและความเสี่ยงหน้าแล้งสำคัญที่สุด: A (ข้าวเดี่ยว ปล่อยว่าง พ.ย.–เม.ย.) ปลอดภัยสุดด้านการขาดน้ำ เพราะช่วง พ.ย.–ก.พ. 2024 แปลงนี้มีฝนรวมแค่ " + d24.novFeb2024Mm + " มม. (ค่าเฉลี่ย 25 ปี ~" + d24.novFebClimMm + " มม.) จึงไม่เสี่ยงเมล็ดตายเมื่อไม่มีน้ำคลองเสริม แต่จะไม่ได้รายได้หรือปุ๋ยพืชสดเสริม",
      en: "When saving dry-season water and avoiding failure lead: A (rice-only fallow) ranks #1 because Nov–Feb 2024 rainfall totaled only " + d24.novFeb2024Mm + " mm (~" + d24.novFebClimMm + " mm 25y norm), eliminating drought-crop loss risk at zero input cost."
    };
  }

  function rankStrategies(rawWeights, data) {
    var norm = normalizeWeights(rawWeights);
    var weights = norm.weights;
    var sumW = norm.sum;
    var order = ["A", "B", "C"];

    var ranked = order.map(function (id) {
      var st = data.strategies[id];
      var weightedSum = 0;
      var breakdown = {};
      data.dimensions.forEach(function (dim) {
        var contribution = weights[dim.id] * st.scores[dim.id];
        weightedSum += contribution;
        breakdown[dim.id] = {
          weight: weights[dim.id],
          score: st.scores[dim.id],
          contribution: contribution
        };
      });
      var avgScore = +(weightedSum / sumW).toFixed(2);
      return {
        id: id,
        strategy: st,
        score: avgScore,
        pct: Math.round((avgScore / 5) * 100),
        breakdown: breakdown
      };
    });

    // Deterministic tie-break order: C (balanced low-water soil builder) -> B -> A when strictly tied
    var tieOrder = { C: 0, B: 1, A: 2 };
    ranked.sort(function (x, y) {
      if (Math.abs(y.score - x.score) > 0.005) return y.score - x.score;
      return tieOrder[x.id] - tieOrder[y.id];
    });

    var isTied = Math.abs(ranked[0].score - ranked[1].score) <= 0.005;
    var reasons = buildReasons(ranked[0].id, weights, data, isTied);

    return {
      weights: weights,
      ranked: ranked,
      isTied: isTied,
      winnerId: ranked[0].id,
      reasonTh: reasons.th,
      reasonEn: reasons.en
    };
  }

  function findSingleSliderFlips(rawWeights, data) {
    var base = rankStrategies(rawWeights, data);
    var flips = [];

    data.dimensions.forEach(function (dim) {
      var candidates = [5, 1];
      for (var i = 0; i < candidates.length; i++) {
        var targetVal = candidates[i];
        if (base.weights[dim.id] === targetVal) continue;
        var nextW = Object.assign({}, base.weights);
        nextW[dim.id] = targetVal;
        var trial = rankStrategies(nextW, data);
        if (!trial.isTied && (trial.winnerId !== base.winnerId || base.isTied)) {
          flips.push({
            dimId: dim.id,
            dimTh: dim.th.replace(/^\d+\.\s*/, ""),
            dimEn: dim.en.replace(/^\d+\.\s*/, ""),
            fromVal: base.weights[dim.id],
            toVal: targetVal,
            fromWinner: base.winnerId,
            toWinner: trial.winnerId,
            newWeights: nextW
          });
          break;
        }
      }
    });

    return {
      currentWinner: base.winnerId,
      isCurrentTied: base.isTied,
      singleSliderFlips: flips,
      presetOutcomes: PRESETS.map(function (p) {
        var res = rankStrategies(p.weights, data);
        return {
          preset: p,
          winnerId: res.winnerId,
          isTied: res.isTied,
          topScore: res.ranked[0].score
        };
      })
    };
  }

  var FIELDSHIFT_ENGINE = {
    PRESETS: PRESETS,
    normalizeWeights: normalizeWeights,
    rankStrategies: rankStrategies,
    findSingleSliderFlips: findSingleSliderFlips
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = FIELDSHIFT_ENGINE;
  }
  root.FIELDSHIFT_ENGINE = FIELDSHIFT_ENGINE;
})(typeof globalThis !== "undefined" ? globalThis : window);
