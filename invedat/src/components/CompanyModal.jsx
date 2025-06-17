import React, { useEffect, useState } from "react";

const CompanyModal = ({ projectId, onClose }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const fetchCompanyProfile = async () => {
      try {
        // Step 1: Fetch project to get userId
        const projectRes = await fetch(`http://localhost:5000/api/projects/project/${projectId}`);

        if (!projectRes.ok) throw new Error("Project not found");
        const projectData = await projectRes.json();

        // Extract userId from project
        const userId = projectData.project.userId || projectData.project.userId?._id || projectData.project.userId;

        if (!userId) throw new Error("User ID not found in project");

        // Step 2: Fetch profile by userId
        const profileRes = await fetch(`http://localhost:5000/api/profile/${userId}`);

        if (!profileRes.ok) throw new Error("Profile not found");
        const profileData = await profileRes.json();
        console.log("Profile data:", profileData);
        setCompany(profileData.profile);

      } catch (error) {
        console.error("Failed to fetch company profile:", error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, [projectId]);

  const styles = {
    modalBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
      animation: "fadeIn 0.3s ease-out"
    },
    modalBox: {
      background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
      borderRadius: "24px",
      padding: "0",
      maxWidth: "600px",
      width: "100%",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      position: "relative",
      animation: "slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
    },
    modalHeader: {
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      padding: "32px",
      borderRadius: "24px 24px 0 0",
      position: "relative",
      overflow: "hidden"
    },
    headerPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat",
      opacity: 0.3
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "rgba(255, 255, 255, 0.2)",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      transition: "all 0.2s ease",
      backdropFilter: "blur(10px)"
    },
    companyTitle: {
      fontSize: "32px",
      fontWeight: "800",
      color: "white",
      margin: "0",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      position: "relative",
      zIndex: 1
    },
    companySubtitle: {
      fontSize: "16px",
      color: "rgba(255, 255, 255, 0.9)",
      margin: "8px 0 0 0",
      position: "relative",
      zIndex: 1
    },
    modalContent: {
      padding: "32px"
    },
    profileSection: {
      display: "flex",
      alignItems: "flex-start",
      gap: "24px",
      marginBottom: "32px",
      padding: "24px",
      background: "rgba(59, 130, 246, 0.05)",
      borderRadius: "16px",
      border: "1px solid rgba(59, 130, 246, 0.1)"
    },
    profileImage: {
      width: "120px",
      height: "120px",
      objectFit: "cover",
      borderRadius: "20px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      border: "3px solid white"
    },
    profileImagePlaceholder: {
      width: "120px",
      height: "120px",
      borderRadius: "20px",
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "48px",
      fontWeight: "bold",
      color: "white",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)"
    },
    profileInfo: {
      flex: 1
    },
    infoGrid: {
      display: "grid",
      gap: "20px",
      marginBottom: "24px"
    },
    infoCard: {
      background: "rgba(248, 250, 252, 0.8)",
      borderRadius: "16px",
      padding: "20px",
      border: "1px solid rgba(226, 232, 240, 0.8)",
      transition: "all 0.2s ease"
    },
    infoLabel: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: "8px"
    },
    infoValue: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1e293b",
      lineHeight: "1.5"
    },
    linkValue: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#3b82f6",
      textDecoration: "none",
      lineHeight: "1.5",
      transition: "color 0.2s ease"
    },
    linksSection: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginTop: "24px"
    },
    linkCard: {
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      borderRadius: "12px",
      padding: "16px",
      border: "1px solid rgba(226, 232, 240, 0.8)",
      textAlign: "center",
      transition: "all 0.2s ease"
    },
    linkIcon: {
      fontSize: "24px",
      marginBottom: "8px"
    },
    loadingSpinner: {
      width: "40px",
      height: "40px",
      border: "4px solid #e2e8f0",
      borderTop: "4px solid #3b82f6",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "20px auto"
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 40px",
      color: "#64748b"
    },
    loadingText: {
      marginTop: "16px",
      fontSize: "16px",
      fontWeight: "500"
    },
    errorContainer: {
      textAlign: "center",
      padding: "60px 40px",
      color: "#ef4444"
    },
    errorIcon: {
      fontSize: "48px",
      marginBottom: "16px"
    },
    errorText: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px"
    },
    errorSubtext: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "24px"
    },
    actionButton: {
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "12px 24px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
    }
  };

  // Loading state
  if (!projectId || loading) {
    return (
      <div style={styles.modalBackdrop} onClick={onClose}>
        <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <div style={styles.loadingText}>Loading company profile...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!company) {
    return (
      <div style={styles.modalBackdrop} onClick={onClose}>
        <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>🏢</div>
            <div style={styles.errorText}>Company Profile Not Found</div>
            <div style={styles.errorSubtext}>
              We couldn't locate the company profile for this project.
            </div>
            <button 
              style={styles.actionButton}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(59, 130, 246, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = styles.actionButton.boxShadow;
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div style={styles.headerPattern}></div>
          <button 
            style={styles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
              e.target.style.transform = "scale(1)";
            }}
          >
            ×
          </button>
          <h2 style={styles.companyTitle}>{company.organizationName}</h2>
          <p style={styles.companySubtitle}>Company Profile</p>
        </div>

        {/* Content */}
        <div style={styles.modalContent}>
          {/* Profile Section */}
          <div style={styles.profileSection}>
            {company.profilePhoto ? (
              <img
                src={company.profilePhoto}
                alt={`${company.organizationName} Profile`}
                style={styles.profileImage}
              />
            ) : (
              <div style={styles.profileImagePlaceholder}>
                {company.organizationName.charAt(0).toUpperCase()}
              </div>
            )}
            <div style={styles.profileInfo}>
              <div style={styles.infoLabel}>Organization</div>
              <div style={styles.infoValue}>{company.organizationName}</div>
            </div>
          </div>

          {/* Company Details */}
          <div style={styles.infoGrid}>
            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(248, 250, 252, 1)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(248, 250, 252, 0.8)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <div style={styles.infoLabel}>📍 Address</div>
              <div style={styles.infoValue}>{company.address}</div>
            </div>

            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(248, 250, 252, 1)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(248, 250, 252, 0.8)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <div style={styles.infoLabel}>📞 Contact Number</div>
              <div style={styles.infoValue}>{company.contactNumber}</div>
            </div>

            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(248, 250, 252, 1)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(248, 250, 252, 0.8)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <div style={styles.infoLabel}>📋 Registration Number</div>
              <div style={styles.infoValue}>{company.registrationNumber}</div>
            </div>
          </div>

          {/* Links Section */}
          {(company.linkedIn || company.website) && (
            <div style={styles.linksSection}>
              {company.linkedIn && (
                <div 
                  style={styles.linkCard}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <div style={styles.linkIcon}>💼</div>
                  <div style={styles.infoLabel}>LinkedIn</div>
                  <a 
                    href={company.linkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.linkValue}
                    onMouseEnter={(e) => e.target.style.color = "#1d4ed8"}
                    onMouseLeave={(e) => e.target.style.color = "#3b82f6"}
                  >
                    View Profile
                  </a>
                </div>
              )}

              {company.website && (
                <div 
                  style={styles.linkCard}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <div style={styles.linkIcon}>🌐</div>
                  <div style={styles.infoLabel}>Website</div>
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.linkValue}
                    onMouseEnter={(e) => e.target.style.color = "#1d4ed8"}
                    onMouseLeave={(e) => e.target.style.color = "#3b82f6"}
                  >
                    Visit Site
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CompanyModal;