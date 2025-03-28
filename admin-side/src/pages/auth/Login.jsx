import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    axios.post('/auth/login', { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate("/admin");
    }).catch((error) => {
      setError(error.response.data.message);
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  heading: { textAlign: 'center', marginBottom: '20px', color: '#333' },
  error: { color: 'red', textAlign: 'center', marginBottom: '15px' },
  form: { display: 'flex', flexDirection: 'column' },
  formGroup: { marginBottom: '15px' },
  label: { marginBottom: '5px', fontWeight: 'bold', color: '#555' },
  input: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' },
  link: { textAlign: 'center', marginTop: '15px', color: '#555' },
};

export default Login;