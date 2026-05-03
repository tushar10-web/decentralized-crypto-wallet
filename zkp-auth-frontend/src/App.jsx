import React, { useState, useEffect } from 'react';
import { useZkpAuth } from './useZkpAuth';
import MetaMaskTab from './components/MetaMaskTab';
import ManualTab from './components/ManualTab';
import DebugTab from './components/DebugTab';

const TABS = ['01 / Authenticate', '02 / Manual Keys', '03 / Debug'];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [baseUrl, setBaseUrl] = useState('http://localhost:8080');
  const [backendStatus, setBackendStatus] = useState('checking');

  const {
    log, steps, stepVals, addLog,
    authWithMetaMask, authWithPrivateKey, deriveAddress, fetchDebugAddress,
  } = useZkpAuth(baseUrl);

  useEffect(() => {
    const check = async () => {
      try {
const r = await fetch(`${baseUrl}/auth/challenge?address=test`);        setBackendStatus(r.ok ? 'online' : 'warn');
      } catch {
        setBackendStatus('offline');
      }
    };
    check();
  }, [baseUrl]);

  const dotColor = { online: '#1d9e75', warn: '#ef9f27', offline: '#3a3f5c', checking: '#3a3f5c' }[backendStatus];
  const dotLabel = { online: 'backend online', warn: 'backend reachable', offline: 'backend offline', checking: 'checking...' }[backendStatus];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Scanline overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.13) 2px, rgba(0,0,0,0.13) 4px)',
        opacity: 0.4,
      }} />

      {/* Corner decorations */}
      {[
        { top: 12, left: 12, borderWidth: '1.5px 0 0 1.5px' },
        { top: 12, right: 12, borderWidth: '1.5px 1.5px 0 0' },
        { bottom: 12, left: 12, borderWidth: '0 0 1.5px 1.5px' },
        { bottom: 12, right: 12, borderWidth: '0 1.5px 1.5px 0' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'fixed', width: 16, height: 16,
          borderColor: 'var(--purple)', borderStyle: 'solid',
          ...pos,
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: '2rem', paddingBottom: '1rem',
          borderBottom: '1px solid var(--border2)',
        }}>
          <div style={{
            width: 44, height: 44, border: '1px solid var(--purple)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: 'var(--purple)', position: 'relative', flexShrink: 0,
          }}>
            <div style={{ position: 'absolute', inset: 4, border: '1px solid var(--purple-d)' }} />
            ETH
          </div>
          <div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 700, color: 'var(--purple-l)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ZKP Wallet Auth
            </div>
            <div style={{ fontSize: 10, color: 'var(--t2)', marginTop: 2, letterSpacing: '0.04em' }}>
              Ethereum signature · challenge-response · JWT issuance
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'var(--t2)', letterSpacing: '0.06em' }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: dotColor,
              animation: 'blink 3s infinite',
              display: 'inline-block',
            }} />
            {dotLabel}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', border: '1px solid var(--border2)', marginBottom: '1rem' }}>
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                flex: 1, padding: 9, textAlign: 'center',
                fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: activeTab === i ? 'var(--purple-l)' : 'var(--t2)',
                cursor: 'pointer', border: 'none',
                borderRight: i < TABS.length - 1 ? '1px solid var(--border2)' : 'none',
                background: activeTab === i ? 'var(--purple-d)' : 'var(--s1)',
                fontFamily: 'var(--mono)',
                transition: 'all 0.15s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 0 && (
          <MetaMaskTab
            steps={steps}
            stepVals={stepVals}
            onAuth={authWithMetaMask}
            addLog={addLog}
          />
        )}
        {activeTab === 1 && (
          <ManualTab
            steps={steps}
            stepVals={stepVals}
            onAuth={authWithPrivateKey}
            deriveAddress={deriveAddress}
            addLog={addLog}
          />
        )}
        {activeTab === 2 && (
          <DebugTab
            baseUrl={baseUrl}
            onUrlChange={setBaseUrl}
            log={log}
            fetchDebugAddress={fetchDebugAddress}
            addLog={addLog}
          />
        )}
      </div>
    </div>
  );
}
