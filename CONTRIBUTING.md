# Contributing to PC Forge

Thank you for your interest in contributing to **PC Forge**! This project is community-driven and designed to be an accessible, 100% client-side PC building simulator.

---

## 🛠️ How to Contribute

### 1. Suggesting New Fictional Components
You can propose new fictional components directly in-game via the **Suggestions & Feedback Hub** or by opening an Issue or Pull Request on GitHub.

When adding hardware specifications, please follow this format:
```json
{
  "id": "gpu-custom-01",
  "name": "Forge RTX 4080 Super OC",
  "category": "gpu",
  "price": 85000,
  "vram": "16GB",
  "power": 320,
  "rating": 94
}
```

### 2. Local Setup & Testing
1. Clone the repository:
   ```bash
   git clone git@github.com:Umardeshmukh/PC_build-Simulation.git
   cd PC_build-Simulation
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Run the automated check suite:
   ```bash
   npm test
   ```

### 3. Submitting Pull Requests
- Keep changes concise, modular, and adhering to the Ponytail senior developer guidelines (zero bloat, reusable components, deletion over addition).
- Verify `npm test` and `npm run build` succeed before opening a PR.

---

## 📬 Contact & Creator
- **Lead Developer**: Mohammed Umer Deshmukh
- **GitHub**: [@umardesh](https://github.com/umardesh)
- **Email**: umardesh@gmail.com
