<<<<<<< HEAD
# Md. Al Emran — Professional Personal Portfolio & Research Repository

A modern, responsive, research-oriented personal portfolio website and academic repository for **Md. Al Emran**, an Electrical and Electronic Engineering graduate from Pabna University of Science and Technology (PUST), DWDM Network Engineer at Fiber@Home Ltd., former IEEE PUST Student Branch Chair, and active researcher in AI applications for Power Systems, Renewable Energy, and Smart Grids.

---

## 🌟 Key Features

### 1. Research-Oriented Academic & Industry Presentation
- **Hero & Identity:** Professional profile photograph, live academic metrics (3 Journal Articles, 16+ IEEE Conference Publications, 10+ Oral Presentations), verified links to Google Scholar, ResearchGate, IEEE Xplorer, LinkedIn, and GitHub.
- **Dual CV Downloads:** Dedicated dropdown for downloading both the **Professional Engineering CV** (DWDM & Industry focused) and the **Academic & Research CV** (MSc/PhD & Publication focused).
- **Primary Research Focus:** Prominently highlights *Integrating Artificial Intelligence with Electrical Power Engineering, Renewable Energy, and Smart Grid Technologies*.
- **Interactive Publications Catalog:** Filterable by publication type (*Journals, IEEE Conferences, Under Review*), publication year (*2026, 2025, 2024*), and research area (*Power Transmission, Signal Processing, Activity Recognition, Agricultural AI, Medical Imaging*). Includes instant search, expandable abstracts, clickable DOI links, and one-click **BibTeX** citation copying.
- **Professional Engineering & DWDM Experience:** In-depth coverage of current role at Fiber@Home Ltd. (Nokia PSS 1830 L-Band Expansion Project, ROADM architecture, optical transport, transponders, amplifiers, Central Offices, and BOQ/BOM).
- **Industrial Field Attachments:** Detailed technical breakdown of visits to **Kaptai Hydropower Station (230 MW)**, **Secondary Satellite Ground Station (SSGS) Betbunia**, and **HVDC Converter Substation**.
- **Certified Industrial Automation Training:** Siemens S7-1200 PLC, HMI, SCADA, VFD, Modbus, Profibus, and Profinet.
- **Academic & Engineering Projects:** Automatic Solar Tracking System Using Arduino, Real-Time Driver Activity Detection, ARTHX-Net EEG Decoding, and Satellite Flood Extent Segmentation.
- **Leadership & IEEE Service:** Former Chair of IEEE PUST Student Branch (50+ team, 500+ attendees at IEEE Day 2024), Conference Ambassador for IEEE Bangladesh Section, ICCIT presenter, and Elsevier peer reviewer.
- **Verified References:** Full academic and professional contact details for faculty professors and industry managers.
- **Interactive Contact Form & WhatsApp Integration:** Contact form storing incoming inquiries directly into the admin inbox, plus direct WhatsApp chat link.

---

### 2. Private Personal Administrator Dashboard (`#admin`)
A private, password-protected CMS dashboard that allows Md. Al Emran to update the website without touching code:
- **Profile & Identity:** Edit headlines, short bio, full bio paragraphs, phone, email, location, and upload new profile photos.
- **Publications Manager:** Add new papers, edit existing papers, change publication status (*Published / Accepted / Under Review*), update DOIs, and delete papers with confirmation.
- **Research Interests:** Add, modify, or reorder scientific focus areas and tags.
- **News & Announcements:** Publish acceptance announcements or industry updates.
- **Contact Form Inbox:** Read inquiries received from the public contact form, mark as read, or reply directly via email.
- **Security & Password Management:** Update the administrator security passkey.
- **Full Database Backup & Restore:** Export the entire website state as a single JSON file, import JSON backups, or reset to verified default CV data.
- **Cloud Database Ready:** Built-in support for connecting live Supabase (PostgreSQL) or Firebase Firestore backends.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS (Navy Blue, Slate Charcoal, Electric Cyan, Emerald, and Gold accents)
- **Icons:** Lucide React
- **Build Tool:** Vite 5
- **Persistence Engine:** Dual-layer (Instant HTML5 LocalStorage + Supabase/Firebase Cloud API ready)
- **Design System:** Dark Mode (default) & Light Mode with instant toggle and zero-flash bootstrap

---

## 🚀 Quick Start Guide (Run Locally)

### Option A: One-Click Instant Launch (Fastest)
Simply double-click the batch file in Windows Explorer:
- **`run-website.bat`**: Instantly starts the local server and opens **`http://localhost:5173`** in your default web browser.
- **`run-dev.bat`**: Starts the Vite hot-reloading development server (`npm run dev`).
- **`run-build.bat`**: Recompiles the production build into `/dist`.

---

### Option B: Command Line (PowerShell or Terminal)

#### 1. Instant Preview / Local Server:
```bash
python serve.py
```
Open **`http://localhost:5173/`** in your browser.

#### 2. Full Development Server with Hot Module Reloading:
```bash
npm run dev
```

#### 3. Production Build:
```bash
npm run build
npm run preview
```

---

## 🔐 Admin Panel Access

1. Navigate to `/#admin` or click the **Admin Portal** shield icon in the top navigation bar or footer.
2. Enter the administrator passkey:
   - **Default Passkey:** `emran2026`
   *(You can change this passkey at any time inside the Admin Settings tab)*.
3. Make changes to any section (publications, bio, research interests, announcements).
4. All changes immediately reflect across the public portfolio!

---

## 🌐 Deployment Instructions

### Option 1: Vercel (Recommended — Free & Automated)
1. Push this project to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Click **"Deploy"**. Your site will be live on a fast global CDN with automated HTTPS!

### Option 2: Netlify
1. Connect your GitHub repository on [netlify.com](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Option 3: GitHub Pages (Pre-configured with GitHub Actions)
1. `vite.config.ts` (`base: './'`) and `.github/workflows/deploy.yml` are already configured for automated builds.
2. Double-click **`publish-to-github.bat`** to sign in via GitHub browser OAuth, push to your repository, and enable GitHub Actions deployment.
3. Or manually push to GitHub, then open **Settings → Pages → Source: GitHub Actions**.

---

## 📁 Project Folder Structure

```
d:\Emran\Personal Website/
├── public/
│   ├── Md_Al_Emran_CV.pdf           # Professional Engineering CV
│   ├── Md_Al_Emran_Academic_CV.pdf  # Academic & Research CV
│   ├── profile.png                  # Official Portrait Photograph
│   └── favicon.svg                  # High-Tech Favicon
├── src/
│   ├── types/
│   │   └── portfolio.ts             # TypeScript definitions for all models
│   ├── data/
│   │   └── initialData.ts           # 100% verified CV data (Publications, Roles, etc.)
│   ├── context/
│   │   └── PortfolioContext.tsx     # State management, local/cloud persistence, auth
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Sticky nav, theme switch, CV download dropdown
│   │   │   └── Footer.tsx           # Footer, quick links, admin entrypoint
│   │   ├── sections/
│   │   │   ├── Hero.tsx             # Hero with metrics counter & direct profiles
│   │   │   ├── About.tsx            # Academic trajectory & candidate summary
│   │   │   ├── ResearchInterests.tsx# AI for Power Systems & Microgrids
│   │   │   ├── Publications.tsx     # Filterable papers catalog with DOI & BibTeX
│   │   │   ├── Experience.tsx       # Fiber@Home DWDM role & industrial visits
│   │   │   ├── Projects.tsx         # Solar tracking, driver monitoring, ARTHX-Net
│   │   │   ├── Skills.tsx           # Categorized engineering & AI stack
│   │   │   ├── Education.tsx        # B.Sc. EEE PUST, thesis, HSC, SSC
│   │   │   ├── Leadership.tsx       # IEEE branch chair, peer review, references
│   │   │   └── Contact.tsx          # Direct contacts, WhatsApp link, message form
│   │   └── admin/
│   │       ├── AdminLogin.tsx       # Passkey authentication
│   │       └── AdminDashboard.tsx   # Comprehensive content management system
│   ├── App.tsx                      # Root router between public & admin view
│   ├── main.tsx                     # React root & context provider mount
│   └── index.css                    # Tailwind CSS directives & custom styling
├── index.html                       # SEO metadata, Open Graph tags & Google fonts
├── tailwind.config.js               # Navy blue & electric cyan theme configuration
├── tsconfig.json                    # TypeScript compiler configuration
└── package.json                     # Dependencies & scripts
```

---

## 📄 License & Attribution
Designed and built for **Md. Al Emran**. All academic publications and institutional details are verified from official academic and corporate credentials.
=======
# md-al-emran.github.io
Personal Portfolio Website – Md. Al Emran
>>>>>>> 8aa0eac1ede639da0085d82bcb3dfeea294c1611
