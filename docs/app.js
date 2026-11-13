/* FieldShift — Client-side renderer (Slice 1 foundation) */
(function () {
  "use strict";

  var DATA = window.FIELDSHIFT_DATA;
  var state = {
    lang: "th",
    climateMode: "2024" // "2024" | "clim"
  };

  var UI = {
    th: {
      title: "FieldShift — ช่วยตัดสินใจปลูกพืชหลังนา",
      subtitle: "ข้อมูลจริงจาก NASA POWER & SoilGrids · ต.ชัยนาม อ.วังทอง จ.พิษณุโลก",
      banner: "ข้อมูลย้อนหลังเชิงเปรียบเทียบเท่านั้น — ไม่ใช่การพยากรณ์อากาศ และไม่รับประกันผลผลิต",
      nav1: "1. อากาศ-ดินจริง",
      nav2: "2. เทียบ 3 แนวทาง",
      nav3: "3. เลือกตามใจคุณ",
      s1Title: "1. สภาพอากาศและดินจริงของแปลงนี้ (Slice 1)",
      s1Desc: "พืชหลักคือ ข้าวนาปี (พ.ค.–ต.ค.) ช่องว่างฤดูแล้ง พ.ย.–เม.ย. คือช่วงที่ตัดสินใจว่าจะปล่อยว่างหรือปลูกพืชหลังนา",
      badgeReal: "ข้อมูลจริง",
      kpiAnnual: "ฝนรวมทั้งปี",
      kpiWet: "ฝนฤดูฝน (พ.ค.–ต.ค.)",
      kpiDryCore: "ฝนต้นแล้ง (พ.ย.–ก.พ.)",
      kpiMaxMin: "ร้อนสุด / หนาวสุด (2024)",
      chartTitle: "ปริมาณฝนรายเดือน (มม.) และอุณหภูมิ (°C)",
      mode2024: "ปีจริง 2024",
      modeClim: "ค่าเฉลี่ย 25 ปี (2001–2025)",
      legendWet: "ฝนฤดูฝน (พ.ค.–ต.ค.)",
      legendDry: "ฝนฤดูแล้ง (พ.ย.–เม.ย.)",
      legendTmax: "อุณหภูมิสูงสุดเฉลี่ย (°C)",
      legendTmin: "อุณหภูมิต่ำสุดเฉลี่ย (°C)",
      legendTmean: "อุณหภูมิเฉลี่ย 25 ปี (°C)",
      insight2024: "ปี 2024 ฝนเริ่มตกจริงราว 6 พ.ค. (รวม พ.ค.–ต.ค. 1,250.4 มม.) แต่ช่วง พ.ย.–ก.พ. 4 เดือนรวมกันมีฝนแค่ 28.8 มม. (พ.ย. 18.9, ธ.ค. 0.5, ม.ค. 9.0, ก.พ. 0.4) มี.ค. มีพายุฤดูร้อน 75.8 มม. และ เม.ย.–พ.ค. ร้อนพุ่งถึง 42.9°C",
      insightClim: "ค่าเฉลี่ย 25 ปี (2001–2025): ฝนสูงสุด ก.ย. 7.86 มม./วัน (~235.8 มม.) ต่ำสุด ธ.ค. 0.29 มม./วัน (~9.0 มม.) — ฝนรวม พ.ย.–ก.พ. เฉลี่ยแค่ ~52.6 มม. แทบไม่มีฝนตลอด 4 เดือนหลังเกี่ยวข้าว",
      soilHeading: "สภาพดินจริงจาก SoilGrids v2 (0–5 ซม. และ 5–15 ซม.)",
      soilTextureLabel: "เนื้อดิน",
      soilSilt: "ทรายแป้ง (Silt)",
      soilClay: "ดินเหนียว (Clay)",
      soilSand: "ทราย (Sand)",
      soilPh: "กรด-ด่าง (pH)",
      soilSoc: "อินทรีย์คาร์บอน (SOC)",
      soilNote: "ดินร่วนช่วยอุ้มความชื้นหลังเกี่ยวข้าวได้ดีกว่าดินทราย และ pH 6.1 เหมาะกับการตรึงไนโตรเจนของพืชตระกูลถั่ว (6.0–7.0) แต่ชั้นล่าง 5–15 ซม. คาร์บอนลดลงเหลือ 1.23% ควรเติมอินทรียวัตถุ",
      pinHeading: "พิกัดแปลง & ขอบเขตกริด NASA POWER",
      pinCoord: "พิกัดแปลง",
      pinGrid: "ศูนย์กลางกริด POWER",
      pinElev: "ความสูงกริดโดยประมาณ",
      openGmaps: "เปิดใน Google Maps",
      openOsm: "เปิดใน OpenStreetMap",
      limitsTitle: "ข้อจำกัดของข้อมูลที่ต้องบอกตรงๆ:",
      limitsBody: "NASA POWER ใช้ข้อมูลกริดระดับ ~50 กม. (เป็นค่าภาพรวมพื้นที่ ไม่ใช่เครื่องวัดฝนในแปลงโดยตรง) และ SoilGrids เป็นข้อมูลประเมินเชิงพื้นที่ 250 ม. เครื่องมือนี้เปรียบเทียบทางเลือกจากอดีต — ไม่สามารถพยากรณ์อากาศปีหน้าหรือรับประกันผลผลิตได้",
      s2Title: "2. เปรียบเทียบ 3 กลยุทธ์ (Slice 2)",
      s2Desc: "ข้าวนาปีเป็นพืชหลักเหมือนกันทั้ง 3 แนวทาง ต่างกันเฉพาะการจัดการช่วงฤดูแล้ง พ.ย.–เม.ย. (ทุกช่องระบุแหล่งที่มาชัด — ยังไม่มีคะแนนรวมจนกว่าคุณจะเลือกน้ำหนักในขั้นถัดไป)",
      s2DimHeader: "ด้านที่เปรียบเทียบ",
      s2WaterTitle: "ฝนจริงรายเดือน vs ความต้องการน้ำช่วงฤดูแล้ง (พ.ย.–เม.ย.)",
      s2WaterCaption: "ฝน พ.ย.–ม.ค. 2024 รวมแค่ 28.4 มม. (25 ปีเฉลี่ย ~39.6 มม.) — ถั่วเขียวชัยนาท 84-1 ต้องการน้ำทั้งฤดู ~219–250 มม. (350–400 ลบ.ม./ไร่) จึงต้องให้น้ำเสริม 2–3 ครั้ง ส่วนปอเทืองโหมดคลุมดิน 50–60 วันอาศัยความชื้นดินตกค้างหลังนาเป็นหลัก (อาจช่วยงอก 1 ครั้งหากดินแห้ง)",
      s2CalTitle: "ปฏิทินฤดูกาล 12 เดือน (ข้าวหลัก พ.ค.–ต.ค. + พืชหลังนา พ.ย.–เม.ย.)",
      s2CalCaption: "ทั้ง B (65 วัน) และ C (โหมดคลุมดิน 50–60 วัน) จบก่อนมี.ค.–เม.ย. ที่อากาศร้อนสุด 42.9°C และเว้นพักแปลงหลายเดือนก่อนฝน พ.ค. จึงไม่แย่งน้ำกับข้าว",
      s2NoScoreNote: "หมายเหตุ: หน้านี้ไม่แสดง \"คะแนนรวม\" หรือบอกว่าทางไหนดีที่สุด เพราะคำว่าดีกว่าขึ้นกับความสำคัญของชาวนาแต่ละแปลง (ไปกำหนดในส่วนที่ 3 ด้านล่าง)",
      badgeOfficial: "ข้อมูลราชการ/วิชาการ",
      badgeEstimate: "ค่าประมาณ/สมมติฐาน",
      footer: "FieldShift · NASA Space Apps Challenge 2026 (Challenge 7: Field Shift) · ข้อมูลฝังในหน้าเว็บ ไม่เรียก API ภายนอกตอนใช้งาน"
    },
    en: {
      title: "FieldShift — Post-Rice Crop Decision Support",
      subtitle: "Built on real NASA POWER & SoilGrids data · Chai Nam, Wang Thong, Phitsanulok",
      banner: "Historical comparison only — NOT a weather forecast and NOT a yield guarantee",
      nav1: "1. Climate & Soil",
      nav2: "2. Compare 3 Strategies",
      nav3: "3. Farmer Priorities",
      s1Title: "1. Real Climate & Soil Profile for This Field (Slice 1)",
      s1Desc: "Rice stays the main rainy-season crop (May–Oct). The dry-season gap (Nov–Apr) is where farmers weigh fallow vs a second crop.",
      badgeReal: "Real Data",
      kpiAnnual: "Annual Rainfall",
      kpiWet: "Wet Season (May–Oct)",
      kpiDryCore: "Early Dry Rain (Nov–Feb)",
      kpiMaxMin: "2024 Peak / Lowest Temp",
      chartTitle: "Monthly Rainfall (mm) & Temperature (°C)",
      mode2024: "2024 Daily Actuals",
      modeClim: "25-Year Norm (2001–2025)",
      legendWet: "Wet months (May–Oct)",
      legendDry: "Dry months (Nov–Apr)",
      legendTmax: "Mean daily Tmax (°C)",
      legendTmin: "Mean daily Tmin (°C)",
      legendTmean: "25y Mean T2M (°C)",
      insight2024: "In 2024, sustained rain began around 6 May (May–Oct total 1,250.4 mm). Nov–Feb summed only 28.8 mm across 4 months (Nov 18.9, Dec 0.5, Jan 9.0, Feb 0.4), March saw 75.8 mm of pre-monsoon storms, and heat spiked to 42.9°C.",
      insightClim: "25-year climatology (2001–2025): wettest in Sep (7.86 mm/day, ~235.8 mm) and driest in Dec (0.29 mm/day, ~9.0 mm). Nov–Feb averages only ~52.6 mm combined.",
      soilHeading: "Soil Profile from ISRIC SoilGrids v2 (0–5 cm & 5–15 cm)",
      soilTextureLabel: "USDA Texture",
      soilSilt: "Silt",
      soilClay: "Clay",
      soilSand: "Sand",
      soilPh: "Soil pH (H2O)",
      soilSoc: "Organic Carbon (SOC)",
      soilNote: "Loam retains post-harvest paddy moisture better than sandy soil, and pH 6.1 sits inside the 6.0–7.0 sweet spot for legume nodulation. Subsoil (5–15 cm) SOC drops to 1.23%, favoring organic matter addition.",
      pinHeading: "Observed Field Pin & NASA POWER Grid",
      pinCoord: "Field Coordinates",
      pinGrid: "POWER Grid Point",
      pinElev: "Grid Elevation",
      openGmaps: "Open Google Maps",
      openOsm: "Open OpenStreetMap",
      limitsTitle: "Plain-spoken data limitations:",
      limitsBody: "NASA POWER represents a ~50 km grid cell (not an on-farm rain gauge) and SoilGrids is a 250 m spatial estimate. This tool compares historical patterns — it never forecasts next season's weather or guarantees yields.",
      s2Title: "2. Compare 3 Strategies (Slice 2)",
      s2Desc: "Rainy-season rice remains the main crop in all 3 strategies; options differ only in Nov–Apr dry-season management. Every cell cites its source — NO single score is shown before you choose your priorities below.",
      s2DimHeader: "Dimension",
      s2WaterTitle: "Dry-Season Rainfall vs Crop Water Demand (Nov–Apr)",
      s2WaterCaption: "Nov–Jan 2024 rainfall totaled just 28.4 mm (~39.6 mm 25y norm). Chai Nat 84-1 mungbean needs ~219–250 mm (350–400 m³/rai) across 65 days, requiring 2–3 irrigations. Sunn hemp cover (50–60 d) relies mostly on Nov post-rice soil moisture (+1 light start watering if dry).",
      s2CalTitle: "Unified 12-Month Crop Calendar (Main Rice May–Oct + Dry-Season Nov–Apr)",
      s2CalCaption: "Both B (65 d mungbean) and C (50–60 d cover plough-in) finish by Feb/Jan — safely avoiding the Mar–Apr >40°C heat spike (up to 42.9°C) and leaving months before May rice.",
      s2NoScoreNote: "No composite score is shown here: what counts as \"better\" depends on each farmer's own priorities in Section 3 below.",
      badgeOfficial: "Official / Research",
      badgeEstimate: "Estimate / Assumption",
      footer: "FieldShift · NASA Space Apps Challenge 2026 (Challenge 7: Field Shift) · Static offline-first web app with embedded datasets"
    }
  };

  function t(key) {
    return UI[state.lang][key] || key;
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderTopbar() {
    var fieldName = state.lang === "th" ? DATA.field.nameTh : DATA.field.nameEn;
    document.getElementById("topbar").innerHTML =
      '<div class="container">' +
        '<div class="topbar-row">' +
          '<div class="brand">' +
            '<div class="brand-mark" aria-hidden="true">' +
              '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M12 22v-9"></path><path d="M12 13C12 8 16 4 21 4c0 5-4 9-9 9Z"></path><path d="M12 16C12 11 8 7 3 7c0 5 4 9 9 9Z"></path>' +
              '</svg>' +
            '</div>' +
            '<div>' +
              '<h1>' + esc(t("title")) + '</h1>' +
              '<p class="brand-sub">' + esc(t("subtitle")) + ' · ' + esc(fieldName) + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="topbar-controls">' +
            '<div class="lang-toggle" role="group" aria-label="Language toggle">' +
              '<button type="button" class="lang-btn ' + (state.lang === "th" ? "active" : "") + '" data-lang="th">ไทย</button>' +
              '<button type="button" class="lang-btn ' + (state.lang === "en" ? "active" : "") + '" data-lang="en">EN</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="disclaimer-banner">' +
          '<strong>!</strong> <span>' + esc(t("banner")) + '</span>' +
        '</div>' +
      '</div>';

    document.getElementById("nav-strip").innerHTML =
      '<div class="container nav-pills">' +
        '<a class="nav-pill" href="#slice-1">' + esc(t("nav1")) + '</a>' +
        '<a class="nav-pill" href="#slice-2">' + esc(t("nav2")) + '</a>' +
        '<a class="nav-pill" href="#slice-3">' + esc(t("nav3")) + '</a>' +
      '</div>';

    var langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.lang = btn.getAttribute("data-lang");
        document.documentElement.lang = state.lang;
        renderAll();
      });
    });
  }

  function renderClimateSvg() {
    var w = 720;
    var h = 290;
    var padL = 46;
    var padR = 42;
    var padT = 22;
    var padB = 42;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var maxRain = 280;
    var minTemp = 10;
    var maxTemp = 45;
    var is2024 = state.climateMode === "2024";

    function yRain(mm) {
      return padT + plotH - (Math.min(mm, maxRain) / maxRain) * plotH;
    }

    function yTemp(c) {
      return padT + plotH - ((c - minTemp) / (maxTemp - minTemp)) * plotH;
    }

    var gridLines = [0, 70, 140, 210, 280].map(function (v) {
      var y = yRain(v).toFixed(1);
      return '<line x1="' + padL + '" y1="' + y + '" x2="' + (w - padR) + '" y2="' + y + '" stroke="#e2ece6" stroke-dasharray="3,3" />' +
        '<text x="' + (padL - 6) + '" y="' + (+y + 4) + '" text-anchor="end" font-size="11" fill="#4b6159">' + v + '</text>';
    }).join("");

    var rightAxis = [15, 25, 35, 45].map(function (c) {
      var y = yTemp(c).toFixed(1);
      return '<text x="' + (w - padR + 6) + '" y="' + (+y + 4) + '" text-anchor="start" font-size="11" fill="#b45309">' + c + '°</text>';
    }).join("");

    var colW = plotW / 12;
    var barW = Math.max(18, colW * 0.56);
    var bars = [];
    var ptsMax = [];
    var ptsMin = [];
    var labels = [];

    DATA.monthly.forEach(function (m, i) {
      var cx = padL + colW * (i + 0.5);
      var rain = is2024 ? m.d2024RainMonth : m.climRainMonth;
      var y = yRain(rain);
      var bh = Math.max(2, padT + plotH - y);
      var fill = m.season === "wet" ? "#0d9488" : "#eab308";
      bars.push(
        '<rect x="' + (cx - barW / 2).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="4" fill="' + fill + '" opacity="0.88"></rect>' +
        '<text x="' + cx.toFixed(1) + '" y="' + (y - 4).toFixed(1) + '" text-anchor="middle" font-size="10" font-weight="700" fill="#0f1f1a">' + Math.round(rain) + '</text>'
      );
      if (is2024) {
        ptsMax.push(cx.toFixed(1) + "," + yTemp(m.d2024MeanTmax).toFixed(1));
        ptsMin.push(cx.toFixed(1) + "," + yTemp(m.d2024MeanTmin).toFixed(1));
      } else {
        ptsMax.push(cx.toFixed(1) + "," + yTemp(m.climTemp).toFixed(1));
      }
      var mLabel = state.lang === "th" ? m.th : m.en;
      labels.push('<text x="' + cx.toFixed(1) + '" y="' + (h - 16) + '" text-anchor="middle" font-size="11" font-weight="600" fill="#1f352e">' + esc(mLabel) + '</text>');
    });

    var tempLines = '<polyline fill="none" stroke="#dc2626" stroke-width="2.6" points="' + ptsMax.join(" ") + '" />';
    if (is2024) {
      tempLines += '<polyline fill="none" stroke="#2563eb" stroke-width="2.2" stroke-dasharray="4,3" points="' + ptsMin.join(" ") + '" />';
    }

    var dots = DATA.monthly.map(function (m, i) {
      var cx = (padL + colW * (i + 0.5)).toFixed(1);
      var cHigh = is2024 ? m.d2024MeanTmax : m.climTemp;
      var out = '<circle cx="' + cx + '" cy="' + yTemp(cHigh).toFixed(1) + '" r="3.4" fill="#dc2626" stroke="#fff" stroke-width="1" />';
      if (is2024) {
        out += '<circle cx="' + cx + '" cy="' + yTemp(m.d2024MeanTmin).toFixed(1) + '" r="3" fill="#2563eb" stroke="#fff" stroke-width="1" />';
      }
      return out;
    }).join("");

    return '<svg class="svg-chart" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Monthly rainfall and temperature chart">' +
      '<text x="' + padL + '" y="13" font-size="11" font-weight="700" fill="#0f766e">mm</text>' +
      '<text x="' + (w - padR) + '" y="13" text-anchor="end" font-size="11" font-weight="700" fill="#b45309">°C</text>' +
      gridLines + rightAxis + bars.join("") + tempLines + dots + labels.join("") +
      '</svg>';
  }

  function renderLocatorSvg() {
    var f = DATA.field;
    return '<svg class="svg-chart" viewBox="0 0 360 155" role="img" aria-label="Field location and NASA POWER grid schematic">' +
      '<rect x="1" y="1" width="358" height="153" rx="10" fill="#eef6f1" stroke="#b8ccc0" />' +
      '<rect x="65" y="20" width="230" height="115" rx="6" fill="#d9ece1" stroke="#0f766e" stroke-dasharray="5,4" stroke-width="1.5" />' +
      '<text x="180" y="37" text-anchor="middle" font-size="11" font-weight="700" fill="#0f766e">NASA POWER Grid Cell (~50 km)</text>' +
      '<circle cx="180" cy="82" r="24" fill="#16a34a" opacity="0.16" />' +
      '<circle cx="180" cy="82" r="8" fill="#dc2626" stroke="#fff" stroke-width="2" />' +
      '<text x="180" y="110" text-anchor="middle" font-size="11.5" font-weight="800" fill="#0f1f1a">' + f.lat.toFixed(6) + 'N, ' + f.lon.toFixed(6) + 'E</text>' +
      '<text x="180" y="126" text-anchor="middle" font-size="10.5" fill="#4b6159">' + esc(state.lang === "th" ? f.nameTh : f.nameEn) + '</text>' +
      '</svg>';
  }

  function renderSlice1() {
    var is2024 = state.climateMode === "2024";
    var s = DATA.summary;
    var soil0 = DATA.soil.surface0to5;
    var soil5 = DATA.soil.sub5to15;
    var annual = is2024 ? s.annual2024Mm : s.annualClimMm;
    var wet = is2024 ? s.wet2024Mm : s.wetClimMm;
    var dryCore = is2024 ? s.novFeb2024Mm : s.novFebClimMm;
    var unitMm = state.lang === "th" ? " มม." : " mm";
    var fieldNote = state.lang === "th" ? DATA.field.noteTh : DATA.field.noteEn;
    var onset = state.lang === "th" ? s.rainOnset2024Th : s.rainOnset2024En;
    var maxDate = state.lang === "th" ? s.maxTemp2024DateTh : s.maxTemp2024DateEn;
    var minDate = state.lang === "th" ? s.minTemp2024DateTh : s.minTemp2024DateEn;
    var peakClim = state.lang === "th" ? s.peakClimMonthTh : s.peakClimMonthEn;
    var dryClim = state.lang === "th" ? s.driestClimMonthTh : s.driestClimMonthEn;

    return '<section class="section-card" id="slice-1">' +
      '<div class="section-head">' +
        '<div>' +
          '<h2>' + esc(t("s1Title")) + '</h2>' +
          '<p class="section-desc">' + esc(t("s1Desc")) + '</p>' +
        '</div>' +
        '<span class="badge badge-real">' + esc(t("badgeReal")) + ': NASA POWER + SoilGrids</span>' +
      '</div>' +
      '<div class="kpi-grid">' +
        '<div class="kpi-box"><div class="kpi-label">' + esc(t("kpiAnnual")) + '</div><div class="kpi-val">' + annual.toLocaleString() + unitMm + '</div><div class="kpi-sub">' + esc(is2024 ? "NASA POWER Daily 2024" : "25y Mean (2001–2025)") + '</div></div>' +
        '<div class="kpi-box"><div class="kpi-label">' + esc(t("kpiWet")) + '</div><div class="kpi-val">' + wet.toLocaleString() + unitMm + '</div><div class="kpi-sub">' + esc(is2024 ? onset : peakClim) + '</div></div>' +
        '<div class="kpi-box"><div class="kpi-label">' + esc(t("kpiDryCore")) + '</div><div class="kpi-val" style="color:var(--red);">' + dryCore + unitMm + '</div><div class="kpi-sub">' + esc(is2024 ? (state.lang === "th" ? "พ.ย. 18.9 / ธ.ค. 0.5 / ม.ค. 9 / ก.พ. 0.4" : "Nov 18.9 / Dec 0.5 / Jan 9 / Feb 0.4") : dryClim) + '</div></div>' +
        '<div class="kpi-box"><div class="kpi-label">' + esc(t("kpiMaxMin")) + '</div><div class="kpi-val">' + s.maxTemp2024C.toFixed(1) + '° / ' + s.minTemp2024C.toFixed(1) + '°</div><div class="kpi-sub">' + esc(maxDate + " / " + minDate) + '</div></div>' +
      '</div>' +
      '<div class="chart-box">' +
        '<div class="chart-header">' +
          '<span class="chart-title">' + esc(t("chartTitle")) + '</span>' +
          '<div class="segmented" role="group" aria-label="Climate mode">' +
            '<button type="button" class="seg-btn ' + (is2024 ? "active" : "") + '" data-cmode="2024">' + esc(t("mode2024")) + '</button>' +
            '<button type="button" class="seg-btn ' + (!is2024 ? "active" : "") + '" data-cmode="clim">' + esc(t("modeClim")) + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="chart-legend">' +
          '<span class="legend-item"><span class="swatch" style="background:#0d9488"></span>' + esc(t("legendWet")) + '</span>' +
          '<span class="legend-item"><span class="swatch" style="background:#eab308"></span>' + esc(t("legendDry")) + '</span>' +
          '<span class="legend-item"><span class="swatch" style="background:#dc2626"></span>' + esc(is2024 ? t("legendTmax") : t("legendTmean")) + '</span>' +
          (is2024 ? '<span class="legend-item"><span class="swatch" style="background:#2563eb"></span>' + esc(t("legendTmin")) + '</span>' : '') +
        '</div>' +
        renderClimateSvg() +
        '<p class="section-desc" style="margin-top:6px;">' + esc(is2024 ? t("insight2024") : t("insightClim")) + '</p>' +
      '</div>' +
      '<div class="split-grid">' +
        '<div class="sub-panel">' +
          '<h3>' + esc(t("soilHeading")) + '</h3>' +
          '<div><strong>' + esc(t("soilTextureLabel")) + ':</strong> ' + esc(state.lang === "th" ? DATA.soil.textureTh : DATA.soil.textureEn) + ' (0–5 cm)</div>' +
          '<div class="soil-bars" aria-hidden="true">' +
            '<div class="soil-silt" style="width:' + soil0.siltPct + '%"></div>' +
            '<div class="soil-clay" style="width:' + soil0.clayPct + '%"></div>' +
            '<div class="soil-sand" style="width:' + soil0.sandPct + '%"></div>' +
          '</div>' +
          '<ul class="meta-list">' +
            '<li>' + esc(t("soilSilt")) + ': <strong>' + soil0.siltPct + '%</strong> · ' + esc(t("soilClay")) + ': <strong>' + soil0.clayPct + '%</strong> · ' + esc(t("soilSand")) + ': <strong>' + soil0.sandPct + '%</strong></li>' +
            '<li>' + esc(t("soilPh")) + ': <strong>' + soil0.ph + '</strong> (0–15 cm)</li>' +
            '<li>' + esc(t("soilSoc")) + ': <strong>' + soil0.socPct + '%</strong> (0–5 cm) → <strong>' + soil5.socPct + '%</strong> (5–15 cm)</li>' +
          '</ul>' +
          '<p class="section-desc" style="margin-top:8px;">' + esc(t("soilNote")) + '</p>' +
        '</div>' +
        '<div class="sub-panel">' +
          '<h3>' + esc(t("pinHeading")) + '</h3>' +
          renderLocatorSvg() +
          '<ul class="meta-list">' +
            '<li>' + esc(t("pinCoord")) + ': <span class="mono">' + DATA.field.lat + 'N, ' + DATA.field.lon + 'E</span></li>' +
            '<li>' + esc(t("pinGrid")) + ': <span class="mono">' + DATA.field.powerGridLat + 'N, ' + DATA.field.powerGridLon + 'E</span> (' + esc(t("pinElev")) + ' ' + DATA.field.elevationM + ' m)</li>' +
            '<li>' + esc(fieldNote) + '</li>' +
          '</ul>' +
          '<div class="btn-row">' +
            '<a class="btn-link" href="' + DATA.field.googleMapsUrl + '" target="_blank" rel="noopener noreferrer">' + esc(t("openGmaps")) + '</a>' +
            '<a class="btn-link" href="' + DATA.field.osmUrl + '" target="_blank" rel="noopener noreferrer">' + esc(t("openOsm")) + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="callout callout-warn">' +
        '<strong>' + esc(t("limitsTitle")) + '</strong> ' + esc(t("limitsBody")) +
      '</div>' +
    '</section>';
  }

  function badgeFor(type) {
    if (type === "real") {
      return '<span class="badge badge-real">' + esc(t("badgeReal")) + '</span>';
    }
    if (type === "official") {
      return '<span class="badge badge-official">' + esc(t("badgeOfficial")) + '</span>';
    }
    return '<span class="badge badge-estimate">' + esc(t("badgeEstimate")) + '</span>';
  }

  function renderCellContent(cell) {
    var lang = state.lang;
    var headline = lang === "th" ? cell.headlineTh : cell.headlineEn;
    var detail = lang === "th" ? cell.detailTh : cell.detailEn;
    var src = lang === "th" ? cell.sourceTh : cell.sourceEn;
    var srcHtml = cell.sourceUrl
      ? '<a href="' + cell.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + esc(src) + '</a>'
      : '<span>' + esc(src) + '</span>';

    return '<div class="cell-head">' + esc(headline) + '</div>' +
      '<div class="cell-detail">' + esc(detail) + '</div>' +
      '<div class="cell-meta">' + badgeFor(cell.badgeType) + ' ' + srcHtml + '</div>';
  }

  function renderWaterCompareSvg() {
    var w = 720;
    var h = 235;
    var padL = 52;
    var padR = 20;
    var padT = 26;
    var padB = 42;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var dryIdx = [10, 11, 0, 1, 2, 3]; // Nov -> Apr
    var is2024 = state.climateMode === "2024";
    var maxY = 120;

    function yVal(v) {
      return padT + plotH - (Math.min(v, maxY) / maxY) * plotH;
    }

    var grid = [0, 30, 60, 90, 120].map(function (v) {
      var y = yVal(v).toFixed(1);
      return '<line x1="' + padL + '" y1="' + y + '" x2="' + (w - padR) + '" y2="' + y + '" stroke="#e2ece6" stroke-dasharray="3,3" />' +
        '<text x="' + (padL - 6) + '" y="' + (+y + 4) + '" text-anchor="end" font-size="10.5" fill="#4b6159">' + v + '</text>';
    }).join("");

    // Approximate monthly water need spread during active dry-season crop (comparative only)
    // B (Chai Nat 84-1, 65 d Nov 15 - Jan 19): ~235 mm split across Nov (~70), Dec (~110), Jan (~55)
    // C (Sunn hemp cover 50-60 d Nov - early Jan): relies mostly on residual moisture; shown is ~25 mm/wk optimal reference capped as ~75 Nov / ~95 Dec or residual
    var needB = [70, 110, 55, 0, 0, 0];
    var needCEst = [25, 0, 0, 0, 0, 0]; // Estimated 1 optional germination watering if soil dry; taproot + soil moisture handles rest

    var colW = plotW / 6;
    var bw = 18;
    var shapes = [];

    dryIdx.forEach(function (mIdx, idx) {
      var m = DATA.monthly[mIdx];
      var rain = is2024 ? m.d2024RainMonth : m.climRainMonth;
      var cx = padL + colW * (idx + 0.5);

      var items = [
        { val: rain, x: cx - bw * 1.55, fill: "#0284c7" },
        { val: needB[idx], x: cx - bw * 0.45, fill: "#15803d" },
        { val: needCEst[idx], x: cx + bw * 0.65, fill: "#d97706" }
      ];

      items.forEach(function (it) {
        if (it.val <= 0) return;
        var y = yVal(it.val);
        var bh = Math.max(2, padT + plotH - y);
        shapes.push(
          '<rect x="' + it.x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw + '" height="' + bh.toFixed(1) + '" rx="3" fill="' + it.fill + '"></rect>' +
          '<text x="' + (it.x + bw / 2).toFixed(1) + '" y="' + (y - 3).toFixed(1) + '" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0f1f1a">' + Math.round(it.val) + '</text>'
        );
      });

      var mLabel = state.lang === "th" ? m.th : m.en;
      shapes.push('<text x="' + cx.toFixed(1) + '" y="' + (h - 14) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#1f352e">' + esc(mLabel) + '</text>');
    });

    var legendRain = state.lang === "th" ? (is2024 ? "ฝนจริงปี 2024 (มม.)" : "ฝนเฉลี่ย 25 ปี (มม.)") : (is2024 ? "2024 Rain (mm)" : "25y Norm Rain (mm)");
    var legendB = state.lang === "th" ? "น้ำที่ถั่วเขียว B ต้องการรวม ~235 มม. [ช่วง 65 วัน]" : "Mungbean B demand (~235 mm over 65 d)";
    var legendC = state.lang === "th" ? "ปอเทือง C (ใช้ความชื้นดิน + อาจช่วยงอก ~25 มม. ค่าประมาณ)" : "Sunn Hemp C (soil moisture + ~25 mm est. start)";

    return '<div class="chart-box">' +
      '<div class="chart-header"><span class="chart-title">' + esc(t("s2WaterTitle")) + '</span></div>' +
      '<div class="chart-legend">' +
        '<span class="legend-item"><span class="swatch" style="background:#0284c7"></span>' + esc(legendRain) + '</span>' +
        '<span class="legend-item"><span class="swatch" style="background:#15803d"></span>' + esc(legendB) + '</span>' +
        '<span class="legend-item"><span class="swatch" style="background:#d97706"></span>' + esc(legendC) + '</span>' +
      '</div>' +
      '<svg class="svg-chart" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Dry season rainfall vs crop water demand">' +
        '<text x="' + padL + '" y="14" font-size="10.5" font-weight="700" fill="#4b6159">mm / month</text>' +
        grid + shapes.join("") +
      '</svg>' +
      '<p class="cal-note">' + esc(t("s2WaterCaption")) + '</p>' +
    '</div>';
  }

  function renderCalendarSvg() {
    var w = 720;
    var h = 210;
    var padL = 112;
    var padR = 16;
    var plotW = w - padL - padR;
    var colW = plotW / 12;
    // Crop-year order: May (4) -> Apr (3)
    var order = [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3];
    var isTh = state.lang === "th";

    // Heat danger background over Mar (col 10) and Apr (col 11)
    var heatX = padL + colW * 10;
    var heatBox = '<rect x="' + heatX.toFixed(1) + '" y="26" width="' + (colW * 2).toFixed(1) + '" height="148" fill="#fee2e2" opacity="0.65" rx="4" />' +
      '<text x="' + (heatX + colW).toFixed(1) + '" y="190" text-anchor="middle" font-size="10" font-weight="800" fill="#b91c1c">' +
      esc(isTh ? "ร้อนจัด 38–42.9°C" : "Extreme heat 38–42.9°C") + '</text>';

    var monthHeaders = order.map(function (mIdx, col) {
      var m = DATA.monthly[mIdx];
      var x = padL + colW * (col + 0.5);
      var lbl = isTh ? m.th : m.en;
      return '<text x="' + x.toFixed(1) + '" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="#0f1f1a">' + esc(lbl) + '</text>' +
        '<line x1="' + (padL + colW * col).toFixed(1) + '" y1="26" x2="' + (padL + colW * col).toFixed(1) + '" y2="174" stroke="#e2ece6" />';
    }).join("");

    var rows = [
      {
        y: 42,
        label: isTh ? "A: ข้าวเดี่ยว" : "A: Rice only",
        labelColor: "#475569",
        bars: [
          { startCol: 0, span: 6, fill: "#0d9488", txt: isTh ? "ข้าวนาปี (พ.ค.–ต.ค.)" : "Main Rice (May–Oct)" },
          { startCol: 6, span: 6, fill: "#cbd5e1", txtFill: "#334155", txt: isTh ? "ปล่อยว่าง (พ.ย.–เม.ย.)" : "Fallow (Nov–Apr)" }
        ]
      },
      {
        y: 90,
        label: isTh ? "B: ข้าว+ถั่วเขียว" : "B: +Mungbean",
        labelColor: "#15803d",
        bars: [
          { startCol: 0, span: 6, fill: "#0d9488", txt: isTh ? "ข้าวนาปี (พืชหลัก)" : "Main Rice" },
          { startCol: 6.4, span: 2.3, fill: "#16a34a", txt: isTh ? "ชัยนาท 84-1 (65 วัน)" : "CN84-1 (65 d)" },
          { startCol: 8.7, span: 3.3, fill: "#e2e8f0", txtFill: "#475569", txt: isTh ? "พักแปลง" : "Rest" }
        ]
      },
      {
        y: 138,
        label: isTh ? "C: ข้าว+ปอเทือง" : "C: +Sunn Hemp",
        labelColor: "#b45309",
        bars: [
          { startCol: 0, span: 6, fill: "#0d9488", txt: isTh ? "ข้าวนาปี (พืชหลัก)" : "Main Rice" },
          { startCol: 6.2, span: 1.9, fill: "#d97706", txt: isTh ? "ปอเทือง (50–60 วัน)" : "Sunn Hemp 55d" },
          { startCol: 8.1, span: 3.9, fill: "#fef3c7", txtFill: "#92400e", txt: isTh ? "ซากคลุมดิน+พักก่อนนา" : "Mulch rest" }
        ]
      }
    ];

    var rowsSvg = rows.map(function (r) {
      var out = '<text x="' + (padL - 8) + '" y="' + (r.y + 18) + '" text-anchor="end" font-size="11.5" font-weight="800" fill="' + r.labelColor + '">' + esc(r.label) + '</text>';
      r.bars.forEach(function (b) {
        var bx = padL + b.startCol * colW + 2;
        var bw = Math.max(24, b.span * colW - 4);
        out += '<rect x="' + bx.toFixed(1) + '" y="' + r.y + '" width="' + bw.toFixed(1) + '" height="28" rx="6" fill="' + b.fill + '"></rect>';
        out += '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (r.y + 18) + '" text-anchor="middle" font-size="10" font-weight="700" fill="' + (b.txtFill || "#ffffff") + '">' + esc(b.txt) + '</text>';
      });
      return out;
    }).join("");

    return '<div class="calendar-grid">' +
      '<div class="chart-header"><span class="chart-title">' + esc(t("s2CalTitle")) + '</span></div>' +
      '<svg class="svg-chart" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="12-month crop rotation timeline">' +
        heatBox + monthHeaders + rowsSvg +
      '</svg>' +
      '<p class="cal-note">' + esc(t("s2CalCaption")) + '</p>' +
    '</div>';
  }

  function renderSlice2() {
    var strats = ["A", "B", "C"].map(function (id) { return DATA.strategies[id]; });
    var isTh = state.lang === "th";

    var chipCards = '<div class="strat-banner-grid">' + strats.map(function (st) {
      return '<div class="strat-chip-card" data-strat="' + st.id + '">' +
        '<h3>' + esc(isTh ? st.titleTh : st.titleEn) + '</h3>' +
        '<p>' + esc(isTh ? st.cropTh : st.cropEn) + '</p>' +
        '<p style="margin-top:4px;font-weight:700;">' + esc(isTh ? st.durationTh : st.durationEn) + '</p>' +
      '</div>';
    }).join("") + '</div>';

    var tableRows = DATA.dimensions.map(function (dim) {
      var cols = strats.map(function (st) {
        return '<td>' + renderCellContent(st.cells[dim.id]) + '</td>';
      }).join("");
      return '<tr><td class="dim-name">' + esc(isTh ? dim.th : dim.en) + '</td>' + cols + '</tr>';
    }).join("");

    var desktopTable = '<div class="matrix-table-wrap">' +
      '<table class="matrix-table">' +
        '<thead><tr><th class="col-dim">' + esc(t("s2DimHeader")) + '</th>' +
        strats.map(function (st) { return '<th>' + esc(isTh ? st.titleTh : st.titleEn) + '</th>'; }).join("") +
        '</tr></thead>' +
        '<tbody>' + tableRows + '</tbody>' +
      '</table>' +
    '</div>';

    var mobileCards = '<div class="matrix-cards">' + DATA.dimensions.map(function (dim) {
      var rows = strats.map(function (st) {
        return '<div class="dim-card-row" data-strat="' + st.id + '">' +
          '<div class="strat-mini-tag" style="color:' + st.color + '">' + esc(isTh ? st.titleTh : st.titleEn) + '</div>' +
          renderCellContent(st.cells[dim.id]) +
        '</div>';
      }).join("");
      return '<div class="dim-card"><div class="dim-card-head">' + esc(isTh ? dim.th : dim.en) + '</div>' + rows + '</div>';
    }).join("") + '</div>';

    return '<section class="section-card" id="slice-2">' +
      '<div class="section-head">' +
        '<div>' +
          '<h2>' + esc(t("s2Title")) + '</h2>' +
          '<p class="section-desc">' + esc(t("s2Desc")) + '</p>' +
        '</div>' +
      '</div>' +
      chipCards + desktopTable + mobileCards +
      renderWaterCompareSvg() +
      renderCalendarSvg() +
      '<div class="callout callout-info">' + esc(t("s2NoScoreNote")) + '</div>' +
    '</section>';
  }

  function renderSlice3Placeholder() {
    return state.lang === "th"
      ? '<section class="section-card" id="slice-3"><h2>3. เลือกความสำคัญของชาวนา (กำลังสร้างใน Slice 3)</h2><p class="section-desc">จัดอันดับตามน้ำหนักความต้องการ + คำอธิบายและโหมดถ้าเปลี่ยนใจ</p></section>'
      : '<section class="section-card" id="slice-3"><h2>3. Farmer Priorities (Slice 3 pending)</h2><p class="section-desc">Interactive sliders, ranking explanation, and sensitivity view.</p></section>';
  }

  function renderAll() {
    renderTopbar();
    document.getElementById("app").innerHTML = renderSlice1() + renderSlice2() + renderSlice3Placeholder();
    document.getElementById("site-footer").textContent = t("footer");

    var cmodeBtns = document.querySelectorAll("[data-cmode]");
    cmodeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.climateMode = btn.getAttribute("data-cmode");
        renderAll();
      });
    });
  }

  renderAll();
})();
