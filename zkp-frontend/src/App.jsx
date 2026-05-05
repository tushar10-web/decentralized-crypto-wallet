import { useState } from "react";
import axios from "axios";

export default function App() {

  const [address, setAddress] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [challenge, setChallenge] = useState("");
  const [signature, setSignature] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("Idle");
const createWallet = async () => {

  try {

    setStatus("Creating Wallet...");

    const res = await axios.get(
      "http://localhost:8080/wallet/create"
    );

    setWalletData(res.data);

    setAddress(res.data.address);

    setChallenge("");
    setSignature("");
    setResult("");

    setStatus("Wallet Created");

  } catch (err) {

    console.error(err);

    setStatus("Wallet Creation Error");
  }
};
  // Generate Challenge
  const generateChallenge = async () => {

    try {

      setStatus("Generating Challenge...");

      const res = await axios.get(
        `http://localhost:8080/auth/challenge?address=${address}`
      );

      setChallenge(res.data);

      setSignature("");
      setResult("");

      setStatus("Challenge Generated");

    } catch (err) {

      console.error(err);

      setStatus("Challenge Error");
    }
  };

  // Generate Signature
  const generateSignature = async () => {

    try {

      setStatus("Generating Signature...");

      const res = await axios.get(
        `http://localhost:8080/auth/sign?address=${address}&message=${challenge}`
      );

      setSignature(res.data);

      setResult("");

      setStatus("Signature Generated");

    } catch (err) {

      console.error(err);

      setStatus("Signature Error");
    }
  };

  // Verify Signature
  const verifySignature = async () => {

    try {

      setStatus("Verifying Signature...");

      const res = await axios.post(
        "http://localhost:8080/auth/verify",
        {
          address: address,
          message: challenge,
          signature: signature,
        }
      );

      setResult(res.data);

      setStatus("Verification Completed");

    } catch (err) {

      console.error(err);

      setStatus("Verification Error");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1>Blockchain Authentication System</h1>

        <p style={styles.subtitle}>
          Ethereum Challenge-Response Verification using ECDSA
        </p>
        <button
  style={styles.button}
  onClick={createWallet}
>
  Create Wallet
</button>
{walletData && (
  <div style={styles.box}>

    <h3>Generated Wallet</h3>

    <p><strong>Address:</strong></p>

    <p style={styles.code}>
      {walletData.address}
    </p>

  </div>
)}

        {/* Wallet Address */}
        <div style={styles.box}>

          <h3>Wallet Address</h3>

          <input
            style={styles.input}
            placeholder="Enter Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

        </div>

        {/* Challenge Button */}
        {address && (
          <button
            style={styles.button}
            onClick={generateChallenge}
          >
            Generate Challenge
          </button>
        )}

        {/* Challenge */}
        {challenge && (
          <div style={styles.box}>

            <h3>Generated Challenge</h3>

            <p style={styles.code}>
              {challenge}
            </p>

          </div>
        )}

        {/* Signature Button */}
        {challenge && (
          <button
            style={styles.button}
            onClick={generateSignature}
          >
            Generate Signature
          </button>
        )}

        {/* Signature */}
        {signature && (
          <div style={styles.box}>

            <h3>Generated Signature</h3>

            <p style={styles.code}>
              {signature}
            </p>

          </div>
        )}

        {/* Verify Button */}
        {signature && (
          <button
            style={styles.button}
            onClick={verifySignature}
          >
            Verify Signature
          </button>
        )}

        {/* Result */}
        {result && (
          <div style={styles.result}>

            <h2>{result}</h2>

          </div>
        )}

        {/* Status */}
        <p style={styles.status}>
          Status: {status}
        </p>

      </div>
    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    fontFamily: "Arial",
  },

  card: {
    width: "850px",
    background: "#111827",
    padding: "40px",
    borderRadius: "16px",
    color: "white",
    boxShadow: "0 0 30px rgba(0,0,0,0.5)",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "10px",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
    fontSize: "14px",
    marginTop: "10px",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  box: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
  },

  code: {
    marginTop: "10px",
    wordBreak: "break-all",
    fontFamily: "monospace",
    color: "#38bdf8",
  },

  result: {
    marginTop: "30px",
    background: "#022c22",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#4ade80",
  },

  status: {
    marginTop: "20px",
    color: "#94a3b8",
  },
};