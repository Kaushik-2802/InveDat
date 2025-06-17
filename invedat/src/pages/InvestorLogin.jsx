import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    padding: "20px"
  },
  formContainer: {
    width: "100%",
    maxWidth: "450px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)",
    padding: "32px",
    border: "1px solid #EEF2FF"
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#4338CA",
    marginBottom: "24px",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#4F46E5"
  },
  input: {
    padding: "12px 16px",
    borderRadius: "6px",
    border: "1px solid #C7D2FE",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontSize: "16px"
  },
  button: {
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "12px 16px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "16px",
    transition: "background-color 0.2s ease"
  },
  buttonHover: {
    backgroundColor: "#4338CA"
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: "16px"
  },
  switchLink: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "14px",
    color: "#4B5563"
  },
  link: {
    color: "#4F46E5",
    textDecoration: "none",
    fontWeight: "500"
  }
};

const InvestorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        "https://invedat.onrender.com/api/auth/login",
        { email, password }
      );

      console.log("Login Success:", response.data);
      localStorage.setItem("token", response.data.token); // save JWT token
      localStorage.setItem("userId", response.data.user.id);

      // Navigate to the investor dashboard
      navigate("/investor-dashboard");
    } catch (err) {
      setError("Invalid Credentials");
      console.error("Login Error:", err.response);
    }

    console.log("Investor Login:", { email, password });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Investor Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isHovered ? styles.buttonHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Login
          </button>
        </form>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <div style={styles.switchLink}>
          Are you an entrepreneur?{" "}
          <Link to="/entrepreneur-login" style={styles.link}>
            Go Here
          </Link>
          <br />
          New user?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvestorLogin;