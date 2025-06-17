import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar"; // Adjust path based on your folder structure

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  header: {
    backgroundColor: "#4F46E5",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  warning: {
    padding: "10px",
    backgroundColor: "#FDE68A",
    color: "#92400E",
    textAlign: "center",
    margin: "20px 0",
    borderRadius: "6px",
  },
  actionButton: {
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
};

const EntrepreneurDashboard = () => {
  const userId = localStorage.getItem("userId");
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profile, setProfile] = useState({});
  const [warning, setWarning] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        setIsProfileComplete(response.data.isProfileComplete);
        setProfile(response.data.profile || {});
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleAction = () => {
    if (!isProfileComplete) {
      setWarning("Please update your profile before performing any actions.");
    } else {
      setWarning("");
      alert("Action performed successfully!");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <Sidebar showSidebar={showSidebar} onLogout={handleLogout} />

      <div style={styles.content}>
        <header style={styles.header}>
          <h1>Entrepreneur Dashboard</h1>
          <button style={styles.toggleButton} onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
          </button>
        </header>

        {warning && <div style={styles.warning}>{warning}</div>}
        <h2>Welcome to Your Dashboard!</h2>
        <p>Manage your business, proposals, and investor outreach here.</p>
        <button style={styles.actionButton} onClick={handleAction}>
          Perform an Action
        </button>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
