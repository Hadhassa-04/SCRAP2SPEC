# SCRAP2SPEC — Smart Material-Utilization Platform

> **"Waste Less. Make More."**  
> An intelligent manufacturing intelligence platform that turns leftover, rejected, and offcut materials into high-value engineered products.

---

## 🏭 1. Overview & Concept

Small and medium-sized manufacturers (SMBs) routinely liquidate 15% to 35% of prime raw stock as low-grade scrap metal (yielding a meager ₹28–₹35/kg). **SCRAP2SPEC** transforms that paradigm from:

> *"What can I do with this waste?"*  
> ➔  
> *"What can I make from this material?"*

By evaluating material metallurgy, geometry, and in-house machine capabilities (CNC machining, laser cutting, press-brake bending, welding), the platform calculates material reuse feasibility and recommends practical, high-margin products (brackets, enclosures, heat sinks, fixtures) yielding **6x to 12x higher realized value**.

---

## 🚀 2. Key Prototype Features

- **Marketing Landing Page:**
  - Hero with value proposition and conversion actions.
  - Interactive 4-step transformation loop (`Leftover Material → Smart Analysis → Product Ideas → Higher-Value Reuse`).
  - Scrap vs. Upcycling economic comparison.
  - 4-step workflow breakdown & manufacturer benefits.
- **Manufacturer Operations Dashboard:**
  - Real-time statistics (Materials Analyzed, Reuse Opportunities Found, Material Reused in kg, Potential Rupee Value Identified).
  - Monthly Material Reuse Progress bar chart (Jan–May).
  - Material Categories breakdown donut chart (Steel 45%, Aluminium 25%, Plastic 15%, Copper 10%, Other 5%).
  - Recent Materials analyzed table with one-click recommendation inspector.
- **Material Analysis Intake Engine:**
  - **"Try Demo Material" Button:** One-click autofill with Mild Steel offcut parameters (1200 × 600 × 4 mm, 85 kg, high strength, Laser/Bending/Welding/Drilling).
  - Form inputs for Material Type, Condition, Dimensions (mm/cm/inch), Quantity, Mechanical Properties, and Available Tooling Checkboxes.
  - Optional Material Image upload with preview and `"Visual inspection available in future AI version"` notice.
  - Multi-stage realistic holographic loading simulation.
- **Analysis Results Page:**
  - Circular SVG progress indicator showing **87% Material Reuse Potential**.
  - Upcycle vs Scrap market value benchmarks.
  - 4 to 6 AI Recommendation Cards (Compatibility %, Material required, Utilization %, Complexity, Rupee Value, and Engineering Rationale).
- **Product Recommendation Detail View (Modal):**
  - Full metallurgical justification.
  - Required material specifications.
  - Step-by-step Manufacturing Process Flow diagram (`Material Input → Laser Cutting → Bending → Drilling → Welding → Surface Finishing → Final QA`).
  - Estimated Economics Breakdown (`Material Cost Saved`, `Processing Cost`, `Est. Production Cost`, `Selling Value`, `Net Margin`).
  - Engineering Feasibility Disclaimer.
- **Decision Matrix (Comparison View):**
  - Side-by-side comparison table with multi-criteria sorting:
    - *Best Match* (Compatibility %)
    - *Highest Value* (Potential Value ₹)
    - *Highest Utilization* (Material Yield %)
    - *Lowest Complexity* (Low ➔ Medium ➔ High)
- **Saved Opportunities Pipeline:**
  - Saved recommendations persisted in browser `LocalStorage`.
  - Workflow lifecycle state management: `New` ➔ `Reviewing` ➔ `Prototype Planned` ➔ `In Production` ➔ `Completed`.
- **Historical Audit Log:**
  - Searchable and filterable log of all analyzed materials.
  - Click any record to instantly restore its full recommendation dossier.
  - One-click JSON export for factory ERP systems.
- **Future AI Architecture Roadmap:**
  - 10-stage multimodal AI roadmap modal detailing transition to YOLOv10 computer vision, spectral classification, and LLM generative CAM solvers.

---

## 🛠️ 3. Quick Start & Local Execution

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The application will start immediately at:
```
http://127.0.0.1:5173/
```

### 3. Production Build & Preview
To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 🧪 4. Step-by-Step Demo Guide for Presentations & Incubators

1. **Landing Page:** Open `http://127.0.0.1:5173/` to showcase the hero section, the interactive transformation loop, and the economics contrast between scrap resale (₹32/kg) and engineered fabrication (₹220/kg).
2. **Launch Analyzer:** Click **"Analyze My Material"** in the top navigation.
3. **One-Click Demo Fill:** Click the **"Try Demo Material"** button at the top of the intake form. Notice that it immediately populates Mild Steel plate dimensions (1200 × 600 × 4 mm, 85 kg) and tooling capabilities.
4. **Run Analysis:** Click **"Analyze Material"**. Observe the multi-stage scanning animation evaluating dimensional tolerances, machine constraints, and yield.
5. **Review Results:** Review the circular 87% reuse score and the 4 generated recommendations (e.g. *Industrial Mounting Brackets*, *Heavy-Duty Machine Guards*).
6. **Inspect Details:** Click **"View Details"** on *Industrial Mounting Brackets* to see the 7-step process flow, the economics breakdown, and the safety disclaimer. Click **"Save Recommendation"** (triggers celebration confetti).
7. **Compare Options:** Click **"Compare Opportunities"** to inspect the matrix table and test sorting by *Highest Value* and *Highest Utilization*.
8. **Track Workflow:** Switch to **"Saved Opportunities"** in the sidebar and update the status from *New* to *In Production*.
9. **Review Dashboard:** Navigate to the **"Dashboard"** to view the reuse progress bar chart and category donut breakdown.
10. **Explain AI Roadmap:** Click **"AI Roadmap"** in the top navigation bar to showcase the planned 10-stage AI architecture.

---

## 📐 5. Architecture & Tech Stack

- **Frontend Core:** React 19, JavaScript (ES Modules)
- **Tooling:** Vite 8
- **Icons:** `lucide-react`
- **Micro-interactions:** `canvas-confetti`
- **Data & State:** Rule-based recommendation heuristic engine + persistent LocalStorage
- **Design System:** Custom Vanilla CSS design tokens with industrial Slate, Navy, and Sustainability Emerald palettes.
