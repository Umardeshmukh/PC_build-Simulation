import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import {
  ArrowLeft,
  Cpu,
  Layers,
  Zap,
  HardDrive,
  Fan,
  Box,
  Check,
  AlertCircle,
  Power,
  Activity,
  Terminal,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  RotateCw,
  Compass,
  CheckCircle2,
  AlertTriangle,
  User
} from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';

const CATEGORIES = [
  { id: 'cpu', label: 'CPU', icon: Cpu },
  { id: 'motherboard', label: 'Motherboard', icon: Layers },
  { id: 'ram', label: 'Memory (RAM)', icon: Box },
  { id: 'gpu', label: 'Graphics (GPU)', icon: Zap },
  { id: 'cooler', label: 'CPU Cooler', icon: Fan },
  { id: 'storage', label: 'Storage', icon: HardDrive },
  { id: 'psu', label: 'Power Supply', icon: Zap },
  { id: 'case', label: 'Chassis / Case', icon: Box },
  { id: 'fans', label: 'Case Fans', icon: Fan },
];

export const Workshop = () => {
  const {
    gameMode,
    career,
    sandboxConfig,
    setScreen,
    activeCategory,
    setActiveCategory,
    selectedPart,
    setSelectedPart,
    installedParts,
    installPart,
    removePart,
    powerState,
    togglePower,
    systemLog,
    runQuickDiagnostics,
    settings,
    updateSettings,
    catalog,
    addToast
  } = useGameStore();

  const [activeViewAngle, setActiveViewAngle] = useState('internal'); // 'internal' | 'front' | 'side' | 'isometric'
  const [showLogDrawer, setShowLogDrawer] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Compute total build cost & power
  const installedList = Object.values(installedParts);
  const totalCost = installedList.reduce((sum, item) => sum + (item.price || 0), 0);
  const estimatedPower = installedList.reduce((sum, item) => sum + (item.power || 0), 0) + (installedParts.motherboard ? 50 : 0);

  // Budget calculations
  const maxBudget =
    gameMode === 'sandbox'
      ? sandboxConfig.budgetType === 'unlimited'
        ? Infinity
        : sandboxConfig.customBudget
      : career.orders.find((o) => o.id === career.activeOrderId)?.budget || career.balance;

  const isOverBudget = totalCost > maxBudget;

  const currentCategoryParts = catalog[activeCategory] || [];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: 'var(--bg-core)',
      overflow: 'hidden',
    }}>
      {/* 1. TOP NAVIGATION BAR */}
      <header style={{
        height: 56,
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface-1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 50,
      }}>
        {/* Left: Exit & Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => setShowExitConfirm(true)}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <ArrowLeft size={15} />
            <span>Exit Workbench</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className={gameMode === 'sandbox' ? 'badge badge-emerald' : 'badge badge-cyan'}>
              {gameMode === 'sandbox' ? 'SANDBOX WORKBENCH' : 'CAREER CLIENT CONTRACT'}
            </span>
            {gameMode === 'career' && career.activeOrderId && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {career.orders.find((o) => o.id === career.activeOrderId)?.title}
              </span>
            )}
          </div>
        </div>

        {/* Center: Financial & Power Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>BUILD COST:</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.98rem',
              color: isOverBudget ? 'var(--rose)' : '#fff'
            }}>
              ₹{totalCost.toLocaleString()}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>/</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
              {maxBudget === Infinity ? '∞ UNLIMITED' : `₹${maxBudget.toLocaleString()}`}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>EST. DRAW:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--cyan)' }}>
              {estimatedPower}W
            </span>
          </div>
        </div>

        {/* Right: Quick Controls & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => useGameStore.getState().openContribute('workshop')}
            className="btn-secondary"
            style={{ padding: '5px 10px', fontSize: '0.75rem', gap: 6 }}
            title="Suggest new components or submit feedback"
          >
            <Sparkles size={13} color="var(--cyan)" />
            <span>Suggestions</span>
          </button>

          <button
            onClick={() => useGameStore.getState().openAbout('workshop')}
            className="btn-secondary"
            style={{ padding: '5px 10px', fontSize: '0.75rem', gap: 6 }}
            title="About Developer & Simulator Architecture"
          >
            <User size={13} color="var(--emerald)" />
            <span>About</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--emerald)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: 'var(--emerald)', display: 'inline-block' }} />
            <span>SESSION ACTIVE</span>
          </div>

          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            style={{ color: 'var(--text-dim)', padding: 6 }}
            title={settings.soundEnabled ? 'Mute' : 'Unmute'}
          >
            {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </header>

      {/* 2. MAIN 3-PANEL WORKSPACE */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '340px 1fr 340px',
        overflow: 'hidden',
      }}>
        {/* LEFT COLUMN: Categories & Component Picker */}
        <div style={{
          borderRight: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface-1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            padding: '8px',
            gap: 6,
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-core)',
          }}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              const isInstalled = Boolean(installedParts[cat.id]);

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-display)',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: isSelected ? 'var(--bg-surface-3)' : 'transparent',
                    color: isSelected ? 'var(--cyan)' : 'var(--text-dim)',
                    border: isSelected ? '1px solid var(--border-focus)' : '1px solid transparent',
                  }}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                  {isInstalled && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--emerald)' }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Component Catalog List for Active Category */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 6px',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                AVAILABLE HARDWARE ({currentCategoryParts.length})
              </span>
              {installedParts[activeCategory] && (
                <button
                  onClick={() => removePart(activeCategory)}
                  style={{
                    color: 'var(--rose)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Trash2 size={13} />
                  <span>Detach Current</span>
                </button>
              )}
            </div>

            {currentCategoryParts.map((part) => {
              const isSelected = selectedPart?.id === part.id;
              const isInstalled = installedParts[part.category]?.id === part.id;

              return (
                <div
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  style={{
                    background: isSelected ? 'var(--bg-surface-3)' : 'var(--bg-surface-2)',
                    border: isInstalled
                      ? '1px solid var(--emerald)'
                      : isSelected
                      ? '1px solid var(--cyan)'
                      : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 12,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.92rem', color: '#fff' }}>
                      {part.name}
                    </div>
                    {isInstalled && (
                      <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                        INSTALLED
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)', fontWeight: 700, fontSize: '0.9rem' }}>
                      ₹{part.price.toLocaleString()}
                    </span>

                    <button
                      className={isInstalled ? 'btn-secondary' : 'btn-primary'}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInstalled) {
                          removePart(part.category);
                        } else {
                          installPart(part);
                        }
                      }}
                    >
                      {isInstalled ? 'Uninstall' : 'Install Part'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER COLUMN: Central 3D Interactive Viewport Placeholder */}
        <div style={{
          backgroundColor: '#07080b',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Viewport Control Bar */}
          <div style={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10,
            display: 'flex',
            gap: 8,
            backgroundColor: 'rgba(17, 20, 27, 0.8)',
            padding: 4,
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            backdropFilter: 'blur(8px)',
          }}>
            {['internal', 'front', 'side', 'isometric'].map((angle) => (
              <button
                key={angle}
                onClick={() => setActiveViewAngle(angle)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 4,
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  background: activeViewAngle === angle ? 'var(--cyan)' : 'transparent',
                  color: activeViewAngle === angle ? '#000' : 'var(--text-dim)',
                  fontWeight: activeViewAngle === angle ? 700 : 500,
                }}
              >
                {angle} view
              </button>
            ))}
          </div>

          {/* Procedural 3D Case / Interactive Standoff Mockup (Clear temporary placeholder for R3F) */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: 24,
            background:
              'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 60%), linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          }}>
            {/* Mid-Tower Case Outline */}
            <div
              className={powerState === 'on' ? 'chassis-powered-glow' : ''}
              style={{
                width: '100%',
                maxWidth: 580,
                height: '84%',
                border: powerState === 'on' ? '2px solid var(--cyan)' : '2px solid rgba(0, 229, 255, 0.25)',
                borderRadius: 14,
                backgroundColor: 'rgba(13, 16, 22, 0.85)',
                boxShadow: powerState === 'on' ? '0 0 40px rgba(0, 229, 255, 0.25), inset 0 0 25px rgba(0, 229, 255, 0.08)' : '0 12px 40px rgba(0,0,0,0.7)',
                display: 'flex',
                flexDirection: 'column',
                padding: 16,
                gap: 12,
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Case Header HUD & Top Exhaust Fans */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Compass size={15} color="var(--cyan)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)' }}>
                    PROCEDURAL VIEWPORT // {activeViewAngle.toUpperCase()} ORIENTATION
                  </span>
                  {/* Exhaust Fan animation */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8 }}>
                    <Fan size={14} color={powerState === 'on' ? 'var(--cyan)' : 'var(--text-muted)'} className={powerState === 'on' ? 'fan-spin-active' : ''} />
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: powerState === 'on' ? 'var(--cyan)' : 'var(--text-muted)' }}>
                      {powerState === 'on' ? '1450 RPM' : 'FANS IDLE'}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: powerState === 'on' ? 'var(--emerald)' : powerState === 'failed' ? 'var(--rose)' : 'var(--text-muted)',
                    boxShadow: powerState === 'on' ? '0 0 8px var(--emerald)' : 'none',
                  }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    POST: {powerState.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Main Motherboard Tray Layout */}
              <div style={{
                flex: 1,
                border: '1px dashed rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: 16,
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gridTemplateRows: '1fr 1fr',
                gap: 12,
                position: 'relative',
                background: installedParts.motherboard ? 'rgba(16, 30, 40, 0.4)' : 'transparent',
              }}>
                {/* Slot 1: CPU & Socket */}
                <div
                  onClick={() => setActiveCategory('cpu')}
                  style={{
                    border: installedParts.cpu ? '1px solid var(--cyan)' : '1px dashed var(--border-subtle)',
                    borderRadius: 6,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: installedParts.cpu ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255,255,255,0.01)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Cpu size={26} color={installedParts.cpu ? 'var(--cyan)' : 'var(--text-muted)'} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: installedParts.cpu ? '#fff' : 'var(--text-muted)', marginTop: 6 }}>
                    {installedParts.cpu ? installedParts.cpu.name : 'SOCKET LGA/AM5'}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: installedParts.cpu ? 'var(--emerald)' : 'var(--text-muted)' }}>
                    {installedParts.cpu ? 'SEATED' : '[CLICK TO INSTALL]'}
                  </span>
                </div>

                {/* Slot 2: RAM Slots */}
                <div
                  onClick={() => setActiveCategory('ram')}
                  style={{
                    border: installedParts.ram ? '1px solid var(--cyan)' : '1px dashed var(--border-subtle)',
                    borderRadius: 6,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: installedParts.ram ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255,255,255,0.01)',
                    cursor: 'pointer',
                  }}
                >
                  <Box size={24} color={installedParts.ram ? 'var(--cyan)' : 'var(--text-muted)'} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: installedParts.ram ? '#fff' : 'var(--text-muted)', marginTop: 6 }}>
                    {installedParts.ram ? `${installedParts.ram.capacity}GB DDR5` : 'DIMM SLOTS 1-4'}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: installedParts.ram ? 'var(--emerald)' : 'var(--text-muted)' }}>
                    {installedParts.ram ? 'DUAL-CHANNEL' : '[CLICK TO INSTALL]'}
                  </span>
                </div>

                {/* Slot 3: PCIe GPU Bay */}
                <div
                  onClick={() => setActiveCategory('gpu')}
                  style={{
                    gridColumn: '1 / span 2',
                    border: installedParts.gpu ? '1px solid var(--emerald)' : '1px dashed var(--border-subtle)',
                    borderRadius: 6,
                    padding: 14,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: installedParts.gpu ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.01)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Zap size={22} color={installedParts.gpu ? 'var(--emerald)' : 'var(--text-muted)'} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: installedParts.gpu ? '#fff' : 'var(--text-muted)' }}>
                        {installedParts.gpu ? installedParts.gpu.name : 'PCIe 4.0 x16 EXPANSION SLOT'}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {installedParts.gpu ? `${installedParts.gpu.vram} VRAM • ${installedParts.gpu.power}W TDP` : 'Clearance: 340mm'}
                      </div>
                    </div>
                  </div>
                  <span className={installedParts.gpu ? 'badge badge-emerald' : 'badge badge-cyan'} style={{ fontSize: '0.65rem' }}>
                    {installedParts.gpu ? 'LOCKED' : 'EMPTY'}
                  </span>
                </div>
              </div>

              {/* Lower PSU Shroud & Drives */}
              <div style={{
                height: 60,
                border: '1px solid var(--border-subtle)',
                borderRadius: 6,
                backgroundColor: 'var(--bg-surface-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
              }}>
                <div
                  onClick={() => setActiveCategory('psu')}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                >
                  <Zap size={18} color={installedParts.psu ? 'var(--cyan)' : 'var(--text-muted)'} />
                  <div>
                    <div style={{ fontSize: '0.78rem', color: installedParts.psu ? '#fff' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {installedParts.psu ? installedParts.psu.name : 'PSU CHAMBER (EMPTY)'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {installedParts.psu ? `${installedParts.psu.watts}W Tier` : 'ATX Standard Mount'}
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setActiveCategory('storage')}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                >
                  <HardDrive size={18} color={installedParts.storage ? 'var(--cyan)' : 'var(--text-muted)'} />
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.78rem', color: installedParts.storage ? '#fff' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {installedParts.storage ? installedParts.storage.name : 'M.2 NVMe BAY'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {installedParts.storage ? installedParts.storage.capacity : 'Gen4 Ready'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Viewport Overlay Notice */}
              <div style={{
                position: 'absolute',
                bottom: 8,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                // 3D Three.js & R3F Scene will anchor here in Milestone 3
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Inspector & Build Summary */}
        <div style={{
          borderLeft: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface-1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          padding: 16,
          gap: 16,
        }}>
          {/* Selected Component Inspector Card */}
          <div className="panel" style={{ padding: 14 }}>
            <div className="panel-header" style={{ padding: '0 0 10px 0', marginBottom: 10 }}>
              <span>Hardware Inspector</span>
              {selectedPart && <span className="badge badge-cyan">{selectedPart.category}</span>}
            </div>

            {selectedPart ? (
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#fff', marginBottom: 4 }}>
                  {selectedPart.name}
                </h4>
                <div style={{ color: 'var(--emerald)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 14 }}>
                  ₹{selectedPart.price.toLocaleString()}
                </div>

                {/* Specs List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.8rem', marginBottom: 16 }}>
                  {Object.entries(selectedPart)
                    .filter(([key]) => !['id', 'name', 'category', 'price'].includes(key))
                    .map(([key, value]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 4 }}>
                        <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase' }}>{key}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>{String(value)}</span>
                      </div>
                    ))}
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '10px 0' }}
                  onClick={() => installPart(selectedPart)}
                >
                  <Plus size={16} />
                  <span>Mount / Install Into Rig</span>
                </button>
              </div>
            ) : (
              <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Select a component from the catalog on the left to inspect detailed specifications.
              </div>
            )}
          </div>

          {/* Current Rig Assembly Summary */}
          <div className="panel" style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="panel-header" style={{ padding: '0 0 10px 0', marginBottom: 12 }}>
              <span>Rig Checklist</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)' }}>
                {installedList.length} / {CATEGORIES.length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, overflowY: 'auto' }}>
              {CATEGORIES.map((cat) => {
                const installed = installedParts[cat.id];
                return (
                  <div
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      background: 'var(--bg-surface-2)',
                      borderRadius: 4,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      border: installed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                    }}
                  >
                    <span style={{ color: installed ? '#fff' : 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
                      {cat.label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: installed ? 'var(--emerald)' : 'var(--text-muted)'
                    }}>
                      {installed ? installed.name.substring(0, 16) + '...' : 'MISSING'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ACTIONS & DIAGNOSTICS DOCK */}
      <footer style={{
        height: 64,
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface-1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 50,
      }}>
        {/* Left: Power Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={togglePower}
            className={powerState === 'on' ? 'btn-danger' : 'btn-primary'}
            style={{ padding: '10px 20px' }}
          >
            <Power size={18} />
            <span>{powerState === 'on' ? 'POWER OFF' : 'TEST POWER ON'}</span>
          </button>

          <button
            onClick={runQuickDiagnostics}
            className="btn-secondary"
            style={{ padding: '10px 16px' }}
          >
            <Activity size={18} color="var(--cyan)" />
            <span>Run Diagnostics</span>
          </button>
        </div>

        {/* Center: Live Terminal Log Peek */}
        <button
          onClick={() => setShowLogDrawer(!showLogDrawer)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--text-dim)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            background: 'var(--bg-surface-2)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Terminal size={14} color="var(--cyan)" />
          <span>{systemLog[systemLog.length - 1] || 'Diagnostics Log'}</span>
        </button>

        {/* Right: Reset Workbench */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => {
              Object.keys(installedParts).forEach((cat) => removePart(cat));
              addToast('All parts unmounted from chassis', 'info');
            }}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
            disabled={installedList.length === 0}
          >
            <Trash2 size={15} />
            <span>Clear Rig</span>
          </button>
        </div>
      </footer>

      {/* Slide-out Terminal Log Drawer */}
      {showLogDrawer && (
        <div style={{
          position: 'fixed',
          bottom: 64,
          left: 340,
          right: 340,
          height: 180,
          backgroundColor: '#07090d',
          borderTop: '1px solid var(--border-focus)',
          borderLeft: '1px solid var(--border-subtle)',
          borderRight: '1px solid var(--border-subtle)',
          padding: 16,
          overflowY: 'auto',
          zIndex: 40,
          boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.7)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)' }}>
              SYSTEM DIAGNOSTICS CONSOLE LOG
            </span>
            <button onClick={() => setShowLogDrawer(false)} style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              CLOSE [ESC]
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
            {systemLog.map((log, index) => (
              <div key={index} style={{ color: log.includes('FAILED') ? 'var(--rose)' : log.includes('successful') ? 'var(--emerald)' : 'var(--text-dim)' }}>
                {`> [${index + 1}] ${log}`}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      <ConfirmModal
        isOpen={showExitConfirm}
        title="Leave Workbench?"
        message="Your currently mounted components remain in local state. Do you want to return to the menu?"
        confirmText="Leave Workshop"
        onConfirm={() => {
          setShowExitConfirm(false);
          setScreen('menu');
        }}
        onCancel={() => setShowExitConfirm(false)}
      />
    </div>
  );
};
