
import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  sidebar: {
    width: "220px",
    backgroundColor: "#1F2937",
    color: "white",
    padding: "20px",
    transition: "all 0.3s ease",
  },
  sidebarHidden: {
    width: "0",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  sidebarItem: {
    margin: "15px 0",
    cursor: "pointer",
    color: "#D1D5DB",
    textDecoration: "none",
  },
};

const Sidebar = ({ showSidebar, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div style={showSidebar ? styles.sidebar : styles.sidebarHidden}>
      <div style={styles.sidebarItem}><h2>InveDat</h2></div>
      <div style={styles.sidebarItem} onClick={()=> navigate("/investor-dashboard")}>
        📊 Dashboard
      </div>
      <div style={styles.sidebarItem} onClick={()=> navigate("/investment-tracking")}>
         📈 Track Your Investments
      </div>
      <div style={styles.sidebarItem} onClick={() => navigate("/investor-profile")}>
        👤 Profile
      </div>
      <div style={styles.sidebarItem} onClick={onLogout}>
        🚪 Logout
      </div>
    </div>
  );
};

export default Sidebar;
