# SOURCES — แหล่งข้อมูลและเครดิตทั้งหมด (FieldShift)

## 1. ข้อมูลดาวเทียม ภูมิอากาศ และดินของแปลง (Primary Earth Observation & Soil Data)

- **NASA POWER API (Climatology v2.10.1 & Daily v2.10.3)**
  - แหล่งข้อมูล: NASA Langley Research Center (LaRC) Prediction Of Worldwide Energy Resources (POWER)
  - URL: https://power.larc.nasa.gov/
  - ไฟล์ใน Repo: `data/power_climatology.json` (ค่าเฉลี่ยรายเดือน 25 ปี 2001–2025) และ `data/power_daily_2024.json` (ข้อมูลรายวันปี 2024 รวม 366 วัน)
  - กริดข้อมูล: `16.846N, 100.467E` (~50 กม. grid cell, MERRA-2 / POWER)
- **ISRIC SoilGrids v2.0**
  - แหล่งข้อมูล: ISRIC — World Soil Information (SoilGrids REST API, 250 m spatial estimate)
  - URL: https://soilgrids.org/
  - ไฟล์ใน Repo: `data/soilgrid.json` (พิกัด `16.845925N, 100.466731E`, ความลึก 0–5 ซม. และ 5–15 ซม.)
- **พิกัดแปลงสังเกตการณ์ (Observed Field Pin):** ต.ชัยนาม อ.วังทอง จ.พิษณุโลก (`16.845925N, 100.466731E`) — แปลงนาข้าวสังเกตการณ์ที่เห็นปลูกข้าวทุกปี (ไม่ใช่แปลงของทีมผู้พัฒนา)

---

## 2. พันธุ์พืชและการจัดการกลยุทธ์ B — ถั่วเขียวผิวมัน `ชัยนาท 84-1` (*Vigna radiata*)

1. **กรมวิชาการเกษตร (ศูนย์วิจัยพืชไร่ชัยนาท)** — ลักษณะประจำพันธุ์ถั่วเขียวพันธุ์ชัยนาท 84-1 (อายุ 65 วัน, ออกดอก 35 วัน, ผลผลิตเฉลี่ยแปลงทดลอง 226 กก./ไร่, แป้ง 54.85%): https://www.doa.go.th/fc/chainat/?p=5536
2. **ฐานข้อมูลพันธุ์พืชรับรอง กรมวิชาการเกษตร** — รายละเอียดการรับรองพันธุ์ 15 มิ.ย. 2554: https://doaplant.doa.go.th/RecFront/PlantDetail/290
3. **องค์ความรู้เรื่องข้าว กรมการข้าว (Rice Knowledge Bank)** — การผลิตถั่วเขียวผิวมันหลังนา (ความต้องการน้ำ 350–400 ลบ.ม./ไร่, รอบให้น้ำทุก 10–14 วัน, อัตราหว่าน 5–7 กก./ไร่): https://rkb.ricethailand.go.th/web/content_page.php?code=A-BMDHI8JJCZ
4. **กรมวิชาการเกษตร (กลุ่มงานจุลินทรีย์ดิน)** — ปุ๋ยชีวภาพไรโซเบียมและการคืนไนโตรเจนจากเศษซากถั่วเขียวหลังเก็บเกี่ยว (2.0–6.0 กก.N/ไร่): https://www.doa.go.th/apsrdo/wp-content/uploads/2020/02/i5.pdf
5. **วช. / มหาวิทยาลัยเชียงใหม่** — การตรึงไนโตรเจนของถั่วเขียวในระบบข้าว: https://doi.nrct.go.th/ListDoi/Download/541438?Resolve_DOI=10.14457/CMU.the.1999.156
6. **สำนักงานเศรษฐกิจการเกษตรที่ 11 / สศก. (ข่าวที่ 6/2569, 21 ม.ค. 2569)** — ราคาเฉลี่ยหน้าฟาร์ม 23 บาท/กก., ต้นทุนเฉลี่ย 2,363 บาท/ไร่, ผลผลิตเฉลี่ย 153 กก./ไร่, กำไรสุทธิ 1,156 บาท/ไร่, อุปสงค์-อุปทานในประเทศ: https://zone11.oae.go.th/news-press/4781/
7. **สำนักงานเศรษฐกิจการเกษตร (สศก.)** — ต้นทุนการผลิตและผลผลิตเฉลี่ยระดับประเทศ 2565/66–2567/68: https://oae.go.th/uploads/files/2025/05/06/13e8089a3f69ea96.pdf
8. **สำนักงานเศรษฐกิจการเกษตร (สศก.)** — สถิติราคาสินค้าเกษตรที่เกษตรกรขายได้ (ม.ค. 2569): http://oae.go.th/uploads/files/2026/01/05/4e40a0398d3e3534.pdf
9. **กรมการค้าภายใน กระทรวงพาณิชย์** — ราคาขายส่งถั่วเขียวผิวมัน: https://mex.moc.go.th/page/dit/checkpricedetail/type/W/catid/7/itemid/W16020
10. **ACIAR** — *Mungbean in rice-based systems* (กรอบใช้น้ำ 150–350 มม.): https://www.aciar.gov.au/media-search/blogs/mungbean-rice-systems
11. **Frontiers in Plant Science (2026) & NIH PMC (`PMC10308031`)** — Cardinal temperatures & >40°C reproductive heat stress in mungbean: https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2026.1693408/full และ https://pmc.ncbi.nlm.nih.gov/articles/PMC10308031/

---

## 3. พันธุ์พืชและการจัดการกลยุทธ์ C — ปอเทือง (*Crotalaria juncea* L.)

12. **ห้องสมุดอิเล็กทรอนิกส์ กรมพัฒนาที่ดิน** — ระยะเก็บเกี่ยว/ไถกลบปอเทือง 50–60 วัน, มวลสด 1.5–3.0 ตัน/ไร่, ให้ธาตุ N 10–20 กก./ไร่, เก็บเมล็ด 120–150 วัน 80–120 กก./ไร่ (กรมพัฒนาที่ดิน, 2546): https://e-library.ldd.go.th/library/flip/bib10499f/files/basic-html/page6.html
13. **สำนักงานเกษตรและสหกรณ์ จ.สมุทรสาคร / สพข.5 กรมพัฒนาที่ดิน** — ปอเทือง 1 ไร่ไถกลบ 50 วัน เทียบเท่าปุ๋ยยูเรีย 15 กก./ไร่ และราคารับซื้อคืนเมล็ดพันธุ์ 16–20 บาท/กก.: https://www.opsmoac.go.th/samutsakhon-local_wisdom-preview-421691791873
14. **กรมพัฒนาที่ดิน** — คู่มือการผลิตเมล็ดพันธุ์ปอเทือง: https://service.ldd.go.th/service64/pdf/Sto/PorSeed.pdf
15. **กรมพัฒนาที่ดิน** — รายงานประเมินผลแปลงสาธิตปุ๋ยพืชสด (เพิ่มผลผลิตข้าว ~15–23%): http://www1.ldd.go.th/WEB_PSD/PDF/evaluate/66/66_8/11.%20%E0%B8%99.%E0%B8%AA.%E0%B8%97%E0%B8%B4%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A3%E0%B8%93%E0%B8%AF%20-%E0%B9%80%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%9C%E0%B8%A5%E0%B8%87%E0%B8%B2%E0%B8%99.pdf
16. **กรมส่งเสริมการเกษตร** — ปอเทืองบำรุงดิน: https://esc.doae.go.th/%E0%B8%9B%E0%B8%AD%E0%B9%80%E0%B8%97%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%9A%E0%B8%B3%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B8%94%E0%B8%B4%E0%B8%99/
17. **Feedipedia (INRAE / CIRAD / AFZ / FAO)** — *Crotalaria juncea* (pH 5.0–8.4, ทนแล้งถึง 200 มม., น้ำเหมาะสม ~25 มม./สัปดาห์, ตรึง N 50–60 กก./ha, ลดไส้เดือนฝอย *Meloidogyne* spp.): https://www.feedipedia.org/node/313
18. **Tropical Forages Fact Sheet** — *Crotalaria juncea* (taproot, pH 5.0–7.5, intolerance of waterlogging): https://tropicalforages.info/text/entities/crotalaria_juncea.htm
19. **USDA NRCS (2024)** — Sunn Hemp Cover Crop Fact Sheet & Plant Guide: https://www.nrcs.usda.gov/sites/default/files/2024-07/Sunn%20Hemp%20Cover%20Crop%20Fact%20Sheet.pdf และ https://www.nrcs.usda.gov/plantmaterials/njpmcpg11706.pdf

---

## 4. การใช้เครื่องมือ AI (Use of Super Intelligence / AI Disclosure)

ตามกติกาของ **NASA Space Apps Challenge 2026**:
- โปรเจกต์นี้ใช้ผู้ช่วย AI (Antigravity / Gemini) ช่วยในการค้นคว้าเปรียบเทียบงานวิจัยพันธุ์พืชหลังนา (`CROPS.md`), ออกแบบและสร้างหน้าเว็บสแตติก (`docs/`), เขียนสคริปต์ตรวจสอบความตรงกันของข้อมูล (`scripts/verify_data.mjs`) และเรียบเรียงเอกสารภาษาไทย–อังกฤษ
- **ข้อมูลอากาศและดินทั้งหมดในแอปไม่ได้สร้างจาก AI** แต่ดึงและตรวจสอบค่าตรงกับไฟล์ `data/*.json` จาก NASA POWER และ ISRIC SoilGrids และพันธุ์พืช/ราคาทุกรายการมีลิงก์อ้างอิงจากหน่วยงานไทยและสากลตรวจสอบได้
