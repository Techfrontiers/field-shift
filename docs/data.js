/* FieldShift — Verified climate & soil data embedded from data/*.json (no runtime API calls) */
(function (root) {
  "use strict";

  var MONTHS_TH = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  var MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var MONTHLY = [
    { index: 0, key: "JAN", th: "ม.ค.", en: "Jan", season: "dry", climRainPerDay: 0.32, climRainMonth: 9.9, climTemp: 22.73, climRh: 61.11, climWind: 1.68, d2024RainMonth: 9.0, d2024RainDays: 2, d2024MeanTmax: 29.2, d2024MeanTmin: 18.0, d2024AbsMax: 32.0, d2024AbsMin: 14.1, d2024Rh: 69.2 },
    { index: 1, key: "FEB", th: "ก.พ.", en: "Feb", season: "dry", climRainPerDay: 0.46, climRainMonth: 13.0, climTemp: 25.94, climRh: 52.58, climWind: 1.62, d2024RainMonth: 0.4, d2024RainDays: 0, d2024MeanTmax: 34.0, d2024MeanTmin: 20.5, d2024AbsMax: 36.0, d2024AbsMin: 16.3, d2024Rh: 52.8 },
    { index: 2, key: "MAR", th: "มี.ค.", en: "Mar", season: "dry", climRainPerDay: 1.1, climRainMonth: 34.1, climTemp: 28.36, climRh: 51.07, climWind: 1.69, d2024RainMonth: 75.8, d2024RainDays: 11, d2024MeanTmax: 35.3, d2024MeanTmin: 23.0, d2024AbsMax: 38.4, d2024AbsMin: 19.1, d2024Rh: 56.2 },
    { index: 3, key: "APR", th: "เม.ย.", en: "Apr", season: "dry", climRainPerDay: 2.22, climRainMonth: 66.6, climTemp: 29.94, climRh: 55.76, climWind: 1.65, d2024RainMonth: 5.0, d2024RainDays: 2, d2024MeanTmax: 39.6, d2024MeanTmin: 26.5, d2024AbsMax: 42.7, d2024AbsMin: 22.8, d2024Rh: 47.6 },
    { index: 4, key: "MAY", th: "พ.ค.", en: "May", season: "wet", climRainPerDay: 5.42, climRainMonth: 168.0, climTemp: 28.09, climRh: 72.32, climWind: 1.56, d2024RainMonth: 241.4, d2024RainDays: 26, d2024MeanTmax: 34.5, d2024MeanTmin: 26.0, d2024AbsMax: 42.9, d2024AbsMin: 24.1, d2024Rh: 68.9 },
    { index: 5, key: "JUN", th: "มิ.ย.", en: "Jun", season: "wet", climRainPerDay: 5.36, climRainMonth: 160.8, climTemp: 26.63, climRh: 80.88, climWind: 1.78, d2024RainMonth: 135.0, d2024RainDays: 22, d2024MeanTmax: 30.9, d2024MeanTmin: 24.0, d2024AbsMax: 34.4, d2024AbsMin: 22.7, d2024Rh: 81.5 },
    { index: 6, key: "JUL", th: "ก.ค.", en: "Jul", season: "wet", climRainPerDay: 5.53, climRainMonth: 171.4, climTemp: 25.83, climRh: 83.49, climWind: 1.8, d2024RainMonth: 246.7, d2024RainDays: 30, d2024MeanTmax: 29.2, d2024MeanTmin: 23.4, d2024AbsMax: 31.7, d2024AbsMin: 22.3, d2024Rh: 86.1 },
    { index: 7, key: "AUG", th: "ส.ค.", en: "Aug", season: "wet", climRainPerDay: 7.09, climRainMonth: 219.8, climTemp: 25.36, climRh: 86.55, climWind: 1.67, d2024RainMonth: 257.0, d2024RainDays: 29, d2024MeanTmax: 29.5, d2024MeanTmin: 23.3, d2024AbsMax: 31.4, d2024AbsMin: 22.4, d2024Rh: 86.4 },
    { index: 8, key: "SEP", th: "ก.ย.", en: "Sep", season: "wet", climRainPerDay: 7.86, climRainMonth: 235.8, climTemp: 25.45, climRh: 86.86, climWind: 1.25, d2024RainMonth: 213.2, d2024RainDays: 24, d2024MeanTmax: 29.7, d2024MeanTmin: 23.4, d2024AbsMax: 31.4, d2024AbsMin: 21.9, d2024Rh: 86.3 },
    { index: 9, key: "OCT", th: "ต.ค.", en: "Oct", season: "wet", climRainPerDay: 3.68, climRainMonth: 114.1, climTemp: 24.89, climRh: 83.23, climWind: 1.37, d2024RainMonth: 157.1, d2024RainDays: 17, d2024MeanTmax: 30.0, d2024MeanTmin: 22.3, d2024AbsMax: 31.7, d2024AbsMin: 19.7, d2024Rh: 83.4 },
    { index: 10, key: "NOV", th: "พ.ย.", en: "Nov", season: "dry", climRainPerDay: 0.69, climRainMonth: 20.7, climTemp: 23.27, climRh: 77.34, climWind: 1.59, d2024RainMonth: 18.9, d2024RainDays: 4, d2024MeanTmax: 28.4, d2024MeanTmin: 19.7, d2024AbsMax: 31.4, d2024AbsMin: 14.9, d2024Rh: 79.9 },
    { index: 11, key: "DEC", th: "ธ.ค.", en: "Dec", season: "dry", climRainPerDay: 0.29, climRainMonth: 9.0, climTemp: 21.51, climRh: 69.28, climWind: 1.84, d2024RainMonth: 0.5, d2024RainDays: 0, d2024MeanTmax: 27.7, d2024MeanTmin: 16.4, d2024AbsMax: 30.4, d2024AbsMin: 13.4, d2024Rh: 72.2 }
  ];

  var FIELDSHIFT_DATA = {
    field: {
      lat: 16.845925,
      lon: 100.466731,
      powerGridLat: 16.846,
      powerGridLon: 100.467,
      elevationM: 348.75,
      nameTh: "ต.ชัยนาม อ.วังทอง จ.พิษณุโลก",
      nameEn: "Chai Nam, Wang Thong, Phitsanulok",
      noteTh: "แปลงนาข้าวที่สังเกตการณ์ (ปลูกข้าวทุกปี · ไม่ใช่แปลงของทีมผู้พัฒนา)",
      noteEn: "Observed rice paddy field (cultivated every year · not owned by the developer)",
      googleMapsUrl: "https://www.google.com/maps?q=16.845925,100.466731",
      osmUrl: "https://www.openstreetmap.org/?mlat=16.845925&mlon=100.466731#map=15/16.845925/100.466731"
    },
    monthsTh: MONTHS_TH,
    monthsEn: MONTHS_EN,
    monthly: MONTHLY,
    summary: {
      annual2024Mm: 1359.9,
      wet2024Mm: 1250.4,
      dry2024Mm: 109.6,
      novFeb2024Mm: 28.8,
      novJan2024Mm: 28.4,
      novDec2024Mm: 19.4,
      annualClimMm: 1223.2,
      wetClimMm: 1069.9,
      dryClimMm: 153.3,
      novFebClimMm: 52.6,
      novJanClimMm: 39.6,
      maxTemp2024C: 42.94,
      maxTemp2024DateTh: "2 พ.ค. 2024",
      maxTemp2024DateEn: "2 May 2024",
      minTemp2024C: 13.38,
      minTemp2024DateTh: "21 ธ.ค. 2024",
      minTemp2024DateEn: "21 Dec 2024",
      daysOver35C2024: 69,
      daysOver40C2024: 16,
      rainOnset2024Th: "6 พ.ค. 2024 (เริ่มฝนชัด 4–7 พ.ค.)",
      rainOnset2024En: "6 May 2024 (onset cluster 4–7 May)",
      peakClimMonthTh: "ก.ย. (7.86 มม./วัน)",
      peakClimMonthEn: "Sep (7.86 mm/day)",
      driestClimMonthTh: "ธ.ค. (0.29 มม./วัน)",
      driestClimMonthEn: "Dec (0.29 mm/day)"
    },
    soil: {
      textureTh: "ดินร่วน",
      textureEn: "Loam",
      surface0to5: { siltPct: 47.0, clayPct: 23.8, sandPct: 29.3, ph: 6.1, socPct: 2.09 },
      sub5to15: { siltPct: 46.2, clayPct: 25.0, sandPct: 28.8, ph: 6.1, socPct: 1.23 }
    },
    dimensions: [
      { id: "yield", th: "1. ผลผลิต", en: "1. Yield" },
      { id: "water", th: "2. การใช้น้ำ", en: "2. Water Use" },
      { id: "income", th: "3. รายได้เสริม", en: "3. Extra Income" },
      { id: "soil", th: "4. สุขภาพดิน", en: "4. Soil Health" },
      { id: "risk", th: "5. ความเสี่ยง", en: "5. Risk" }
    ],
    strategies: {
      A: {
        id: "A",
        color: "#475569",
        bg: "#f1f5f9",
        titleTh: "A — ข้าวเดี่ยว (ปัจจุบัน)",
        titleEn: "A — Rice Only (Current)",
        cropTh: "ข้าวนาปีอย่างเดียว (พ.ค.–ต.ค.) แล้วปล่อยว่าง พ.ย.–เม.ย.",
        cropEn: "Wet-season rice only (May–Oct), fallow during Nov–Apr",
        durationTh: "ข้าว ~120–150 วัน · แล้งว่าง",
        durationEn: "Rice ~120–150 d · Dry fallow",
        waterTargetMm: 0,
        scores: { yield: 2, water: 5, income: 1, soil: 2, risk: 4 },
        cells: {
          yield: {
            headlineTh: "ข้าว 1 รอบ/ปี (ไม่มีผลผลิตช่วงแล้ง)",
            headlineEn: "1 rice crop/yr (no dry-season harvest)",
            detailTh: "ปลูกเฉพาะข้าวนาปีตามฝน พ.ค.–ต.ค. ไม่ได้ผลผลิตเสริมในฤดูแล้ง",
            detailEn: "Only wet-season rice (May–Oct); dry season stays bare.",
            badgeType: "real",
            sourceTh: "ลักษณะแปลงสังเกตการณ์ (README/PLAN)",
            sourceEn: "Observed field pattern (README/PLAN)"
          },
          water: {
            headlineTh: "ใช้น้ำแล้ง 0 มม. (พึ่งฝน 1,070–1,250 มม.)",
            headlineEn: "0 mm dry-season water (rainfed May–Oct)",
            detailTh: "ไม่เพิ่มภาระใช้น้ำช่วง พ.ย.–ก.พ. ที่ฝนมีแค่ 28.8 มม. (2024)",
            detailEn: "Zero extra demand during Nov–Feb when 2024 rain was just 28.8 mm.",
            badgeType: "real",
            sourceTh: "NASA POWER (data/power_daily_2024.json)",
            sourceEn: "NASA POWER (data/power_daily_2024.json)"
          },
          income: {
            headlineTh: "0 บาท (ไม่มีรายได้ช่วงแล้ง)",
            headlineEn: "0 THB (no dry-season cash crop)",
            detailTh: "ไม่มีรายได้เพิ่มหลังเกี่ยวข้าว และไม่ต้องลงทุนเมล็ดพันธุ์/ไถหว่านรอบแล้ง",
            detailEn: "No dry-season cash revenue and zero off-season input spending.",
            badgeType: "official",
            sourceTh: "ฐานเปรียบเทียบ (Baseline)",
            sourceEn: "Baseline assumption"
          },
          soil: {
            headlineTh: "ดินร่วนคงเดิม/อาจโทรมลงถ้าเผาตอซัง",
            headlineEn: "Neutral to declining if stubble is burned",
            detailTh: "ไม่มีพืชคลุมดินหรือปมถั่วเติม N; ดินชั้น 5–15 ซม. มีอินทรีย์คาร์บอนเพียง 1.23%",
            detailEn: "No cover canopy or legume N; 5–15 cm SoilGrids SOC stays low at 1.23%.",
            badgeType: "real",
            sourceTh: "SoilGrids v2 (data/soilgrid.json)",
            sourceEn: "SoilGrids v2 (data/soilgrid.json)"
          },
          risk: {
            headlineTh: "ต่ำสุดด้านภัยแล้งหน้าแล้ง (แต่พึ่งรายได้ทางเดียว)",
            headlineEn: "Lowest dry-season water risk (single income)",
            detailTh: "ไม่เสี่ยงเมล็ดตายเพราะแล้ง แต่เสี่ยงฝนต้นฤดูมาช้า (เช่น 6 พ.ค. 2024) และรายได้ทางเดียว",
            detailEn: "No dry-season crop failure risk, but single-crop exposure if May rains delay.",
            badgeType: "real",
            sourceTh: "NASA POWER 2024 (onset 6 พ.ค.)",
            sourceEn: "NASA POWER 2024 (6 May onset)"
          }
        }
      },
      B: {
        id: "B",
        color: "#15803d",
        bg: "#ecfdf5",
        titleTh: "B — ข้าว + ถั่วเขียว (ชัยนาท 84-1)",
        titleEn: "B — Rice + Mungbean (Chai Nat 84-1)",
        cropTh: "ข้าว (พ.ค.–ต.ค.) → ถั่วเขียวผิวมัน ชัยนาท 84-1 (15 พ.ย.–ม.ค.)",
        cropEn: "Rice (May–Oct) → Chai Nat 84-1 mungbean (mid-Nov–late Jan)",
        durationTh: "~65 วัน (ออกดอก ~35 วัน)",
        durationEn: "~65 days (flower ~35 d)",
        waterTargetMm: 235,
        scores: { yield: 5, water: 2, income: 5, soil: 3, risk: 2 },
        cells: {
          yield: {
            headlineTh: "ข้าว + ถั่วเขียว ~153 กก./ไร่ [ค่าประมาณฐาน]",
            headlineEn: "Rice + ~153 kg/rai mungbean [Est. farmer avg]",
            detailTh: "แปลงเกษตรกรจริง สศก. ~151–155 กก./ไร่ (ตัวอย่าง 68/69 = 153 กก./ไร่); แปลงทดลอง DOA 226 กก./ไร่",
            detailEn: "OAE farmer avg ~151–155 kg/rai (2568/69 = 153 kg/rai); DOA trial ceiling 226 kg/rai.",
            badgeType: "estimate",
            sourceTh: "สศก. 2568/69 & กรมวิชาการเกษตร",
            sourceEn: "OAE 2568/69 & DOA Chai Nat",
            sourceUrl: "https://zone11.oae.go.th/news-press/4781/"
          },
          water: {
            headlineTh: "ต้องใช้น้ำ 350–400 ลบ.ม./ไร่ (~219–250 มม.)",
            headlineEn: "Needs 350–400 m³/rai (~219–250 mm)",
            detailTh: "ต้องมีน้ำชลประทาน/น้ำเสริม 2–3 ครั้ง (ทุก 10–14 วัน) เพราะฝน พ.ย.–ม.ค. 2024 มีแค่ 28.4 มม. [ขาดสุทธิ ~100–170 มม. ค่าประมาณ]",
            detailEn: "Requires 2–3 supplemental irrigations (every 10–14 d); Nov–Jan 2024 rain is only 28.4 mm [Est. 100–170 mm gap].",
            badgeType: "official",
            sourceTh: "กรมการข้าว (RKB) + NASA POWER 2024",
            sourceEn: "Rice Knowledge Bank + NASA POWER 2024",
            sourceUrl: "https://rkb.ricethailand.go.th/web/content_page.php?code=A-BMDHI8JJCZ"
          },
          income: {
            headlineTh: "กำไรสุทธิ ~1,156 บาท/ไร่ [ค่าประมาณจาก สศก.]",
            headlineEn: "Net ~1,156 THB/rai [OAE benchmark est.]",
            detailTh: "ขายหน้าฟาร์มเฉลี่ย ~23 บาท/กก. (ช่วง 21–25 บ.) หักต้นทุน ~2,363 บาท/ไร่; แป้งสูง 54.85% ตลาดวุ้นเส้นรับซื้อ",
            detailEn: "Farmgate ~23 THB/kg (21–25 range) minus ~2,363 THB/rai cost; 54.85% starch favored by vermicelli mills.",
            badgeType: "estimate",
            sourceTh: "สศก. ข่าว 6/2569 (ม.ค. 2569)",
            sourceEn: "OAE Press 6/2569 (Jan 2026)",
            sourceUrl: "https://zone11.oae.go.th/news-press/4781/"
          },
          soil: {
            headlineTh: "เหลือ N คืนดิน ~2.0–6.0 กก.N/ไร่ + ตัดวงจรศัตรูพืช",
            headlineEn: "Leaves ~2.0–6.0 kg N/rai residue + pest break",
            detailTh: "เหมาะกับดิน pH 6.1 ของแปลง; คลุกไรโซเบียมลดปุ๋ย N ในถั่วเขียว 50–100% แต่ N ส่วนใหญ่ออกไปกับเมล็ด",
            detailEn: "Fits field pH 6.1; Rhizobium cuts mungbean N fertilizer 50–100%, though harvested grain exports much of fixed N.",
            badgeType: "official",
            sourceTh: "กรมวิชาการเกษตร (i5.pdf)",
            sourceEn: "DOA Soil Microbiology (i5.pdf)",
            sourceUrl: "https://www.doa.go.th/apsrdo/wp-content/uploads/2020/02/i5.pdf"
          },
          risk: {
            headlineTh: "เสี่ยงขาดน้ำช่วงออกดอก + ร้อน >40°C ถ้าหว่านช้า",
            headlineEn: "Flowering drought stress + >40°C heat if sown late",
            detailTh: "ห้ามขาดน้ำวันที่ ~30–50; ต้องหว่าน พ.ย. ให้จบก่อนร้อน 42.9°C มี.ค.–พ.ค. (หากแล้งจัดไถกลบเป็นปุ๋ยสดแทนได้)",
            detailEn: "Critical pod/flower window days 30–50; must sow in Nov to finish before 42.9°C Mar–May heat.",
            badgeType: "official",
            sourceTh: "กรมการข้าว & PMC10308031 + POWER",
            sourceEn: "Rice Dept, PMC10308031 & POWER"
          }
        }
      },
      C: {
        id: "C",
        color: "#b45309",
        bg: "#fffbeb",
        titleTh: "C — ข้าว + ปอเทือง (พืชคลุมดินทนแล้ง)",
        titleEn: "C — Rice + Sunn Hemp (Drought Cover Crop)",
        cropTh: "ข้าว (พ.ค.–ต.ค.) → ปอเทือง Crotalaria juncea (50–60 วัน ไถกลบ พ.ย.–ต้น ม.ค.)",
        cropEn: "Rice (May–Oct) → Sunn hemp C. juncea (50–60 d plough-in Nov–early Jan)",
        durationTh: "50–60 วัน (โหมดหลัก) · 120–150 วัน (เก็บเมล็ด)",
        durationEn: "50–60 d (cover mode) · 120–150 d (seed mode)",
        waterTargetMm: 60,
        scores: { yield: 3, water: 4, income: 2, soil: 5, risk: 3 },
        cells: {
          yield: {
            headlineTh: "ชีวมวลสด 1.5–3.0 ตัน/ไร่ + ลุ้นข้าวเพิ่ม 15–23% [แปลงสาธิต]",
            headlineEn: "1.5–3.0 t/rai biomass + demo +15–23% next rice",
            detailTh: "โหมดหลักไถกลบไม่ขายผลผลิต (หรือโหมดเสริมเก็บเมล็ด 120–150 วัน ได้ ~80–120 กก./ไร่); ผลข้าวเพิ่มเป็นข้อมูลแปลงสาธิต",
            detailEn: "Plough-in mode yields organic biomass (optional 120–150 d seed mode yields 80–120 kg/rai); rice boost from LDD demos.",
            badgeType: "official",
            sourceTh: "กรมพัฒนาที่ดิน (bib10499f & รายงานสาธิต)",
            sourceEn: "LDD Thailand (bib10499f & demo report)",
            sourceUrl: "https://e-library.ldd.go.th/library/flip/bib10499f/files/basic-html/page6.html"
          },
          water: {
            headlineTh: "ใช้น้ำน้อยกว่า B: อาศัยความชื้นตกค้าง พ.ย. (+อาจรดงอก 1 ครั้ง)",
            headlineEn: "Lower water than B: Nov soil moisture (+1 start watering if dry)",
            detailTh: "รากแก้วลึกทนแล้ง (รอดได้ถึง 170–300 มม./ปี; เต็มที่ 25 มม./สัปดาห์ ≈ 180–215 มม.); หากดินแห้งใน ธ.ค. ต้องน้ำช่วยงอก ~20–30 มม. [ค่าประมาณ]",
            detailEn: "Deep taproot tolerates drought (optimal ~25 mm/wk ≈ 180–215 mm); sow in Nov damp soil or apply ~20–30 mm start irrigation [Est.].",
            badgeType: "estimate",
            sourceTh: "Feedipedia / Tropical Forages + NASA POWER",
            sourceEn: "Feedipedia / Tropical Forages + POWER",
            sourceUrl: "https://www.feedipedia.org/node/313"
          },
          income: {
            headlineTh: "0 บาทสด (โหมดคลุมดิน) — แต่ประหยัดยูเรีย ~15 กก./ไร่",
            headlineEn: "0 THB cash (cover mode) — saves ~15 kg/rai urea",
            detailTh: "เมล็ดขอรับ/ยืมฟรีที่สถานีพัฒนาที่ดินพิษณุโลก (ซื้อเอง ~25–35 บ./กก.); ถ้าเลือกโหมดเก็บเมล็ด 120–150 วัน ราคารับซื้อคืน LDD ~16–20 บ./กก. [ค่าประมาณ]",
            detailEn: "Free/loan seed via LDD Phitsanulok (retail ~25–35 THB/kg); optional 120–150 d seed buyback ~16–20 THB/kg [Est.].",
            badgeType: "estimate",
            sourceTh: "สกษ.สมุทรสาคร / สพข.5 กรมพัฒนาที่ดิน",
            sourceEn: "OPSMOAC / LDD Region 5",
            sourceUrl: "https://www.opsmoac.go.th/samutsakhon-local_wisdom-preview-421691791873"
          },
          soil: {
            headlineTh: "ดีที่สุด: คืน N ~10–20 กก./ไร่ + อุ้มความชื้นดิน + กดไส้เดือนฝอย",
            headlineEn: "Strongest: +10–20 kg N/rai + moisture sponge + nematode break",
            detailTh: "ตรวจแล็บ 50 วันเท่าปุ๋ยยูเรีย 15 กก./ไร่ (~6.9 กก.N; ช่วงกว้าง LDD 10–20 กก./ไร่) ปิดผิวดินลดระเหยและเติมคาร์บอนให้ชั้น 5–15 ซม. (1.23%)",
            detailEn: "Lab test at 50 d equals 15 kg/rai urea (LDD range 10–20 kg N/rai), shades loam to cut evaporation, boosts 5–15 cm SOC (1.23%).",
            badgeType: "official",
            sourceTh: "กรมพัฒนาที่ดิน & Feedipedia + SoilGrids",
            sourceEn: "LDD & Feedipedia + SoilGrids",
            sourceUrl: "https://e-library.ldd.go.th/library/flip/bib10499f/files/basic-html/page6.html"
          },
          risk: {
            headlineTh: "เสี่ยงเมล็ดไม่งอกถ้าหว่านช้าตอนดินแห้ง + ห้ามน้ำขัง >2 วัน",
            headlineEn: "Poor germination if sown late in dry Dec + zero waterlogging tolerance",
            detailTh: "ต้องระบายน้ำนาก่อนหว่าน (น้ำท่วมขัง >2 วันรากเน่า); โหมดหลักไม่มีเงินสดเข้ากระเป๋าทันทีเหมือนขายถั่วเขียว",
            detailEn: "Must drain paddy before sowing (>2 days standing water kills plants); no immediate grain cash in cover mode.",
            badgeType: "official",
            sourceTh: "กรมพัฒนาที่ดิน & Tropical Forages",
            sourceEn: "LDD & Tropical Forages"
          }
        }
      }
    }
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = FIELDSHIFT_DATA;
  }
  root.FIELDSHIFT_DATA = FIELDSHIFT_DATA;
})(typeof globalThis !== "undefined" ? globalThis : window);
