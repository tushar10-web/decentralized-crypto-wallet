import React from 'react';

const STEPS = [
  { title: 'GET /auth/challenge?address=...', desc: 'Server generates a random nonce tied to your Ethereum address.' },
  { title: 'Sign challenge locally', desc: 'Your wallet signs the challenge with your private key via ECDSA. The key never leaves your device.' },
  { title: 'POST /auth/verify', desc: 'Server receives { address, message, signature }, verifies the EC signature, auto-creates user if new, issues JWT.' },
  { title: 'JWT issued', desc: 'Authentication complete. Zero knowledge of your private key was transmitted to the server.' },
];

export default function ProofSteps({ steps, stepVals }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '1.25rem 0' }}>
      {STEPS.map((s, i) => {
        const num = i + 1;
        const state = steps[num];
        const val = stepVals[num];
        const isActive = state === 'active';
        const isDone = state === 'done';
        const opacity = (!state) ? 0.22 : isDone ? 0.65 : 1;

        return (
          <div key={num} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '0.9rem 0',
            borderBottom: num < 4 ? '1px solid var(--border)' : 'none',
            opacity, transition: 'opacity 0.3s',
          }}>
            <div style={{
              width: 26, height: 26, flexShrink: 0,
              border: `1px solid ${isActive ? 'var(--purple)' : isDone ? 'var(--teal)' : 'var(--t3)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 600,
              color: isActive ? 'var(--purple)' : isDone ? 'var(--teal)' : 'var(--t3)',
              background: isDone ? 'rgba(29,158,117,0.1)' : 'transparent',
              transition: 'all 0.25s',
            }}>
              {isDone ? '✓' : num}
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--t1)', marginBottom: 3 }}>{s.title}</div>
              <div style={{ fontSize: 10, color: 'var(--t2)', lineHeight: 1.5, fontFamily: 'var(--sans)' }}>{s.desc}</div>
              {val && (
                <div style={{
                  fontSize: 9, color: 'var(--teal-l)', marginTop: 6,
                  wordBreak: 'break-all', lineHeight: 1.5,
                  background: 'var(--teal-bg)', padding: '4px 8px',
                  borderLeft: '2px solid var(--teal)',
                }}>
                  {val}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
