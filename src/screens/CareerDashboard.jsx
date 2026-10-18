import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowLeft, Award, Briefcase, CheckCircle2, ChevronRight, Lock, DollarSign, Cpu } from 'lucide-react';

export const CareerDashboard = () => {
  const { career, setScreen, acceptCareerOrder } = useGameStore();
  const [selectedTab, setSelectedTab] = useState('available'); // 'available' | 'completed'

  const availableOrders = career.orders.filter((o) => o.status !== 'completed');
  const completedOrders = career.orders.filter((o) => o.status === 'completed');

  return (
    <div style={{
      minHeight: '100vh',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setScreen('menu')}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Main Menu</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>BALANCE</span>
            <span style={{ color: 'var(--emerald)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.05rem' }}>
              ₹{career.balance.toLocaleString()}
            </span>
          </div>

          <div className="panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Award size={18} color="var(--cyan)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RANK</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
                {career.rank} (Lvl {career.level})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Career Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>
        {/* Left Column: Builder Profile Card */}
        <div className="panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #00e5ff 0%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(0, 229, 255, 0.3)',
            }}>
              <Cpu size={26} color="#000" />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#fff' }}>
                Forge Atelier
              </h3>
              <span className="badge badge-cyan">Certified Builder</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24, fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-dim)' }}>Reputation XP</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{career.reputation} / 500</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-dim)' }}>Completed Jobs</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>{career.completedOrderIds.length} orders</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-dim)' }}>Workshop Tier</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald)' }}>Tier 1 Essentials</span>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-surface-2)',
            padding: 14,
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: 'var(--text-dim)',
            lineHeight: 1.5,
          }}>
            Accept customer build orders, assemble matching parts within the budget, verify POST, and collect cash & reputation rewards.
          </div>
        </div>

        {/* Right Column: Customer Orders List */}
        <div className="panel" style={{ padding: '24px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
            <button
              onClick={() => setSelectedTab('available')}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: selectedTab === 'available' ? 'var(--cyan)' : 'var(--text-dim)',
                borderBottom: selectedTab === 'available' ? '2px solid var(--cyan)' : '2px solid transparent',
                paddingBottom: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Briefcase size={16} />
              <span>Available Contracts ({availableOrders.length})</span>
            </button>
            <button
              onClick={() => setSelectedTab('completed')}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: selectedTab === 'completed' ? 'var(--cyan)' : 'var(--text-dim)',
                borderBottom: selectedTab === 'completed' ? '2px solid var(--cyan)' : '2px solid transparent',
                paddingBottom: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <CheckCircle2 size={16} />
              <span>History ({completedOrders.length})</span>
            </button>
          </div>

          {selectedTab === 'available' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {availableOrders.map((order) => {
                const isLocked = order.status === 'locked';

                return (
                  <div
                    key={order.id}
                    style={{
                      background: 'var(--bg-surface-2)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                      opacity: isLocked ? 0.6 : 1,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff' }}>
                            {order.title}
                          </h4>
                          <span className="badge badge-cyan">{order.targetCategory}</span>
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                          Client: <span style={{ color: 'var(--text-dim)' }}>{order.client}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>MAX BUDGET</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                            ₹{order.budget.toLocaleString()}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>REWARD</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--emerald)', fontSize: '1rem' }}>
                            +₹{order.reward.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      {order.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 10,
                      borderTop: '1px solid var(--border-subtle)',
                      flexWrap: 'wrap',
                      gap: 10,
                    }}>
                      <div style={{ display: 'flex', gap: 8, fontSize: '0.78rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Required RAM: {order.minRamGb}GB</span>
                        <span style={{ color: 'var(--text-muted)' }}>•</span>
                        <span style={{ color: 'var(--text-muted)' }}>Storage: {order.requiredStorage}</span>
                      </div>

                      {isLocked ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--amber)', fontSize: '0.85rem' }}>
                          <Lock size={15} />
                          <span>Requires Level 2 Reputation</span>
                        </div>
                      ) : (
                        <button
                          className="btn-primary"
                          style={{ padding: '8px 16px', fontSize: '0.88rem' }}
                          onClick={() => acceptCareerOrder(order.id)}
                        >
                          <span>Accept & Enter Workshop</span>
                          <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedTab === 'completed' && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
              <div>No orders completed yet. Accept an order from the available contracts tab!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
