import React from 'react';

const s = {
  banner: (variant) => ({
    display: 'flex', alignItems: 'flex-start', gap: 10,
    padding: '0.85rem 1.1rem',
    border: `1px solid var(--${variant})`,
    background: `var(--${variant}-bg)`,
    color: `var(--${variant}-l, var(--${variant}))`,
    fontSize: 11, lineHeight: 1.6, marginTop: '0.75rem',
  }),
};

export function Banner({ variant = 'teal', icon, children, style }) {
  return (
    <div style={{ ...s.banner(variant), ...style }}>
      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{icon || (variant === 'teal' ? '✓' : variant === 'coral' ? '✗' : '!')}</span>
      <span>{children}</span>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--t2)', marginBottom: 5 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export function Input({ style, ...props }) {
  return (
    <input
      style={{
        width: '100%', background: 'var(--bg)', border: '1px solid var(--border2)',
        color: 'var(--t1)', fontFamily: 'var(--mono)', fontSize: 12,
        padding: '9px 11px', outline: 'none', transition: 'border-color 0.2s',
        ...style,
      }}
      onFocus={e => e.target.style.borderColor = 'var(--purple)'}
      onBlur={e => e.target.style.borderColor = 'var(--border2)'}
      {...props}
    />
  );
}

export function Btn({ variant = 'purple', size = 'full', disabled, loading, children, onClick, style }) {
  const isTeal = variant === 'teal';
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        width: size === 'full' ? '100%' : 'auto',
        padding: size === 'sm' ? '6px 14px' : '11px',
        fontFamily: 'var(--mono)', fontSize: size === 'sm' ? 10 : 11,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        border: `1px solid var(--${isTeal ? 'teal' : 'purple'})`,
        background: isTeal ? 'var(--teal-bg)' : 'var(--purple-bg)',
        color: isTeal ? 'var(--teal-l)' : 'var(--purple-l)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'all 0.15s', opacity: (disabled || loading) ? 0.4 : 1,
        cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
        marginBottom: size === 'full' ? '0.6rem' : 0,
        ...style,
      }}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export function Spinner() {
  return (
    <span style={{
      display: 'inline-block', width: 11, height: 11,
      border: '1.5px solid var(--border2)', borderTopColor: 'var(--purple)',
      borderRadius: '50%', animation: 'spin 0.5s linear infinite',
    }} />
  );
}

export function TokenBox({ children }) {
  return (
    <div style={{
      background: 'var(--bg)', border: '1px solid var(--border2)',
      padding: '9px 11px', fontSize: 9, color: 'var(--teal-l)',
      wordBreak: 'break-all', lineHeight: 1.7, marginTop: 8,
      fontFamily: 'var(--mono)',
    }}>
      {children}
    </div>
  );
}

export function CardHead({ children }) {
  return (
    <div style={{
      fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
      color: 'var(--purple)', marginBottom: '1.25rem', paddingBottom: '0.6rem',
      borderBottom: '1px solid var(--border)', fontFamily: 'var(--sans)',
    }}>
      {children}
    </div>
  );
}

export function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--s1)', border: '1px solid var(--border2)',
      padding: '1.25rem 1.5rem', marginBottom: '1rem', ...style,
    }}>
      {children}
    </div>
  );
}

export function Sep() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0.75rem 0' }} />;
}

// Inject keyframe for spinner
const style = document.createElement('style');
style.textContent = '@keyframes spin { to { transform: rotate(360deg); } } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }';
document.head.appendChild(style);
