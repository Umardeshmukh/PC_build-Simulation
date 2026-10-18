import { create } from 'zustand';

// ponytail: single store holds mode, session, and workshop UI state without split overhead
const INITIAL_CAREER_STATE = {
  rank: 'Junior Technician',
  level: 1,
  balance: 45000,
  reputation: 150,
  activeOrderId: 'order-001',
  completedOrderIds: [],
  orders: [
    {
      id: 'order-001',
      title: 'Reliable Office Workstation',
      client: 'Apex Logistics',
      budget: 35000,
      reward: 4500,
      description: 'Needs a reliable multi-core desktop for accounting spreadsheets and high-speed data entry.',
      targetCategory: 'Office / Productivity',
      minRamGb: 16,
      requiredStorage: 'SSD',
      status: 'available',
    },
    {
      id: 'order-002',
      title: 'Esports 1080p Gaming Rig',
      client: 'Rohan V.',
      budget: 68000,
      reward: 8200,
      description: 'Wants smooth 144+ FPS in Counter-Strike 2 and Valorant. Dedicated GPU with 8GB VRAM preferred.',
      targetCategory: 'Esports Gaming',
      minRamGb: 16,
      requiredStorage: 'NVMe',
      status: 'available',
    },
    {
      id: 'order-003',
      title: 'Creative Studio Video Rig',
      client: 'Maya Productions',
      budget: 145000,
      reward: 18500,
      description: '4K video rendering and Premiere timeline editing box. Requires 32GB RAM and powerful cooling.',
      targetCategory: 'Workstation',
      minRamGb: 32,
      requiredStorage: 'NVMe Gen4',
      status: 'locked',
    }
  ]
};

// Initial sample starter parts for Foundation UI preview
const STARTER_PARTS = {
  cpu: [
    { id: 'cpu-01', name: 'CoreForge i5-13400', category: 'cpu', price: 18500, socket: 'LGA1700', power: 65, rating: 78 },
    { id: 'cpu-02', name: 'AeroZen 5 7600X', category: 'cpu', price: 21000, socket: 'AM5', power: 105, rating: 85 },
  ],
  motherboard: [
    { id: 'mb-01', name: 'Aero B650 Pro-WiFi', category: 'motherboard', price: 16500, socket: 'AM5', form: 'ATX', ramGen: 'DDR5' },
    { id: 'mb-02', name: 'PrimeForge B760-Plus', category: 'motherboard', price: 14800, socket: 'LGA1700', form: 'ATX', ramGen: 'DDR5' },
  ],
  ram: [
    { id: 'ram-01', name: 'Vortex DDR5 16GB (2x8GB) 5600MHz', category: 'ram', price: 5800, capacity: 16, gen: 'DDR5' },
    { id: 'ram-02', name: 'FuryPeak DDR5 32GB (2x16GB) 6000MHz', category: 'ram', price: 10500, capacity: 32, gen: 'DDR5' },
  ],
  gpu: [
    { id: 'gpu-01', name: 'Forge RTX 4060 Dual', category: 'gpu', price: 29500, vram: '8GB', power: 115, rating: 74 },
    { id: 'gpu-02', name: 'TitanPulse RX 7700 XT', category: 'gpu', price: 42000, vram: '12GB', power: 245, rating: 88 },
  ],
  cooler: [
    { id: 'clr-01', name: 'FrostTower 120 Air Cooler', category: 'cooler', price: 2800, tdp: 180, type: 'Air' },
    { id: 'clr-02', name: 'LiquidArctic 240 AIO', category: 'cooler', price: 7200, tdp: 260, type: 'AIO Liquid' },
  ],
  storage: [
    { id: 'ssd-01', name: 'HyperDrive NVMe 1TB PCIe 4.0', category: 'storage', price: 6200, capacity: '1TB', speed: '5000MB/s' },
  ],
  psu: [
    { id: 'psu-01', name: 'VoltMaster 650W Bronze', category: 'psu', price: 5200, watts: 650, tier: '80+ Bronze' },
    { id: 'psu-02', name: 'QuantumPower 850W Gold', category: 'psu', price: 11500, watts: 850, tier: '80+ Gold Modular' },
  ],
  case: [
    { id: 'case-01', name: 'CyberGlass Mid-Tower Matte Black', category: 'case', price: 4800, form: 'ATX' },
  ],
  fans: [
    { id: 'fan-01', name: 'SilentBreeze 120mm Triple Pack', category: 'fans', price: 2100, airflow: 'High CFM' },
  ],
};

const safeStorage = {
  getItem: (k) => (typeof localStorage !== 'undefined' ? localStorage.getItem(k) : null),
  setItem: (k, v) => (typeof localStorage !== 'undefined' ? localStorage.setItem(k, v) : null),
  removeItem: (k) => (typeof localStorage !== 'undefined' ? localStorage.removeItem(k) : null),
};

const getStoredSave = () => {
  try {
    const raw = safeStorage.getItem('pc_forge_save_v1');
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read save data', err);
  }
  return null;
};

const DEFAULT_SUGGESTIONS = [
  {
    id: 'sug-1',
    title: 'Custom Braided Cable Routing & RGB Fan Hub',
    description: 'Allow players to pick custom braided cable colors (neon cyan, white, carbon black) and sync ARGB fan lighting effects.',
    category: 'customization',
    votes: 48,
    upvoted: false,
    author: 'NeoBuilder',
    createdAt: '2026-10-15',
    status: 'planned'
  },
  {
    id: 'sug-2',
    title: 'Add Extreme Overclocking & Liquid Nitrogen Benchmark',
    description: 'Sub-zero cooling mode to test silicon lottery voltage limits and reach 6.2GHz clock speeds on flagship unlocked chips.',
    category: 'feature',
    votes: 39,
    upvoted: false,
    author: 'ClockMaster_99',
    createdAt: '2026-10-16',
    status: 'under_review'
  },
  {
    id: 'sug-3',
    title: 'Dual-Chamber Cube Cases & Vertical GPU Riser',
    description: 'Add aquarium-style dual chamber chassis (Lian Li O11 / NZXT H9 style) with vertical PCIe 4.0 riser cable mounting.',
    category: 'hardware',
    votes: 34,
    upvoted: false,
    author: 'AeroChassis',
    createdAt: '2026-10-17',
    status: 'planned'
  },
  {
    id: 'sug-4',
    title: 'Workstation High-Core Server & ECC Memory Support',
    description: 'High-core rendering benchmarks with quad-channel memory validation and multi-socket server motherboards.',
    category: 'hardware',
    votes: 27,
    upvoted: false,
    author: 'DevMatrix',
    createdAt: '2026-10-18',
    status: 'new'
  }
];

const getStoredSuggestions = () => {
  try {
    const raw = safeStorage.getItem('pc_forge_suggestions_v1');
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read suggestions', err);
  }
  return DEFAULT_SUGGESTIONS;
};

export const useGameStore = create((set, get) => ({
  // Navigation
  currentScreen: 'menu', // 'menu' | 'sandbox-setup' | 'career-dashboard' | 'workshop' | 'settings' | 'contribute' | 'about'
  previousScreen: 'menu',
  setScreen: (screen) => set({ currentScreen: screen }),
  openContribute: (fromScreen = null) => {
    const prev = fromScreen || get().currentScreen;
    set({ previousScreen: prev, currentScreen: 'contribute' });
  },
  openAbout: (fromScreen = null) => {
    const prev = fromScreen || get().currentScreen;
    set({ previousScreen: prev, currentScreen: 'about' });
  },

  // Suggestions / Contribute State
  suggestions: getStoredSuggestions(),
  addSuggestion: ({ title, description, category, author }) => {
    const newSug = {
      id: 'sug-' + Date.now().toString(36),
      title: title.trim(),
      description: description.trim(),
      category: category || 'feature',
      votes: 1,
      upvoted: true,
      author: author?.trim() || 'Community Builder',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'new',
    };
    set((state) => {
      const updated = [newSug, ...state.suggestions];
      safeStorage.setItem('pc_forge_suggestions_v1', JSON.stringify(updated));
      return { suggestions: updated };
    });
    get().addToast('Suggestion submitted! Thanks for contributing.', 'success');
  },
  upvoteSuggestion: (id) => {
    set((state) => {
      const updated = state.suggestions.map((sug) => {
        if (sug.id === id) {
          const upvoted = !sug.upvoted;
          return {
            ...sug,
            upvoted,
            votes: upvoted ? sug.votes + 1 : sug.votes - 1,
          };
        }
        return sug;
      });
      safeStorage.setItem('pc_forge_suggestions_v1', JSON.stringify(updated));
      return { suggestions: updated };
    });
  },

  // Mode
  gameMode: 'sandbox', // 'sandbox' | 'career'
  hasSavedCareer: Boolean(getStoredSave()),

  // Career State
  career: getStoredSave()?.career || INITIAL_CAREER_STATE,

  // Sandbox Setup Config
  sandboxConfig: {
    budgetType: 'unlimited', // 'unlimited' | 'custom'
    customBudget: 100000,
  },
  setSandboxConfig: (config) => set((state) => ({ sandboxConfig: { ...state.sandboxConfig, ...config } })),

  // Settings
  settings: getStoredSave()?.settings || {
    soundEnabled: true,
    graphicsQuality: 'high', // 'low' | 'medium' | 'high' | 'ultra'
  },
  updateSettings: (newSettings) => set((state) => {
    const updated = { ...state.settings, ...newSettings };
    // ponytail: persist settings immediately
    const existing = getStoredSave() || {};
    safeStorage.setItem('pc_forge_save_v1', JSON.stringify({ ...existing, settings: updated }));
    return { settings: updated };
  }),

  // Workshop state
  activeCategory: 'cpu',
  installedParts: {},
  selectedPart: STARTER_PARTS.cpu[0],
  powerState: 'off', // 'off' | 'on' | 'failed'
  systemLog: ['PC Forge BIOS v1.02 initialized.', 'Standby power ready.'],

  // Client-side Hardware & Boot Loading Animations
  isBootLoading: false,
  bootMessage: '',
  bootProgress: 0,
  triggerBootSequence: (title, onFinish) => {
    set({ isBootLoading: true, bootMessage: title || 'INITIALIZING HARDWARE BUS...', bootProgress: 15 });
    
    setTimeout(() => {
      set({ bootMessage: 'CHECKING DDR5 MEMORY & VRM RAILS...', bootProgress: 45 });
    }, 280);

    setTimeout(() => {
      set({ bootMessage: 'PROBING PCIe LANES & NVMe SUBSYSTEM...', bootProgress: 80 });
    }, 600);

    setTimeout(() => {
      set({ bootMessage: 'SYSTEM INITIALIZATION COMPLETE', bootProgress: 100 });
    }, 900);

    setTimeout(() => {
      set({ isBootLoading: false, bootProgress: 0 });
      if (onFinish) onFinish();
    }, 1100);
  },

  // Notifications
  toasts: [],
  addToast: (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3500);
  },
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  // Game Flow Actions
  startSandbox: () => {
    set({
      gameMode: 'sandbox',
      currentScreen: 'workshop',
      installedParts: {},
      powerState: 'off',
      systemLog: ['Sandbox workbench loaded. Unlimited creative testing environment.'],
    });
    get().addToast('Entered Sandbox Workshop Mode', 'info');
  },

  startNewCareer: () => {
    const fresh = JSON.parse(JSON.stringify(INITIAL_CAREER_STATE));
    const payload = { career: fresh, settings: get().settings };
    safeStorage.setItem('pc_forge_save_v1', JSON.stringify(payload));
    set({
      career: fresh,
      gameMode: 'career',
      hasSavedCareer: true,
      currentScreen: 'career-dashboard',
    });
    get().addToast('New Career Profile Initialized!', 'success');
  },

  continueCareer: () => {
    const saved = getStoredSave();
    if (saved?.career) {
      set({
        career: saved.career,
        gameMode: 'career',
        currentScreen: 'career-dashboard',
      });
      get().addToast('Loaded Career Progression', 'info');
    } else {
      get().startNewCareer();
    }
  },

  acceptCareerOrder: (orderId) => {
    set((state) => {
      const updatedOrders = state.career.orders.map((o) =>
        o.id === orderId ? { ...o, status: 'active' } : o
      );
      return {
        career: { ...state.career, activeOrderId: orderId, orders: updatedOrders },
        gameMode: 'career',
        currentScreen: 'workshop',
        installedParts: {},
        powerState: 'off',
        systemLog: [`Job started: ${orderId}. Review customer requirements.`],
      };
    });
    get().addToast('Order accepted! Workshop bench prepared.', 'success');
  },

  resetCareerSave: () => {
    safeStorage.removeItem('pc_forge_save_v1');
    set({
      hasSavedCareer: false,
      career: INITIAL_CAREER_STATE,
      currentScreen: 'menu',
    });
    get().addToast('Career save data cleared.', 'info');
  },

  // Workshop Component Actions
  setActiveCategory: (cat) => {
    const partsForCat = STARTER_PARTS[cat] || [];
    set({
      activeCategory: cat,
      selectedPart: partsForCat[0] || null,
    });
  },

  setSelectedPart: (part) => set({ selectedPart: part }),

  installPart: (part) => {
    set((state) => {
      const updated = { ...state.installedParts, [part.category]: part };
      return {
        installedParts: updated,
        systemLog: [...state.systemLog, `Mounted: ${part.name} into socket/bay.`],
      };
    });
    get().addToast(`Installed ${part.name}`, 'success');
  },

  removePart: (category) => {
    set((state) => {
      const updated = { ...state.installedParts };
      const partName = updated[category]?.name || category;
      delete updated[category];
      return {
        installedParts: updated,
        powerState: 'off',
        systemLog: [...state.systemLog, `Detached: ${partName}.`],
      };
    });
    get().addToast(`Removed ${category.toUpperCase()}`, 'info');
  },

  togglePower: (skipAnimation = false) => {
    const { powerState, installedParts, triggerBootSequence } = get();
    if (powerState === 'on') {
      set({ powerState: 'off' });
      get().addToast('System powered down.', 'info');
      return;
    }

    const hasCore = installedParts.cpu && installedParts.motherboard && installedParts.psu;
    const applyPower = () => {
      if (hasCore) {
        set((state) => ({
          powerState: 'on',
          systemLog: [...state.systemLog, 'POST PASS: Standby rails energized.', 'Cooling fan curves activated.'],
        }));
        get().addToast('System powered ON. POST pass.', 'success');
      } else {
        set((state) => ({
          powerState: 'failed',
          systemLog: [...state.systemLog, 'POST FAILED: Missing CPU, Motherboard, or PSU.'],
        }));
        get().addToast('POST Error: Incomplete core assembly!', 'danger');
      }
    };

    if (skipAnimation) {
      applyPower();
    } else {
      triggerBootSequence('INITIATING POWER-ON SELF-TEST (POST)...', applyPower);
    }
  },

  runQuickDiagnostics: () => {
    const { installedParts } = get();
    const count = Object.keys(installedParts).length;
    const msg = `Hardware Audit: ${count} components seated. Power state: ${get().powerState}.`;
    set((state) => ({
      systemLog: [...state.systemLog, msg],
    }));
    get().addToast(msg, 'info');
  },

  // Catalogue access
  catalog: STARTER_PARTS,
}));
