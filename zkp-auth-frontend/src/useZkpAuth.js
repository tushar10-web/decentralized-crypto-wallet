import { useState, useCallback } from 'react';
import Web3 from 'web3';

export function useZkpAuth(baseUrl) {
  const [log, setLog] = useState([{ type: 'dim', msg: '// awaiting operations...' }]);
  const [steps, setSteps] = useState({ 1: '', 2: '', 3: '', 4: '' });
  const [stepVals, setStepVals] = useState({});

  const addLog = useCallback((type, msg) => {
    const ts = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLog(prev => {
      const filtered = prev.filter(l => l.type !== 'dim');
      return [...filtered, { type, msg: `[${ts}] ${msg}` }];
    });
  }, []);

  const setStep = useCallback((num, state, val = null) => {
    setSteps(prev => ({ ...prev, [num]: state }));
    setStepVals(prev => ({ ...prev, [num]: val }));
  }, []);

  const resetSteps = useCallback(() => {
    setSteps({ 1: '', 2: '', 3: '', 4: '' });
    setStepVals({});
  }, []);

  const getChallenge = useCallback(async (address) => {
    const res = await fetch(`${baseUrl}/auth/challenge?address=${encodeURIComponent(address)}`);
    if (!res.ok) throw new Error(`Challenge failed: HTTP ${res.status}`);
    return await res.text();
  }, [baseUrl]);

  const verifySignature = useCallback(async (address, challenge, signature) => {
    const res = await fetch(`${baseUrl}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, message: challenge, signature }),
    });
    const token = await res.text();
    if (['INVALID', 'NO CHALLENGE', 'INVALID MESSAGE'].includes(token)) {
      throw new Error(`Server rejected: ${token}`);
    }
    return token;
  }, [baseUrl]);

  const authWithMetaMask = useCallback(async (address) => {
    resetSteps();

    setStep(1, 'active');
    addLog('inf', `GET ${baseUrl}/auth/challenge?address=${address}`);
    const challenge = await getChallenge(address);
    setStep(1, 'done', `challenge: ${challenge}`);
    addLog('ok', `Challenge received: ${challenge}`);

    setStep(2, 'active');
    addLog('inf', 'Requesting MetaMask signature...');
    const web3 = new Web3(window.ethereum);
    const signature = await web3.eth.personal.sign(challenge, address, '');
    setStep(2, 'done', `sig: ${signature.slice(0, 28)}...`);
    addLog('ok', 'Challenge signed by wallet');

    setStep(3, 'active');
    addLog('inf', `POST ${baseUrl}/auth/verify`);
    const token = await verifySignature(address, challenge, signature);
    setStep(3, 'done', `status: 200`);
    addLog('ok', 'Signature verified by server');

    setStep(4, 'done');
    addLog('ok', `JWT issued: ${token.slice(0, 32)}...`);
    return { address, token };
  }, [baseUrl, addLog, setStep, resetSteps, getChallenge, verifySignature]);

  const authWithPrivateKey = useCallback(async (privateKey) => {
    resetSteps();
    const w3 = new Web3();
    const account = w3.eth.accounts.privateKeyToAccount('0x' + privateKey.replace(/^0x/, ''));
    const address = account.address;

    setStep(1, 'active');
    addLog('inf', `GET ${baseUrl}/auth/challenge?address=${address}`);
    const challenge = await getChallenge(address);
    setStep(1, 'done', `challenge: ${challenge}`);
    addLog('ok', `Challenge: ${challenge}`);

    setStep(2, 'active');
    addLog('inf', 'Signing locally with private key...');
    const signed = w3.eth.accounts.sign(challenge, '0x' + privateKey.replace(/^0x/, ''));
    setStep(2, 'done', `sig: ${signed.signature.slice(0, 28)}...`);
    addLog('ok', 'Signed locally — key never transmitted');

    setStep(3, 'active');
    addLog('inf', `POST ${baseUrl}/auth/verify`);
    const token = await verifySignature(address, challenge, signed.signature);
    setStep(3, 'done', 'status: 200');
    addLog('ok', 'Proof verified by server');

    setStep(4, 'done');
    addLog('ok', `JWT: ${token.slice(0, 32)}...`);
    return { address, token };
  }, [baseUrl, addLog, setStep, resetSteps, getChallenge, verifySignature]);

  const deriveAddress = useCallback((privateKey) => {
    const w3 = new Web3();
    const account = w3.eth.accounts.privateKeyToAccount('0x' + privateKey.replace(/^0x/, ''));
    return account.address;
  }, []);

  const fetchDebugAddress = useCallback(async () => {
    const res = await fetch(`${baseUrl}/debug/address`);
    return await res.text();
  }, [baseUrl]);

  return { log, steps, stepVals, addLog, authWithMetaMask, authWithPrivateKey, deriveAddress, fetchDebugAddress };
}
