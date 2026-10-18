# ⚡ PC Forge — Browser PC Building Simulator

<p align="center">
  <strong>An authentic, desktop-first hardware workbench simulator running 100% serverless in the browser.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Zustand-State-4338ca?style=flat-square" alt="Zustand" />
  <img src="https://img.shields.io/badge/Deployment-Vercel%20%7C%20Netlify-000000?style=flat-square&logo=vercel" alt="Vercel Ready" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />
</p>

---

## 🎮 Overview

**PC Forge** lets players select PC components, validate hardware compatibility (sockets, clearance, power headroom), mount parts into an interactive mid-tower chassis, diagnose power-on & boot issues, test animated POST sequences, and complete client contracts in Career mode or build freely in Sandbox mode.

---

## ✨ Features

- **Interactive Hardware Workbench**:
  - Procedural chassis viewport with slot indicators (CPU socket, RAM DIMMs, PCIe expansion bay, PSU shroud, M.2 NVMe drives).
  - Multiple camera angles (*Internal*, *Front*, *Side*, *Isometric*).
  - Real-time build cost calculation, power draw telemetry, and PSU headroom analysis.
- **Serverless & 100% Client-Side**:
  - Zero backend required.
  - Automatically persists career progression, wallet balance, and community feedback in `localStorage` via a robust storage layer.
- **Cool Cyberpunk Loading & Power Animations**:
  - Animated hardware diagnostic overlay with holographic radar spinner, laser scan sweep, and live bus probe messages.
  - Case breathing glow when energized and spinning exhaust fans with live RPM feedback.
- **Community Suggestions & Roadmap Hub**:
  - In-game community feedback system with category filtering, real-time upvotes, and developer JSON export.
- **Career & Sandbox Modes**:
  - **Career**: Real client orders with budget constraints, performance targets, and reputation payouts.
  - **Sandbox**: Unlimited or custom budgets for experimenting with custom halo rigs.
- **Developer & Creator Profile**:
  - Full developer background, credentials, and contact details for **Mohammed Umer Deshmukh**.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19 + JavaScript (ES6+)
- **Build Tool**: Vite 8
- **Global State**: Zustand
- **Icons**: Lucide React
- **Design System**: Vanilla CSS tokens (Dark Charcoal, Neon Cyan & Emerald accents, Glassmorphism)
- **Automated Checks**: Self-check assert test suite (`npm test`)

---

## 🚀 1-Click Free Web Deployment

### Deploy to Vercel (Recommended)
1. Fork or clone this repository:
   ```bash
   git clone git@github.com:Umardeshmukh/PC_build-Simulation.git
   ```
2. Go to [vercel.com](https://vercel.com) and click **Add New > Project**.
3. Import your `PC_build-Simulation` repo.
4. Framework Preset: **Vite** (automatically detected).
5. Build Command: `npm run build`, Output Directory: `dist`.
6. Click **Deploy**. Your site will be live with free SSL HTTPS!

### Deploy to Netlify
1. Run `npm run build` locally.
2. Drag and drop the `dist/` directory into [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone git@github.com:Umardeshmukh/PC_build-Simulation.git
cd PC_build-Simulation

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run automated test suite
npm test

# 5. Build for production
npm run build
```

---

## 👨‍💻 Creator & Lead Developer

**Mohammed Umer Deshmukh**  
*Frontend Developer & Project Coordinator* • B.Tech Computer Science  
- **Location**: Aurangabad, India  
- **GitHub**: [@umardesh](https://github.com/umardesh)  
- **Email**: [umardesh@gmail.com](mailto:umardesh@gmail.com)  
- **Phone**: +91 8484040411  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
