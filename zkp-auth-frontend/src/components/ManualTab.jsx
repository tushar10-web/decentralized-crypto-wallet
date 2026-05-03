import React, { useState } from 'react';
import { Banner, Btn, Card, CardHead, Field, Input, Sep, TokenBox } from './UI';

export default function ManualTab({ steps, stepVals, onAuth, deriveAddress, addLog }) {
  const [privateKey, setPrivateKey] = useState('');
  const [derivedAddr, setDerivedAddr] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const derive = () => {
    if (!privateKey.trim()) { addLog('err', 'Enter a private key first'); return; }
    try {
      const addr = deriveAddress(privateKey.trim());
      setDerivedAddr(addr);
      addLog('ok', 'Derived address: ' + addr);
    } catch (e) {
      addLog('err', 'Derivation failed: ' + e.message);
    }
  };

  const authenticate = async () => {
    if (!privateKey.trim()) { addLog('err', 'Private key required'); return; }
    setLoading(true);
    setResult(null);
    try {
      const { address, token } = await onAuth(privateKey.trim());
      setDerivedAddr(address);
      setResult({ ok: true, address, token });
    } catch (e) {
      addLog('err', e.message);
      setResult({ ok: false, msg: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHead>Manual Private Key</CardHead>

        <Banner variant="amber" style={{ marginBottom: '1rem', marginTop: 0 }}>
          Development only. Never use a real mainnet private key here. Uses Web3.js locally to derive address and sign — key is never transmitted.
        </Banner>

        <Field label="Private Key (hex, no 0x prefix)">
          <Input
            type="password"
            value={privateKey}
            onChange={e => setPrivateKey(e.target.value)}
            placeholder="af6a7859a3eca64f..."
          />
        </Field>

        <Field label="Derived Ethereum Address">
          <Input
            type="text"
            value={derivedAddr}
            readOnly
            placeholder="Auto-filled on derive or auth..."
            style={{ opacity: 0.65 }}
          />
        </Field>

        <Btn variant="purple" onClick={derive} style={{ marginBottom: '0.5rem' }}>
          Derive Address from Key
        </Btn>

        <Sep />

        <Btn variant="teal" onClick={authenticate} loading={loading}>
          {loading ? 'Signing & Verifying...' : 'Sign & Authenticate'}
        </Btn>
      </Card>

      {result && (
        result.ok ? (
          <Banner variant="teal">
            Authentication successful.
            <TokenBox>
              address: {result.address}{'\n'}
              JWT: {result.token}
            </TokenBox>
          </Banner>
        ) : (
          <Banner variant="coral">{result.msg}</Banner>
        )
      )}
    </div>
  );
}
