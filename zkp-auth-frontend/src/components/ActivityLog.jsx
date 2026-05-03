import React, { useEffect, useRef } from 'react';

const colors = { ok: 'var(--teal-l)', err: 'var(--coral)', inf: 'var(--purple-l)', dim: 'var(--t3)' };

export default function ActivityLog({ entries }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [entries]);

  return (
    <div ref={ref} style={{
      background: 'var(--bg)', border: '1px solid var(--border)',
      padding: '0.75rem 1rem', maxHeight: 180, overflowY: 'auto',
      fontSize: 10, lineHeight: 1.9, fontFamily: 'var(--mono)',
    }}>
      {entries.map((e, i) => (
        <div key={i} style={{ color: colors[e.type] || 'var(--t2)' }}>{e.msg}</div>
      ))}
    </div>
  );
}
