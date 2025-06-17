import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";

const NewProjectForm = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [presentationFile, setPresentationFile] = useState(null);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [domainType, setDomainType] = useState("");


  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPresentationFile(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User not logged in. Please login first.");
      return;
    }

    const wordCount = description.trim().split(/\s+/).length;
    if (wordCount > 200) {
      setMessage("Description should be up to 200 words");
      return;
    }

    const payload = {
      userId,
      title,
      domainType,
      description,
      videoURL,
      presentationFile,
    };

    console.log("Payload to send:", payload);

    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response from server:", data);

      if (res.ok) {
        setMessage("Project created successfully!");
        setTitle("");
        setDescription("");
        setVideoURL("");
        setPresentationFile(null);
      } else {
        setMessage(data.message || "Failed to create project");
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  const wordCount = description.trim() === "" ? 0 : description.trim().split(/\s+/).length;


  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      backgroundColor: "#f1f5f9",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <Sidebar showSidebar={showSidebar} onLogout={handleLogout} />
      
      <div style={{
        flex: 1,
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "3rem"
      }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "650px",
          border: "1px solid #e2e8f0"
        }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "0.5rem",
            textAlign: "center"
          }}>
            Create New Project
          </h2>
          
          <p style={{
            color: "#64748b",
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "1rem"
          }}>
            Share your work with the community
          </p>

          {message && (
            <div style={{
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              backgroundColor: message.includes("successfully") ? "#dcfce7" : "#fef2f2",
              border: `1px solid ${message.includes("successfully") ? "#bbf7d0" : "#fecaca"}`,
              color: message.includes("successfully") ? "#166534" : "#dc2626",
              fontSize: "0.9rem",
              fontWeight: "500"
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{
                display: "block",
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem"
              }}>
                Project Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                  outline: "none",
                  backgroundColor: "#fafafa"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.backgroundColor = "white";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.backgroundColor = "#fafafa";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your project title"
              />
            </div>
            <div>
  <label style={{
    display: "block",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.5rem"
  }}>
    Domain Type *
  </label>
  <input
    type="text"
    value={domainType}
    onChange={(e) => setDomainType(e.target.value)}
    required
    placeholder="Enter project domain (e.g., Healthcare, Finance, Education)"
    style={{
      width: "100%",
      padding: "0.75rem",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "all 0.2s ease",
      outline: "none",
      backgroundColor: "#fafafa"
    }}
    onFocus={(e) => {
      e.target.style.borderColor = "#3b82f6";
      e.target.style.backgroundColor = "white";
      e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "#e5e7eb";
      e.target.style.backgroundColor = "#fafafa";
      e.target.style.boxShadow = "none";
    }}
  />
</div>


            <div>
  <label style={{
    display: "block",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.5rem"
  }}>
    Description *
    <span style={{
      fontSize: "0.8rem",
      fontWeight: "400",
      color: wordCount > 200 ? "#dc2626" : "#6b7280",
      marginLeft: "0.5rem"
    }}>
      ({wordCount}/200 words)
    </span>
  </label>
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={6}
    required
    style={{
      width: "100%",
      padding: "0.75rem",
      border: `2px solid ${wordCount > 200 ? "#dc2626" : "#e5e7eb"}`,
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "all 0.2s ease",
      outline: "none",
      backgroundColor: "#fafafa",
      resize: "vertical",
      minHeight: "120px",
      boxShadow: "none"
    }}
    onFocus={(e) => {
      if (wordCount <= 200) {
        e.target.style.borderColor = "#3b82f6";
        e.target.style.backgroundColor = "white";
        e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
      } else {
        // Keep red border if word count exceeded
        e.target.style.borderColor = "#dc2626";
        e.target.style.backgroundColor = "#fafafa";
        e.target.style.boxShadow = "none";
      }
    }}
    onBlur={(e) => {
      e.target.style.borderColor = wordCount > 200 ? "#dc2626" : "#e5e7eb";
      e.target.style.backgroundColor = "#fafafa";
      e.target.style.boxShadow = "none";
    }}
    placeholder="Describe your project, its goals, and key features..."
  />
</div>


            <div>
              <label style={{
                display: "block",
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem"
              }}>
                Video URL
                <span style={{
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  color: "#6b7280",
                  marginLeft: "0.5rem"
                }}>
                  (YouTube or Vimeo)
                </span>
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={videoURL}
                onChange={(e) => setVideoURL(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                  outline: "none",
                  backgroundColor: "#fafafa"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.backgroundColor = "white";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.backgroundColor = "#fafafa";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem"
              }}>
                Presentation File
                <span style={{
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  color: "#6b7280",
                  marginLeft: "0.5rem"
                }}>
                  (Optional - PDF, PPT, PPTX)
                </span>
              </label>
              <div style={{
                position: "relative",
                border: "2px dashed #d1d5db",
                borderRadius: "8px",
                padding: "1.5rem",
                textAlign: "center",
                backgroundColor: "#f9fafb",
                transition: "all 0.2s ease"
              }}>
                <input 
                  type="file" 
                  accept=".pdf,.ppt,.pptx" 
                  onChange={handleFileChange}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer"
                  }}
                />
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9rem" }}>
                    {presentationFile ? "File selected" : "Click to upload or drag and drop"}
                  </p>
                  <p style={{ margin: 0, color: "#9ca3af", fontSize: "0.75rem" }}>
                    PDF, PPT, PPTX up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "0.875rem 2rem",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginTop: "1rem",
                boxShadow: "0 4px 6px rgba(59, 130, 246, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2563eb";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 6px 12px rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#3b82f6";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(59, 130, 246, 0.2)";
              }}
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProjectForm;