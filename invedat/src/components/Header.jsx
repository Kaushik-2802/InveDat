import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate=useNavigate()

  const handleEnterprenuerLogin=()=>{
    navigate("/enterprenuer-login")
  }

  const handleInvestorLogin=()=>{
    navigate("/investor-login")
  }
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // CSS styles as JavaScript objects
  const styles = {
    header: {
      width: '100%',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    appName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2563eb' // Blue color
    },
    dropdownContainer: {
      position: 'relative',
      display: 'inline-block'
    },
    loginButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    dropdownMenu: {
      position: 'absolute',
      right: '0',
      marginTop: '8px',
      width: '200px',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 100,
      border: '1px solid #e5e7eb',
      display: isDropdownOpen ? 'block' : 'none'
    },
    dropdownItem: {
      display: 'block',
      width: '100%',
      padding: '8px 16px',
      textAlign: 'left',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#374151'
    },
    chevronIcon: {
      width: '16px',
      height: '16px',
      marginLeft: '4px'
    }
  };

  // Hover styles (to be applied via event handlers)
  const hoverStyles = {
    loginButton: {
      backgroundColor: '#1d4ed8' // Darker blue
    },
    dropdownItem: {
      backgroundColor: '#eff6ff', // Light blue background
      color: '#2563eb' // Blue text
    }
  };

  return (
    <header style={styles.header}>
      {/* App Name */}
      <div style={styles.appName}>InveDat</div>
      
      {/* Login Dropdown */}
      <div style={styles.dropdownContainer}>
        <button
          onClick={toggleDropdown}
          style={styles.loginButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = hoverStyles.loginButton.backgroundColor;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = styles.loginButton.backgroundColor;
          }}
        >
          Login
          <svg 
            style={styles.chevronIcon}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        
        {/* Dropdown Menu */}
        <div style={styles.dropdownMenu}>
          <button
            style={styles.dropdownItem}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = hoverStyles.dropdownItem.backgroundColor;
              e.target.style.color = hoverStyles.dropdownItem.color;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = styles.dropdownItem.color;
            }}
            onClick={handleInvestorLogin}
          >
            Login as Investor
          </button>
          <button
            style={styles.dropdownItem}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = hoverStyles.dropdownItem.backgroundColor;
              e.target.style.color = hoverStyles.dropdownItem.color;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = styles.dropdownItem.color;
            }}
            onClick={handleEnterprenuerLogin}
          >
            Login as Entrepreneur
          </button>
        </div>
      </div>
    </header>
  );
}