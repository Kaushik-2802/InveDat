import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBarInv";
import CompanyModal from "../components/CompanyModal";

const InvestorDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState("All");

  const navigate = useNavigate();
  const domainTypes = ["All", ...new Set(projects.map(project => project.domainType))];

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const projectArray = Array.isArray(data) ? data : data.projects;
        setProjects(projectArray || []);
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);
  
  const filteredProjects = selectedDomain === "All"
    ? projects
    : projects.filter(project => project.domainType === selectedDomain);

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/");
  };

  // Domain badge colors mapping
  const getDomainBadgeStyle = (domain) => {
    const domainColors = {
      "Technology": { bg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", shadow: "rgba(59, 130, 246, 0.3)" },
      "Healthcare": { bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)", shadow: "rgba(16, 185, 129, 0.3)" },
      "Finance": { bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", shadow: "rgba(245, 158, 11, 0.3)" },
      "Education": { bg: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", shadow: "rgba(139, 92, 246, 0.3)" },
      "E-commerce": { bg: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", shadow: "rgba(239, 68, 68, 0.3)" },
      "SaaS": { bg: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", shadow: "rgba(6, 182, 212, 0.3)" },
      "AI/ML": { bg: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", shadow: "rgba(236, 72, 153, 0.3)" },
      "default": { bg: "linear-gradient(135deg, #64748b 0%, #475569 100%)", shadow: "rgba(100, 116, 139, 0.3)" }
    };
    return domainColors[domain] || domainColors.default;
  };

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    mainContent: {
      flexGrow: 1,
      padding: "32px",
      maxWidth: "1400px",
      margin: "0 auto"
    },
    header: {
      marginBottom: "40px",
      textAlign: "center"
    },
    title: {
      fontSize: "42px",
      fontWeight: "800",
      color: "#1e293b",
      marginBottom: "12px",
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    },
    subtitle: {
      fontSize: "18px",
      color: "#64748b",
      fontWeight: "500"
    },
    filterContainer: {
      marginBottom: "32px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px"
    },
    filterLabel: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#334155",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    filterIcon: {
      fontSize: "18px"
    },
    selectWrapper: {
      position: "relative",
      display: "inline-block"
    },
    select: {
      appearance: "none",
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      border: "2px solid rgba(59, 130, 246, 0.2)",
      borderRadius: "16px",
      padding: "14px 48px 14px 20px",
      fontSize: "15px",
      fontWeight: "500",
      color: "#334155",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      minWidth: "200px"
    },
    selectHover: {
      borderColor: "#3b82f6",
      boxShadow: "0 12px 40px rgba(59, 130, 246, 0.15)",
      transform: "translateY(-2px)"
    },
    selectArrow: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      fontSize: "14px",
      color: "#3b82f6",
      fontWeight: "600"
    },
    statsCard: {
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "24px",
      marginBottom: "32px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    },
    statItem: {
      textAlign: "center"
    },
    statNumber: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#3b82f6",
      marginBottom: "4px"
    },
    statLabel: {
      fontSize: "14px",
      color: "#64748b",
      fontWeight: "500"
    },
    projectsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      gap: "24px",
      marginTop: "24px"
    },
    projectCard: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "24px",
      padding: "28px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    projectCardHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      borderColor: "#3b82f6"
    },
    projectHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "16px"
    },
    projectIcon: {
      width: "56px",
      height: "56px",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "24px",
      fontWeight: "bold"
    },
    statusBadge: {
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
    },
    domainBadge: {
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
      color: "white",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "16px",
      border: "1px solid rgba(255, 255, 255, 0.2)"
    },
    projectTitle: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "12px",
      lineHeight: "1.4"
    },
    projectDescription: {
      fontSize: "15px",
      color: "#64748b",
      lineHeight: "1.6",
      marginBottom: "20px",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    },
    companyInfo: {
      display: "flex",
      alignItems: "center",
      marginBottom: "24px",
      padding: "12px 16px",
      background: "rgba(59, 130, 246, 0.08)",
      borderRadius: "12px",
      border: "1px solid rgba(59, 130, 246, 0.2)"
    },
    companyIcon: {
      width: "20px",
      height: "20px",
      marginRight: "10px",
      color: "#3b82f6"
    },
    companyName: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#1e293b"
    },
    metricsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginBottom: "24px"
    },
    metricCard: {
      textAlign: "center",
      padding: "16px",
      background: "rgba(248, 250, 252, 0.8)",
      borderRadius: "12px",
      border: "1px solid rgba(226, 232, 240, 0.5)"
    },
    metricValue: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "4px"
    },
    metricLabel: {
      fontSize: "12px",
      color: "#64748b",
      fontWeight: "500"
    },
    viewButton: {
      width: "100%",
      padding: "16px 24px",
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)",
      position: "relative",
      overflow: "hidden"
    },
    viewButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 12px 32px rgba(59, 130, 246, 0.4)"
    },
    emptyState: {
      textAlign: "center",
      padding: "80px 20px",
      color: "#64748b"
    },
    emptyIcon: {
      fontSize: "64px",
      marginBottom: "20px",
      opacity: 0.5
    },
    emptyTitle: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#1e293b"
    },
    emptyText: {
      fontSize: "16px",
      color: "#64748b"
    },
    cardAccent: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.3s ease"
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar showSidebar={showSidebar} onLogout={handleLogout} />
      
      <div style={styles.mainContent}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>Investment Opportunities</h1>
          <p style={styles.subtitle}>
            Discover promising startups and growth companies
          </p>
        </div>

        {/* Enhanced Filter Section */}
        <div style={styles.filterContainer}>
          <div style={styles.filterLabel}>
            <span style={styles.filterIcon}>🔍</span>
            Filter by Domain:
          </div>
          <div style={styles.selectWrapper}>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              style={styles.select}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.selectHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.2)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {domainTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div style={styles.selectArrow}>▼</div>
          </div>
        </div>

        {/* Stats Card */}
        <div style={styles.statsCard}>
          <div style={styles.statItem}>
            <div style={{...styles.statNumber, color: "#3b82f6"}}>
              {projects.length}
            </div>
            <div style={styles.statLabel}>Active Projects</div>
          </div>
          <div style={{width: "1px", height: "40px", background: "#e2e8f0"}}></div>
          <div style={styles.statItem}>
            <div style={{...styles.statNumber, color: "#10b981"}}>24</div>
            <div style={styles.statLabel}>This Month</div>
          </div>
          <div style={{width: "1px", height: "40px", background: "#e2e8f0"}}></div>
          <div style={styles.statItem}>
            <div style={{...styles.statNumber, color: "#8b5cf6"}}>$50M</div>
            <div style={styles.statLabel}>Total Raised</div>
          </div>
        </div>

        {/* Projects Section */}
        {projects.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏢</div>
            <h3 style={styles.emptyTitle}>No Projects Available</h3>
            <p style={styles.emptyText}>
              Check back later for new investment opportunities.
            </p>
          </div>
        ) : (
          <div style={styles.projectsGrid}>
            {filteredProjects.map((project) => {
              const domainStyle = getDomainBadgeStyle(project.domainType);
              return (
                <div
                  key={project._id}
                  style={styles.projectCard}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.projectCardHover);
                    e.currentTarget.querySelector('.card-accent').style.transform = 'scaleX(1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = styles.projectCard.boxShadow;
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.querySelector('.card-accent').style.transform = 'scaleX(0)';
                  }}
                >
                  {/* Project Header */}
                  <div style={styles.projectHeader}>
                    <div style={styles.projectIcon}>
                      {project.title.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.statusBadge}>Active</div>
                  </div>
                  
                  {/* Domain Badge */}
                  <div 
                    style={{
                      ...styles.domainBadge,
                      background: domainStyle.bg,
                      boxShadow: `0 4px 12px ${domainStyle.shadow}`
                    }}
                  >
                    <span>🏷️</span>
                    {project.domainType || "General"}
                  </div>
                  
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  <p style={styles.projectDescription}>{project.description}</p>

                  {/* Company Info */}
                  <div style={styles.companyInfo}>
                    <span style={styles.companyIcon}>🏢</span>
                    <span style={styles.companyName}>
                      {project.organizationName || "Stealth Mode"}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div style={styles.metricsGrid}>
                    <div style={styles.metricCard}>
                      <div style={{...styles.metricValue, color: "#10b981"}}>
                        $2.5M
                      </div>
                      <div style={styles.metricLabel}>Seeking</div>
                    </div>
                    <div style={styles.metricCard}>
                      <div style={{...styles.metricValue, color: "#3b82f6"}}>
                        Series A
                      </div>
                      <div style={styles.metricLabel}>Stage</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedProjectId(project._id)}
                    style={styles.viewButton}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.viewButtonHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = styles.viewButton.boxShadow;
                    }}
                  >
                    👁️ View Company Profile
                  </button>

                  {/* Hover Accent */}
                  <div 
                    className="card-accent"
                    style={styles.cardAccent}
                  ></div>
                </div>
              );
            })}
          </div>
        )}

        {selectedProjectId && (
          <CompanyModal
            projectId={selectedProjectId}
            onClose={() => setSelectedProjectId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;