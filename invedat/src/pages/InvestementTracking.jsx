import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBarInv";
import axios from "axios";

const InvestmentTracking = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://invedat.onrender.com/api/projects");
        setProjects(response.data.projects || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const openGoogleMeet = () => {
    window.open("https://meet.google.com/new", "_blank");
  };

  const scheduleMeeting = (project) => {
    const title = encodeURIComponent(`Investment Discussion: ${project.title}`);
    const details = encodeURIComponent(project.description);
    const location = encodeURIComponent("https://meet.google.com/new");
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 mins later

    const formatDate = (date) =>
      date.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const calendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${formatDate(startDate)}/${formatDate(endDate)}`;

    window.open(calendarURL, "_blank");
  };

  const LoadingSpinner = () => (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Loading projects...</p>
    </div>
  );

  const EmptyState = () => (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>📊</div>
      <h3 style={styles.emptyTitle}>No Projects Found</h3>
      <p style={styles.emptyText}>There are currently no entrepreneur projects available for investment.</p>
    </div>
  );

  const ErrorState = () => (
    <div style={styles.errorState}>
      <div style={styles.errorIcon}>⚠️</div>
      <h3 style={styles.errorTitle}>Error Loading Projects</h3>
      <p style={styles.errorText}>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        style={styles.retryButton}
      >
        Try Again
      </button>
    </div>
  );

  const styles = {
    mainLayout: {
      display: "flex",
      minHeight: "100vh",
      background: "#f8fafc"
    },
    contentArea: {
      flex: 1,
      transition: "margin-left 0.3s ease",
      overflow: "hidden"
    },
    container: {
      padding: "24px 32px",
      maxWidth: "1400px",
      margin: "0 auto",
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },
    header: {
      marginBottom: "32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "20px"
    },
    headerContent: {
      flex: 1,
      minWidth: "300px"
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1e293b",
      marginBottom: "8px",
      margin: 0,
      lineHeight: "1.2"
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#64748b",
      margin: 0,
      fontWeight: "400"
    },
    statsCard: {
      background: "white",
      borderRadius: "12px",
      padding: "20px 24px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e2e8f0",
      textAlign: "center",
      minWidth: "120px"
    },
    statsLabel: {
      fontSize: "0.875rem",
      color: "#64748b",
      margin: 0,
      fontWeight: "500"
    },
    statsValue: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#3b82f6",
      margin: "4px 0 0 0"
    },
    projectsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "24px",
      alignItems: "stretch"
    },
    projectCard: {
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      border: "1px solid #e2e8f0",
      overflow: "hidden",
      transition: "all 0.3s ease",
      height: "fit-content"
    },
    cardHeader: {
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      height: "4px"
    },
    cardContent: {
      padding: "24px"
    },
    projectTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "12px",
      margin: 0,
      transition: "color 0.3s ease"
    },
    domainTag: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: "500",
      background: "#dbeafe",
      color: "#1e40af",
      marginBottom: "16px"
    },
    tagIcon: {
      marginRight: "6px",
      fontSize: "0.875rem"
    },
    description: {
      color: "#475569",
      fontSize: "0.9rem",
      lineHeight: "1.6",
      marginBottom: "20px",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    },
    videoLink: {
      display: "inline-flex",
      alignItems: "center",
      color: "#3b82f6",
      textDecoration: "none",
      fontSize: "0.875rem",
      fontWeight: "500",
      marginBottom: "20px",
      transition: "color 0.3s ease"
    },
    videoIcon: {
      marginRight: "8px",
      fontSize: "1rem"
    },
    cardActions: {
      display: "flex",
      gap: "12px"
    },
    button: {
      flex: 1,
      padding: "12px 16px",
      borderRadius: "10px",
      border: "none",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    },
    meetButton: {
      background: "#10b981",
      color: "white"
    },
    scheduleButton: {
      background: "#3b82f6",
      color: "white"
    },
    buttonIcon: {
      fontSize: "1rem"
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 0"
    },
    spinner: {
      width: "40px",
      height: "40px",
      border: "3px solid #e2e8f0",
      borderTop: "3px solid #3b82f6",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "12px"
    },
    loadingText: {
      color: "#64748b",
      fontSize: "0.9rem"
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 24px",
      background: "white",
      borderRadius: "12px",
      border: "2px dashed #d1d5db"
    },
    emptyIcon: {
      fontSize: "3rem",
      marginBottom: "16px"
    },
    emptyTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "8px"
    },
    emptyText: {
      color: "#64748b",
      margin: 0
    },
    errorState: {
      textAlign: "center",
      padding: "60px 24px",
      background: "#fef2f2",
      borderRadius: "12px",
      border: "1px solid #fecaca"
    },
    errorIcon: {
      fontSize: "3rem",
      marginBottom: "16px"
    },
    errorTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#dc2626",
      marginBottom: "8px"
    },
    errorText: {
      color: "#b91c1c",
      marginBottom: "16px"
    },
    retryButton: {
      background: "#dc2626",
      color: "white",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "500",
      transition: "background-color 0.2s ease"
    }
  };

  return (
    <div style={styles.mainLayout}>
      <SideBar showSidebar={showSidebar} onLogout={handleLogout} />
      <div style={styles.contentArea}>
        <div style={styles.container}>
          {/* Header Section */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <h1 style={styles.title}>
                Investment Opportunities
              </h1>
              <p style={styles.subtitle}>
                Discover and connect with innovative entrepreneur projects
              </p>
            </div>
            <div style={styles.statsCard}>
              <p style={styles.statsLabel}>Total Projects</p>
              <div style={styles.statsValue}>{projects.length}</div>
            </div>
          </div>

          {/* Content Section */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorState />
          ) : projects.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={styles.projectsGrid}>
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  style={{
                    ...styles.projectCard,
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.12)";
                    const title = e.currentTarget.querySelector('.project-title');
                    if (title) title.style.color = "#3b82f6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                    const title = e.currentTarget.querySelector('.project-title');
                    if (title) title.style.color = "#1e293b";
                  }}
                >
                  {/* Card Header */}
                  <div style={styles.cardHeader}></div>
                  
                  {/* Card Content */}
                  <div style={styles.cardContent}>
                    {/* Title and Domain */}
                    <div>
                      <h3 className="project-title" style={styles.projectTitle}>
                        {project.title}
                      </h3>
                      <div style={styles.domainTag}>
                        <span style={styles.tagIcon}>🏷️</span>
                        {project.domainType}
                      </div>
                    </div>

                    {/* Description */}
                    <p style={styles.description}>
                      {project.description}
                    </p>

                    {/* Video Link */}
                    {project.videoURL && (
                      <a
                        href={project.videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.videoLink}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#1e40af";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#3b82f6";
                        }}
                      >
                        <span style={styles.videoIcon}>🎥</span>
                        Watch Pitch Video
                        <span style={{marginLeft: '4px'}}>↗</span>
                      </a>
                    )}

                    {/* Card Actions */}
                    <div style={styles.cardActions}>
                      <button
                        onClick={openGoogleMeet}
                        style={{...styles.button, ...styles.meetButton}}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#059669";
                          e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#10b981";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        <span style={styles.buttonIcon}>📞</span>
                        Quick Meet
                      </button>
                      <button
                        onClick={() => scheduleMeeting(project)}
                        style={{...styles.button, ...styles.scheduleButton}}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#2563eb";
                          e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#3b82f6";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        <span style={styles.buttonIcon}>📅</span>
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .content-area {
            margin-left: 0 !important;
          }
          
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          
          .header {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InvestmentTracking;