# FieldShift — ตัดสินใจหมุนเวียนพืชด้วยข้อมูล NASA

**NASA Space Apps Challenge 2026 — Challenge 7: Field Shift: Adapting Farms with NASA Data.**
Team SYDEAR, solo. Event online Nov 14–15, 2026. Submission due Nov 15, 23:59 local (Bangkok).

## ปัญหา (Problem)

ชาวนาที่ **ต.ชัยนาม อ.วังทอง จ.พิษณุโลก** (`16.845925N, 100.466731E`) ปลูกข้าวเป็นหลัก แต่ฝนมาช้า-มาเร็วไม่แน่นอน ร้อนจัดขึ้น (สูงถึง 42.9°C) และช่วงฤดูแล้ง พ.ย.–ก.พ. แทบไม่มีฝนเลย — จะปล่อยนาว่างไว้ หรือปลูกถั่ว / พืชคลุมดินหลังเก็บเกี่ยวข้าวดี? ชาวนายังไม่มีเครื่องมือที่นำข้อมูลอากาศและดินจริงมาวางเทียบ 3 ทางเลือกตามความจำเป็นของแปลงตัวเอง (มีน้ำเสริมไหม, ดินโทรมแค่ไหน, อยากได้เงินเร็วหรือลดปุ๋ย)

## เครื่องมือ (What it does)

เว็บแอปช่วยตัดสินใจหมุนเวียนพืชแบบไม่ใช้เซิร์ฟเวอร์ (Static No-Build HTML/CSS/JS บน GitHub Pages — โหลดเปิดดูได้ทันทีทั้งมือถือและคอมพิวเตอร์) เปรียบเทียบ **3 กลยุทธ์** จากข้อมูลประวัติศาสตร์ NASA POWER และ ISRIC SoilGrids (ไม่ใช่การพยากรณ์อากาศ):

- **A — ข้าวเดี่ยว (ปัจจุบัน):** ข้าวฤดูฝน (พ.ค.–ต.ค.) แล้วปล่อยว่างฤดูแล้ง (พ.ย.–เม.ย.)
- **B — ข้าว + ถั่วเขียวผิวมัน `ชัยนาท 84-1`:** ข้าวฤดูฝน → ถั่วเขียว 65 วัน (กลาง พ.ย.–ปลาย ม.ค./ต้น ก.พ.) *(ต้องอาศัยความชื้นดินร่วน + น้ำชลประทานเสริม 2–3 ครั้ง)*
- **C — ข้าว + ปอเทือง (`Crotalaria juncea`):** ข้าวฤดูฝน → ปอเทืองคลุมดิน/ปุ๋ยพืชสด 50–60 วัน (พ.ย.–ต้น ม.ค., ใช้ความชื้นตกค้างหลังนาเป็นหลัก + ห้ามน้ำขัง >2 วัน; หรือเลือกเก็บเมล็ด 120–150 วัน)
- **ข้าวเป็นพืชหลักในทุกกลยุทธ์** B/C เพิ่มเฉพาะพืชฤดูแล้ง พ.ย.–เม.ย.

รายละเอียดการคัดเลือกพันธุ์พืชและแหล่งที่มาทั้งหมดอยู่ใน [CROPS.md](CROPS.md) และ [SOURCES.md](SOURCES.md)

## ข้อมูลจริง (Real data — ไม่ใช่ตัวเลขสมมติ)

- **แปลง:** ต.ชัยนาม อ.วังทอง จ.พิษณุโลก — พิกัด `16.845925N, 100.466731E` *(แปลงสังเกตการณ์ที่เห็นทำนาข้าวทุกปี · ไม่ใช่แปลงของ sydear)*
- **NASA POWER** (`data/power_climatology.json` & `data/power_daily_2024.json`):
  - **25 ปี (2001–2025):** ฝนเฉลี่ยทั้งปี ~1,223.2 มม. (พ.ค.–ต.ค. ~1,070 มม.), สูงสุด ก.ย. 7.86 มม./วัน, ต่ำสุด ธ.ค. 0.29 มม./วัน, พ.ย.–ก.พ. เฉลี่ยแค่ ~52.6 มม.
  - **รายวันปี 2024:** ฝนรวม 1,359.9 มม. (พ.ค.–ต.ค. 1,250.4 มม.), ช่วง พ.ย.–ก.พ. รวมแค่ 28.8 มม. (พ.ย. 18.9, ธ.ค. 0.5, ม.ค. 9.0, ก.พ. 0.4), มี.ค. 75.8 มม. (พายุฤดูร้อน), เม.ย. 5.0 มม.; ฝนเริ่มตกจริง 6 พ.ค. 2024; ร้อนสุด 42.94°C (2 พ.ค.), เย็นสุด 13.38°C (21 ธ.ค.)
- **SoilGrids v2** (`data/soilgrid.json`): ดินร่วน (`silt 47.0%`, `clay 23.8%`, `sand 29.3%`), `pH 6.1`, อินทรีย์คาร์บอน `soc 2.09%` (0–5 ซม.) และลดเหลือ `1.23%` (5–15 ซม.)
- **ข้อจำกัดที่ต้องพูดตรงๆ:** POWER เป็นกริด ~50 กม. (ไม่ใช่ค่าที่แปลงโดยตรง); เครื่องมือนี้เปรียบเทียบจากข้อมูลย้อนหลัง **ไม่ใช่พยากรณ์อากาศ** — ไม่รับประกันผลผลิต และชาวนาเป็นผู้ตัดสินใจขั้นสุดท้าย

## วิธีเปิดใช้งานและตรวจข้อมูล (Run & Verify Locally)

ไม่ต้อง build เปิดไฟล์ใน `docs/` ด้วย static server ใดก็ได้:

```bash
# ตรวจสอบความตรงกันของข้อมูล JSON กับเว็บ + รัน unit test ตรรกะจัดอันดับ (Node.js)
node scripts/verify_data.mjs

# เปิดดูหน้าเว็บในเครื่อง
npx --yes http-server docs -p 4173 -a 127.0.0.1
# จากนั้นเปิด http://127.0.0.1:4173/
```

- **Live Demo (GitHub Pages):** `https://techfrontiers.github.io/field-shift/` *(เปิดใช้ได้ที่ Settings → Pages → `main` / `/docs`)*

## สถานะ (Status — Slices 1–4 Complete)

- [x] **Crop Research (`CROPS.md`)** — ถั่วเขียว `ชัยนาท 84-1` (B) และปอเทือง `Crotalaria juncea` (C) พร้อมแหล่งอ้างอิง DOA / Rice Dept / LDD / OAE / Feedipedia
- [x] **Slice 1 (`docs/`)** — กราฟฝน+อุณหภูมิ 2024 เทียบ 25 ปี, การ์ดดิน SoilGrids, พิกัดแปลง + ลิงก์ Maps/OSM, ข้อจำกัดข้อมูล
- [x] **Slice 2 (`docs/`)** — ตารางเปรียบเทียบ A/B/C ใน 5 ด้านระบุแหล่งที่มาทุกช่อง (Responsive มือถือ), กราฟเทียบฝน vs ความต้องการน้ำ, ปฏิทิน 12 เดือน (ไม่มีคะแนนรวมเดี่ยว)
- [x] **Slice 3 (`docs/`)** — สไลเดอร์เลือกความสำคัญ 5 ด้าน + ปุ่มสถานการณ์จำลอง + จัดอันดับพร้อมคำอธิบายภาษาชาวบ้าน + โหมด "ถ้าเปลี่ยนใจ"
- [x] **Slice 4** — สลับภาษา ไทย/อังกฤษ (`TH/EN`), Mobile-first UI, `SOURCES.md`, `scripts/verify_data.mjs`, และเตรียมข้อความส่งงาน + สคริปต์เดโม 30 วินาที

---

## แนวทางอัดวิดีโอเดโมไม่เกิน 30 วินาที (Demo Script — <=30s, English Subtitles)

> กฎ NASA Space Apps: ความยาววิดีโอ **ห้ามเกิน 30 วินาที** — ถ่ายหน้าจอมือถือหรือเบราว์เซอร์จริงแล้วใส่ซับอังกฤษตามช่วงเวลาด้านล่าง:

- **0:00–0:07 (Slice 1 — Real NASA Data):** เปิดหน้าเว็บ ชี้พิกัดแปลง `Chai Nam, Phitsanulok` และกราฟ 2024: *"Real NASA POWER data for this rice field: 1,250 mm wet rain, only 28.8 mm across Nov–Feb, and 42.9°C April–May heat — not a forecast."*
- **0:07–0:15 (Slice 2 — Sourced A/B/C Comparison):** เลื่อนลงดูตาราง 5 ด้าน + กราฟน้ำ + ปฏิทิน 12 เดือน: *"Compare A (Fallow), B (Chai Nat 84-1 Mungbean, needs irrigation), and C (Sunn Hemp cover crop, 55 days before the heat)."*
- **0:15–0:25 (Slice 3 — Farmer Priorities + Change Mind):** กดปุ่ม **"เน้นรายได้เสริม"** (เห็น B ขึ้น #1) แล้วเลื่อน **น้ำ/ดิน** หรือกด **"ถ้าเปลี่ยนใจ"** (เห็นอันดับสลับเป็น C หรือ A พร้อมเหตุผล): *"Rank options by your real priorities — slide water or soil up and watch #1 flip instantly."*
- **0:25–0:30 (Disclaimer + Close):** กดปุ่มสลับภาษา `TH ↔ EN` โชว์คำเตือนล่างสุด: *"Historical data supports the farmer — never replaces them."*

---

## ข้อความส่งงานภาษาอังกฤษ (Ready-to-paste for `spaceappschallenge.org`)

> ตามกติกาใน `PLAN.md` เนื้อหาฟอร์มส่งงานต้องเป็นภาษาอังกฤษทั้งหมด:

- **High-Level Summary:**
  FieldShift is a mobile-first, zero-backend crop-rotation decision-support web app built for smallholder rice farmers in Chai Nam, Wang Thong, Phitsanulok, Thailand (`16.845925N, 100.466731E`). Using 25 years of NASA POWER climatology (2001–2025), 2024 daily weather, ISRIC SoilGrids data, and verified Thai agricultural benchmarks, FieldShift helps farmers compare dry-season options after rice (Fallow vs. Chai Nat 84-1 Mungbean vs. Sunn Hemp cover crop) based on their own priorities—water scarcity, income, soil recovery, yield, or risk—without claiming to forecast future weather.
- **NASA Data Used:**
  NASA Langley Research Center (LaRC) POWER API (`PRECTOTCORR`, `T2M`, `T2M_MAX`, `T2M_MIN`, `RH2M`, `WS2M` — both 2001–2025 monthly climatology v2.10.1 and full 2024 daily series v2.10.3 at grid `16.846N, 100.467E`), combined with ISRIC SoilGrids v2 (`clay`, `silt`, `sand`, `phh2o`, `soc` at 0–5 cm and 5–15 cm).
- **Use of Artificial Intelligence (Super Intelligence Disclosure):**
  AI assistance (Antigravity / Gemini) was used to cross-reference Thai Department of Agriculture (DOA), Land Development Department (LDD), and Office of Agricultural Economics (OAE) crop benchmarks (`CROPS.md`), structure the offline-capable static UI (`docs/`), write automated dataset parity checks (`scripts/verify_data.mjs`), and prepare bilingual Thai/English copy. All climate and soil values in the application come directly from the embedded NASA POWER and SoilGrids JSON files and verified institutional sources.
