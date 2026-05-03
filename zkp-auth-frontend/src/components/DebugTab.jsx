import React, { useState } from 'react';
import { Banner, Btn, Card, CardHead, Field, Input, Sep } from './UI';
import ActivityLog from './ActivityLog';

export default function DebugTab({ baseUrl, onUrlChange, log, fetchDebugAddress, addLog }) {
  const [urlInput, setUrlInput] = useState(baseUrl);
  const [debugResult, setDebugResult] = useState(null);

  const apply = () => {
    onUrlChange(urlInput.trim().replace(/\/$/, ''));
    addLog('inf', 'Base URL updated to: ' + urlInput);
  };

  const fetchDebug = async () => {
    try {
      const addr = await fetchDebugAddress();
      setDebugResult({ ok: true, addr });
      addLog('ok', 'Debug address: ' + addr);
    } catch (e) {
      setDebugResult({ ok: false, msg: e.message });
      addLog('err', 'Debug fetch failed: ' + e.message);
    }
  };

  const infoRows = [
    ['Base URL', baseUrl],
    ['CORS', '* (all origins)'],
    ['Challenge', 'GET /auth/challenge'],
    ['Verify', 'POST /auth/verify'],
    ['Debug', 'GET /debug/address'],
  ];

  return (
    <div>
      <Card>
        <CardHead>Backend Configuration</CardHead>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {infoRows.map(([k, v]) => (
            <div key={k} style={{ background: 'var(--s2)', border: '1px solid var(--border)', padding: '0.7rem 0.9rem' }}>
              <div style={{ fontSize: 9, color: 'var(--t2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 11, color: 'var(--purple-l)', wordBreak: 'break-all' }}>{v}</div>
            </div>
          ))}
        </div>

        <Field label="Override Base URL">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Input
              type="text"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              style={{ flex: 1 }}
            />
            <Btn variant="purple" size="sm" onClick={apply} style={{ marginBottom: 0 }}>Apply</Btn>
          </div>
        </Field>

        <Sep />
        <CardHead>Test /debug/address</CardHead>

        <Btn variant="purple" onClick={fetchDebug} style={{ marginBottom: '0.75rem' }}>
          Fetch Debug Address from Backend
        </Btn>

        {debugResult && (
          debugResult.ok
            ? <Banner variant="teal">Test key derived address:<br /><span style={{ fontFamily: 'var(--mono)', fontSize: 10 }}>{debugResult.addr}</span></Banner>
            : <Banner variant="coral">{debugResult.msg}</Banner>
        )}

        <Sep />
        <CardHead style={{ marginBottom: '0.5rem' }}>Activity Log</CardHead>
        <ActivityLog entries={log} />
      </Card>
    </div>
  );
}
