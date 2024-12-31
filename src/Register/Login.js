import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Registration.module.css'; // Reuse the CSS module for consistency
import loginImage from '../images/login-image.png'; // Ensure you have a relevant image

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        navigate('/home');
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Error registering user!');
    }
  };
  

  return (
    <div className={styles.registrationPage}>
      <div className={styles.leftColumn}>
        <div className={styles.registrationContainer}>
          <h1 className={styles.registrationTitle}>Login</h1>
          <form className={styles.registrationForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
          <div className={styles.loginPrompt}>
            <p>Don't have an account? <span className={styles.loginLink} onClick={() => navigate('/')}>Register</span></p>
          </div>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <motion.img
          src={loginImage}
          alt="Login"
          className={styles.registrationImage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

export default Login;
