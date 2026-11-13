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
    }
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = FIELDSHIFT_DATA;
  }
  root.FIELDSHIFT_DATA = FIELDSHIFT_DATA;
})(typeof globalThis !== "undefined" ? globalThis : window);
