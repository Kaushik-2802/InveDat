import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from '../components/SideBarInv'

const InvestorProfile = () => {
  const userId = localStorage.getItem("userId");

  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    affiliatedOrganization: "",
    numberOfInvestments: "",
    investmentDomains: "",
    profilePhoto: null,
    financialStatement: null,
  });

  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existingProfile, setExistingProfile] = useState(null);

  // Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/investor-profile/${userId}`);
        if (res.data.profile) {
          const p = res.data.profile;
          setExistingProfile(p);
          setProfileData({
            name: p.name || "",
            age: p.age || "",
            gender: p.gender || "",
            dateOfBirth: p.dateOfBirth?.split("T")[0] || "",
            affiliatedOrganization: p.affiliatedOrganization || "",
            numberOfInvestments: p.numberOfInvestments || "",
            investmentDomains: p.investmentDomains?.join(", ") || "",
            profilePhoto: null,
            financialStatement: null,
          });
          setEditData({
            name: p.name || "",
            age: p.age || "",
            gender: p.gender || "",
            dateOfBirth: p.dateOfBirth?.split("T")[0] || "",
            affiliatedOrganization: p.affiliatedOrganization || "",
            numberOfInvestments: p.numberOfInvestments || "",
            investmentDomains: p.investmentDomains?.join(", ") || "",
          });
        }
      } catch (error) {
        console.log("Profile not found");
      }
    };
    
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setEditData(prev => ({ ...prev, [field]: file }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset edit data to original values
    setEditData({
      name: profileData.name,
      age: profileData.age,
      gender: profileData.gender,
      dateOfBirth: profileData.dateOfBirth,
      affiliatedOrganization: profileData.affiliatedOrganization,
      numberOfInvestments: profileData.numberOfInvestments,
      investmentDomains: profileData.investmentDomains,
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    const payload = new FormData();
    payload.append("userId", userId);
    for (let key in editData) {
      if (editData[key] !== null && editData[key] !== undefined && editData[key] !== "") {
        payload.append(key, editData[key]);
      }
    }

    try {
      if (existingProfile) {
        // Update existing profile
        const res = await axios.put(`http://localhost:5000/api/investor-profile/${existingProfile._id}`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // Update local state with new data
        const updatedProfile = res.data.profile;
        setExistingProfile(updatedProfile);
        setProfileData({
          name: updatedProfile.name || "",
          age: updatedProfile.age || "",
          gender: updatedProfile.gender || "",
          dateOfBirth: updatedProfile.dateOfBirth?.split("T")[0] || "",
          affiliatedOrganization: updatedProfile.affiliatedOrganization || "",
          numberOfInvestments: updatedProfile.numberOfInvestments || "",
          investmentDomains: updatedProfile.investmentDomains?.join(", ") || "",
          profilePhoto: null,
          financialStatement: null,
        });
        
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        // Create new profile
        const res = await axios.post("http://localhost:5000/api/investor-profile", payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        const newProfile = res.data.profile;
        setExistingProfile(newProfile);
        setProfileData({
          name: newProfile.name || "",
          age: newProfile.age || "",
          gender: newProfile.gender || "",
          dateOfBirth: newProfile.dateOfBirth?.split("T")[0] || "",
          affiliatedOrganization: newProfile.affiliatedOrganization || "",
          numberOfInvestments: newProfile.numberOfInvestments || "",
          investmentDomains: newProfile.investmentDomains?.join(", ") || "",
          profilePhoto: null,
          financialStatement: null,
        });
        
        alert("Profile created successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving profile");
    } finally {
      setIsLoading(false);
    }
  };
   const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    window.location.href = "/";
  };

   const styles = {
    // Main layout container
    layoutContainer: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f8fafc"
    },
    // Main content area (adjusted for sidebar)
    mainContent: {
      flex: 1,
      marginLeft: "0", // Adjust this based on your sidebar width
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    // Responsive adjustment for smaller screens
    mainContentResponsive: {
      flex: 1,
      marginLeft: "0", // No margin on mobile
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    profileCard: {
      maxWidth: '900px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(10px)',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative'
    },
    headerTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      margin: '0',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    headerSubtitle: {
      fontSize: '1.1rem',
      opacity: '0.9',
      margin: '0.5rem 0 0 0',
      fontWeight: '300'
    },
    editButton: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      background: 'rgba(255, 255, 255, 0.2)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },
    profileContent: {
      padding: '2rem'
    },
    profileImageSection: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '6px solid white',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
      marginBottom: '1rem'
    },
    profileImagePlaceholder: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem auto',
      color: 'white',
      fontSize: '3rem',
      fontWeight: '700',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
    },
    profileGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    profileSection: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      borderRadius: '15px',
      padding: '1.5rem',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.08)'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '1rem',
      borderBottom: '2px solid #667eea',
      paddingBottom: '0.5rem'
    },
    profileField: {
      marginBottom: '1rem'
    },
    fieldLabel: {
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#718096',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '0.5rem',
      display: 'block'
    },
    fieldValue: {
      fontSize: '1.1rem',
      color: '#2d3748',
      fontWeight: '500',
      minHeight: '1.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e1e8ed',
      borderRadius: '8px',
      fontSize: '1rem',
      background: '#fff',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e1e8ed',
      borderRadius: '8px',
      fontSize: '1rem',
      background: '#fff',
      cursor: 'pointer',
      outline: 'none',
      boxSizing: 'border-box'
    },
    fileInput: {
      width: '100%',
      padding: '0.5rem',
      border: '2px dashed #e1e8ed',
      borderRadius: '8px',
      background: '#f8fafc',
      cursor: 'pointer',
      fontSize: '0.9rem',
      boxSizing: 'border-box'
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginTop: '2rem'
    },
    saveButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 2rem',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
    },
    cancelButton: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 2rem',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)'
    },
    buttonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed'
    },
    domainsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    domainTag: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '15px',
      fontSize: '0.85rem',
      fontWeight: '500'
    }
  };

  // Check screen size for responsive design
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!existingProfile && userId) {
    return (
      <div style={styles.layoutContainer}>
        <Sidebar showSidebar={true} onLogout={handleLogout} />
        <div style={isMobile ? styles.mainContentResponsive : styles.mainContent}>
          <div style={styles.profileCard}>
            <div style={styles.header}>
              <h1 style={styles.headerTitle}>Loading Profile...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.layoutContainer}>
      <Sidebar showSidebar={true} onLogout={handleLogout} />
      <div style={isMobile ? styles.mainContentResponsive : styles.mainContent}>
        <div style={styles.profileCard}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>Investor Profile</h1>
            <p style={styles.headerSubtitle}>Investment Portfolio & Information</p>
            
            {!isEditing && (
              <button
                onClick={handleEdit}
                style={styles.editButton}
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>

          <div style={styles.profileContent}>
            {/* Profile Image Section */}
            <div style={styles.profileImageSection}>
              {existingProfile.profilePhoto?.filePath ? (
                <img
                  src={`http://localhost:5000/${existingProfile.profilePhoto.filePath}`}
                  alt="Profile"
                  style={styles.profileImage}
                />
              ) : (
                <div style={styles.profileImagePlaceholder}>
                  {existingProfile.name?.charAt(0) || 'U'}
                </div>
              )}
              
              {isEditing && (
                <div style={{marginTop: '1rem'}}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('profilePhoto', e.target.files[0])}
                    style={styles.fileInput}
                  />
                </div>
              )}
            </div>

            {/* Profile Information Grid */}
            <div style={styles.profileGrid}>
              {/* Personal Information */}
              <div style={styles.profileSection}>
                <h3 style={styles.sectionTitle}>Personal Information</h3>
                
                <div style={styles.profileField}>
                  <label style={styles.fieldLabel}>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      style={styles.input}
                    />
                  ) : (
                    <div style={styles.fieldValue}>{existingProfile.name}</div>
                  )}
                </div>

                <div style={styles.profileField}>
                  <label style={styles.fieldLabel}>Age</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.age || ''}
                      onChange={(e) => handleEditChange('age', e.target.value)}
                      style={styles.input}
                    />
                  ) : (
                    <div style={styles.fieldValue}>{existingProfile.age} years</div>
                  )}
                </div>

                <div style={styles.profileField}>
                  <label style={styles.fieldLabel}>Gender</label>
                  {isEditing ? (
                    <select
                      value={editData.gender || ''}
                      onChange={(e) => handleEditChange('gender', e.target.value)}
                      style={styles.select}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div style={styles.fieldValue}>{existingProfile.gender}</div>
                  )}
                </div>

                <div style={styles.profileField}>
                  <label style={styles.fieldLabel}>Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.dateOfBirth || ''}
                      onChange={(e) => handleEditChange('dateOfBirth', e.target.value)}
                      style={styles.input}
                    />
                  ) : (
                    <div style={styles.fieldValue}>
                      {new Date(existingProfile.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div style={styles.profileSection}>
                <h3 style={styles.sectionTitle}>Professional Information</h3>
                
                <div style={styles.profileField}>
                  <label style={styles.fieldLabel}>Affiliated Organization</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.affiliatedOrganization || ''}
                      onChange={(e) => handleEditChange('affiliatedOrganization', e.target.value)}
                      style={styles.input}
                    />
                  ) : (
                    <div style={styles.fieldValue}>
                      {existingProfile.affiliatedOrganization || 'Not specified'}
                    </div>
                  )}
                </div>

                <div style={styles.profileField}>
                  <label style={styles.fieldLabel}>Total Investments</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.numberOfInvestments || ''}
                      onChange={(e) => handleEditChange('numberOfInvestments', e.target.value)}
                      style={styles.input}
                    />
                  ) : (
                    <div style={styles.fieldValue}>{existingProfile.numberOfInvestments || 0}</div>
                  )}
                </div>

                <div style={styles.profileField}>
                  <label style={styles.fieldLabel}>Investment Domains</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.investmentDomains || ''}
                      onChange={(e) => handleEditChange('investmentDomains', e.target.value)}
                      placeholder="e.g., Technology, Healthcare, Fintech"
                      style={styles.input}
                    />
                  ) : (
                    <div style={styles.fieldValue}>
                      {existingProfile.investmentDomains && existingProfile.investmentDomains.length > 0 ? (
                        <div style={styles.domainsContainer}>
                          {existingProfile.investmentDomains.map((domain, index) => (
                            <span key={index} style={styles.domainTag}>
                              {domain}
                            </span>
                          ))}
                        </div>
                      ) : (
                        'Not specified'
                      )}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div style={styles.profileField}>
                    <label style={styles.fieldLabel}>Financial Statement</label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => handleFileChange('financialStatement', e.target.files[0])}
                      style={styles.fileInput}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - Only show when editing */}
            {isEditing && (
              <div style={styles.actionButtons}>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  style={{
                    ...styles.saveButton,
                    ...(isLoading ? styles.buttonDisabled : {})
                  }}
                >
                  {isLoading ? 'Saving...' : '💾 Save Changes'}
                </button>
                
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  style={{
                    ...styles.cancelButton,
                    ...(isLoading ? styles.buttonDisabled : {})
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;