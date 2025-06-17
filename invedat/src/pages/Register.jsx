import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// CSS styles defined inline
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF", // light indigo background
    padding: "20px",
  },
  formContainer: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)",
    padding: "32px",
    border: "1px solid #EEF2FF",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#4338CA", // indigo-700
    marginBottom: "24px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#4F46E5", // indigo-600
  },
  input: {
    padding: "12px 16px",
    borderRadius: "6px",
    border: "1px solid #C7D2FE", // indigo-200
    outline: "none",
    transition: "border-color 0.2s ease",
    fontSize: "16px",
  },
  select: {
    padding: "12px 16px",
    borderRadius: "6px",
    border: "1px solid #C7D2FE", // indigo-200
    backgroundColor: "white",
    outline: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#4F46E5", // indigo-600
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "12px 16px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "16px",
    transition: "background-color 0.2s ease",
  },
  buttonHover: {
    backgroundColor: "#4338CA", // indigo-700
  },
  switchLink: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "14px",
    color: "#4B5563", // gray-600
  },
  link: {
    color: "#4F46E5", // indigo-600
    textDecoration: "none",
    fontWeight: "500",
  },
  successMessage: {
    color: "green",
    textAlign: "center",
    marginTop: "16px",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: "16px",
  },
};

const Register = () => {
  const [role, setRole] = useState("Entrepreneur");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      const res = await axios.post("https://invedat.onrender.com/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      setSuccess("Registration successful");
      setError("");
      console.log(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }

    console.log("Register:", { role, name, email });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Register As:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.select}
            >
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Investor">Investor</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

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

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isHovered ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Register
          </button>

          {success && <div style={styles.successMessage}>{success}</div>}
          {error && <div style={styles.errorMessage}>{error}</div>}
        </form>

        <div style={styles.switchLink}>
          Already have an account?{" "}
          <Link to="/entrepreneur-login" style={styles.link}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
