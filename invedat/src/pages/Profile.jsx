import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SideBar";
import { Camera, Edit3, Save, X, User, Building, MapPin, Phone, Hash, Linkedin, Globe } from "lucide-react";

const Profile = () => {
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState({
    organizationName: "",
    address: "",
    contactNumber: "",
    registrationNumber: "",
    linkedIn: "",
    website: "",
    profilePhoto: "",
  });

  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/profile/${userId}`)
      .then((res) => {
        if (res.data.isProfileComplete) {
          setProfile(res.data.profile);
          setProfileExists(true);
          setIsEditing(false);
        } else {
          setProfileExists(false);
          setIsEditing(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        alert("Failed to fetch profile");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  // Handle text input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle photo file input change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission ONLY on Save
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare payload with base64 profilePhoto string
      const payload = {
        userId,
        ...profile,
      };

      let response;
      if (profileExists) {
        response = await axios.put(
          `http://localhost:5000/api/profile/${userId}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/profile",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        setProfileExists(true);
      }

      alert(response.data.message || "Profile saved!");
      setIsEditing(false);
    } catch (error) {
      alert(
        "Failed to save profile: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  if (loading) return <p>Loading...</p>;
  if (!userId) return <p>Please log in to view your profile.</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Sidebar showSidebar={true} onLogout={handleLogout} />
      
      <div style={{ flex: 1, padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section with Profile Photo */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "24px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          padding: "32px",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Background decorations */}
          <div style={{
            position: "absolute",
            top: "-64px",
            right: "-64px",
            width: "128px",
            height: "128px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "50%",
            opacity: 0.1
          }}></div>
          
          <div style={{ display: "flex", alignItems: "flex-start", gap: "32px", position: "relative", zIndex: 1 }}>
            {/* Profile Photo Section - Top Left */}
            <div style={{ position: "relative", group: true }}>
              <div style={{ position: "relative" }}>
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt="Profile"
                    style={{
                      width: "128px",
                      height: "128px",
                      borderRadius: "16px",
                      objectFit: "cover",
                      border: "4px solid white",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                  />
                ) : (
                  <div style={{
                    width: "128px",
                    height: "128px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
                    border: "4px solid white",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <User style={{ width: "48px", height: "48px", color: "#6366f1" }} />
                  </div>
                )}
                
                {isEditing && (
                  <label style={{
                    position: "absolute",
                    inset: "0",
                    borderRadius: "16px",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    opacity: 0,
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = 1}
                  onMouseLeave={(e) => e.target.style.opacity = 0}>
                    <Camera style={{ width: "32px", height: "32px", color: "white" }} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{ display: "none" }}
                    />
                  </label>
                )}
              </div>
              
              {isEditing && (
                <div style={{
                  position: "absolute",
                  bottom: "-8px",
                  right: "-8px",
                  backgroundColor: "#6366f1",
                  borderRadius: "50%",
                  padding: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}>
                  <Camera style={{ width: "16px", height: "16px", color: "white" }} />
                </div>
              )}
            </div>
            
            {/* Profile Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h1 style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0
                }}>
                  {profile.organizationName || "Your Organization"}
                </h1>
                
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      color: "white",
                      borderRadius: "12px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <Edit3 style={{ width: "16px", height: "16px" }} />
                    Edit Profile
                  </button>
                )}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", color: "#6b7280" }}>
                {profile.address && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <MapPin style={{ width: "16px", height: "16px", color: "#6366f1" }} />
                    <span>{profile.address}</span>
                  </div>
                )}
                {profile.contactNumber && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Phone style={{ width: "16px", height: "16px", color: "#6366f1" }} />
                    <span>{profile.contactNumber}</span>
                  </div>
                )}
                {profile.website && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Globe style={{ width: "16px", height: "16px", color: "#6366f1" }} />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" style={{ color: "#6366f1", textDecoration: "none" }}>
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "24px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          padding: "32px"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <User style={{ width: "16px", height: "16px", color: "white" }} />
            </div>
            Profile Details
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "32px" }}>
              {[
                { label: "Organization Name", name: "organizationName", icon: Building, type: "text" },
                { label: "Address", name: "address", icon: MapPin, type: "text" },
                { label: "Contact Number", name: "contactNumber", icon: Phone, type: "tel" },
                { label: "Registration Number", name: "registrationNumber", icon: Hash, type: "text" },
                { label: "LinkedIn URL", name: "linkedIn", icon: Linkedin, type: "url" },
                { label: "Website URL", name: "website", icon: Globe, type: "url" },
              ].map(({ label, name, icon: Icon, type }) => (
                <div key={name} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151"
                  }}>
                    <Icon style={{ width: "16px", height: "16px", color: "#6366f1" }} />
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: isEditing ? "2px solid #e5e7eb" : "2px solid #f3f4f6",
                      borderRadius: "12px",
                      fontSize: "14px",
                      transition: "all 0.2s",
                      backgroundColor: isEditing ? "white" : "#f9fafb",
                      color: isEditing ? "#1f2937" : "#6b7280",
                      outline: "none"
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = "#6366f1";
                        e.target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              ))}
            </div>

            {isEditing && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                paddingTop: "24px",
                borderTop: "1px solid #f3f4f6"
              }}>
                <button
                  type="submit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 32px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.2s",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <Save style={{ width: "16px", height: "16px" }} />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 32px",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#e5e7eb";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#f3f4f6";
                  }}
                >
                  <X style={{ width: "16px", height: "16px" }} />
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;