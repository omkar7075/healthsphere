import { useState } from "react";
import axios from "axios";

const VerifyUsers = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerifyUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/verify/${email}/${password}`);
      setVerificationResult(response.data);
    } catch (err) {
      setVerificationResult("Failed to verify user.");
    }
  };

  return (
    <div>
      <h2>Verify User on Blockchain</h2>
      <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleVerifyUser}>Verify User</button>
      {verificationResult && <p>{verificationResult ? "User Verified ✅" : "User Not Found ❌"}</p>}
    </div>
  );
};

export default VerifyUsers;
