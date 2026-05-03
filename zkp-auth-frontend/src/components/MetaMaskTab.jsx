import React, { useState } from 'react';
import { Banner, Btn, Card, CardHead, Field, Input, TokenBox } from './UI';
import ProofSteps from './ProofSteps';

export default function MetaMaskTab({ steps, stepVals, onAuth, addLog }) {
  const [address, setAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const connect = async () => {
    if (!window.ethereum) {
      setResult({ ok: false, msg: 'No Web3 wallet detected. Install MetaMask or use the Manual Keys tab.' });
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
      setConnected(true);
      addLog('ok', 'MetaMask connected: ' + accounts[0]);
    } catch (e) {
      addLog('err', 'MetaMask error: ' + e.message);
      setResult({ ok: false, msg: 'MetaMask error: ' + e.message });
    }
  };

  const authenticate = async () => {
    if (!address) return;
    setLoading(true);
    setResult(null);
    try {
      const { token } = await onAuth(address);
      setResult({ ok: true, token });
    } catch (e) {
      setResult({ ok: false, msg: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHead>MetaMask / Browser Wallet</CardHead>

        <Banner variant="amber" style={{ marginBottom: '1rem', marginTop: 0 }}>
          MetaMask must be installed in your browser. Your private key never leaves the wallet — only the ECDSA signature is sent.
        </Banner>

        <Field label="Ethereum Address">
          <Input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="0xYourWalletAddress"
            readOnly={connected}
            style={{ opacity: connected ? 0.7 : 1 }}
          />
        </Field>

        {!connected ? (
          <Btn variant="teal" onClick={connect}>
            Connect MetaMask
          </Btn>
        ) : (
          <div style={{
            fontSize: 10, color: 'var(--teal-l)', border: '1px solid var(--teal)',
            background: 'var(--teal-bg)', padding: '8px 12px', marginBottom: '0.75rem',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>●</span>
            <span>{address.slice(0, 10)}...{address.slice(-6)} connected</span>
          </div>
        )}

        <Btn
          variant="purple"
          onClick={authenticate}
          disabled={!connected || !address}
          loading={loading}
        >
          {loading ? 'Authenticating...' : 'Request Challenge & Authenticate'}
        </Btn>
      </Card>

      <ProofSteps steps={steps} stepVals={stepVals} />

      {result && (
        result.ok ? (
          <Banner variant="teal">
            Authenticated — identity proven, private key never transmitted.
            {result.token && <TokenBox>JWT: {result.token}</TokenBox>}
          </Banner>
        ) : (
          <Banner variant="coral">{result.msg}</Banner>
        )
      )}
    </div>
  );
}
