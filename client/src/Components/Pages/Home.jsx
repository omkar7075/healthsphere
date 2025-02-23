import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import "../CSS/Home.css";

const Home = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Fetch balance
        const balanceWei = await web3.eth.getBalance(accounts[0]);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        setBalance(balanceEth);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
      setLoading(false);
    } else {
      alert("MetaMask is not installed. Please install MetaMask!");
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to HealthSphere</h1>
        <p>Your comprehensive healthcare solution powered by Blockchain</p>

        {/* Display Wallet Info */}
        {account ? (
          <div className="wallet-info">
            <p><strong>Connected Wallet:</strong> {account}</p>
            <p><strong>Balance:</strong> {balance} ETH</p>
          </div>
        ) : (
          <button onClick={connectWallet} className="connect-button">
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </header>

      {/* Portal Links */}
      <div className="home-cards">
        <div className="card">
          <h2>Patient Portal</h2>
          <p>Access your health records, book appointments, and consult doctors.</p>
          <Link to="/patient-dashboard" className="card-button">
            Patient Dashboard
          </Link>
        </div>
        <div className="card">
          <h2>Doctor Portal</h2>
          <p>Manage your appointments, view patient details, and more.</p>
          <Link to="/doctor-dashboard" className="card-button">
            Doctor Dashboard
          </Link>
        </div>
        <div className="card">
          <h2>Admin Panel</h2>
          <p>Manage users, oversee system operations, and maintain security.</p>
          <Link to="/admin-dashboard" className="card-button">
            Admin Dashboard
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} HealthSphere. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
