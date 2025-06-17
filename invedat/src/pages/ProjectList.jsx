import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate=useNavigate()

  // For editing modal
  const [editingProject, setEditingProject] = useState(null); // project object or null
  const [editForm, setEditForm] = useState({
    title: "",
    domainType:"",
    description: "",
    videoURL: "",
    presentationFile: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID not found in localStorage");
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://invedat.onrender.com/api/projects/${userId}`);

        if (!response.ok) {
          throw new Error(`Error fetching projects: ${response.statusText}`);
        }
        const data = await response.json();
        setProjects(Array.isArray(data.projects) ? data.projects : []);
      } catch (err) {
        setError(err.message || "Unknown error");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openEditModal = (project) => {
    setEditingProject(project);
    setEditForm({
      title: project.title || "",
      domainType:project.domainType || "",
      description: project.description || "",
      videoURL: project.videoURL || "",
      presentationFile: project.presentationFile || "",
    });
  };

  const closeEditModal = () => {
    setEditingProject(null);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const response = await fetch(`https://invedat.onrender.com/api/projects/${editingProject._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const updatedProject = await response.json();

      // Update projects state with updated project
      setProjects((prevProjects) =>
        prevProjects.map((p) => (p._id === updatedProject._id ? updatedProject : p))
      );

      closeEditModal();
    } catch (err) {
      alert(err.message || "Error updating project");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    // add navigate if you are using react-router-dom's useNavigate()
     navigate("/");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <Sidebar showSidebar={showSidebar} onLogout={handleLogout} />
        <div style={{ 
          flex: 1, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          fontSize: "18px",
          color: "#64748b"
        }}>
          Loading projects...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <Sidebar showSidebar={showSidebar} onLogout={handleLogout} />
        <div style={{ 
          flex: 1, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          fontSize: "18px",
          color: "#ef4444"
        }}>
          Error: {error}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <Sidebar showSidebar={showSidebar} onLogout={handleLogout} />
        <div style={{ 
          flex: 1, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          fontSize: "18px",
          color: "#64748b"
        }}>
          No projects found for this user.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      <Sidebar showSidebar={showSidebar} onLogout={handleLogout} />
      <div style={{ flex: 1, padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "700", 
            color: "#1e293b",
            margin: "0 0 0.5rem 0"
          }}>
            Your Projects
          </h1>
          <p style={{ 
            color: "#64748b", 
            fontSize: "1.1rem",
            margin: "0"
          }}>
            Manage and view all your projects in one place
          </p>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "100%"
        }}>
          {projects.map((project) => (
            <div
              key={project._id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                overflow: "hidden",
                transition: "all 0.3s ease",
                border: "1px solid #e2e8f0",
                cursor: "pointer",
                transform: "translateY(0)",
                width: "100%",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
              }}
            >
              {/* Card Header */}
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "1.5rem",
                color: "white"
              }}>
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  margin: "0 0 0.5rem 0",
                  lineHeight: "1.4"
                }}>
                  {project.title}
                </h3>
                <div style={{
                  fontSize: "0.875rem",
                  opacity: "0.9",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <span>📅</span>
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "1.5rem" }}>
                <p style={{
                  color: "#475569",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  margin: "0 0 1.5rem 0",
                  minHeight: "3rem",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {project.description}
                </p>

                {/* Links Section */}
                <div style={{ marginBottom: "1.5rem" }}>
                  {project.videoURL && (
                    <div style={{ marginBottom: "0.75rem" }}>
                      <a
                        href={project.videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "#3b82f6",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          padding: "0.5rem 0.75rem",
                          backgroundColor: "#eff6ff",
                          borderRadius: "6px",
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#dbeafe";
                          e.currentTarget.style.transform = "translateX(2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#eff6ff";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        🎥 Watch Video
                      </a>
                    </div>
                  )}
                  {project.presentationFile && (
                    <div>
                      <a
                        href={project.presentationFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "#059669",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          padding: "0.5rem 0.75rem",
                          backgroundColor: "#ecfdf5",
                          borderRadius: "6px",
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#d1fae5";
                          e.currentTarget.style.transform = "translateX(2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#ecfdf5";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        📄 View Presentation
                      </a>
                    </div>
                  )}
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(project)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "#6366f1",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#4f46e5";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#6366f1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  ✏️ Edit Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingProject && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              backdropFilter: "blur(4px)"
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "16px",
                width: "500px",
                maxWidth: "90vw",
                maxHeight: "90vh",
                overflow: "auto",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: "1px solid #e2e8f0"
              }}
            >
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#1e293b",
                margin: "0 0 1.5rem 0",
                textAlign: "center"
              }}>
                Edit Project
              </h3>
              <form onSubmit={handleEditSubmit}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "border-color 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Domain Type
                  </label>
                  <input
                    type="text"
                    name="domainType"
                    value={editForm.domainType}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "border-color 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      resize: "vertical",
                      transition: "border-color 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Video URL
                  </label>
                  <input
                    type="url"
                    name="videoURL"
                    value={editForm.videoURL}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "border-color 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{
                    display: "block",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem"
                  }}>
                    Presentation File URL
                  </label>
                  <input
                    type="url"
                    name="presentationFile"
                    value={editForm.presentationFile}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "border-color 0.2s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button
                    type="button"
                    onClick={closeEditModal}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "#f1f5f9",
                      color: "#64748b",
                      border: "2px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e2e8f0";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "#6366f1",
                      color: "white",
                      border: "2px solid #6366f1",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#4f46e5";
                      e.currentTarget.style.borderColor = "#4f46e5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#6366f1";
                      e.currentTarget.style.borderColor = "#6366f1";
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;