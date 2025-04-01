import React, { useState } from 'react';
import Menu from '../../components/account/Menu';
import axios from '../../../axiosConfig';
import { handleErrorMsg } from '../../hook/hook';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirm_password) {
        setError("Password and confirm password do not match");
        return;
    }
    axios.post('/change-password', formData).then(response => {
     setError("");
      setMsg(response.data.message);
    }).catch(error => {
      setMsg("");
      const { errors } = error.response.data;
      if(errors) {
        setError(handleErrorMsg(errors));
      }else{
        setError(error.response.data.message);
      }
    });
    
  };


  return (
    <section className="all-course py-2">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9">
            <h2 className="py-2">Change password</h2>
            {msg && <div className="alert alert-success text-center">{msg}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="old_password">Old password</label>
                <input 
                  type="password" 
                  name="old_password" 
                  className={`form-control`}
                  placeholder="Enter old password..."
                  value={formData.old_password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">New password</label>
                <input 
                  type="password" 
                  name="password" 
                  className={`form-control`}
                  placeholder="Enter new password..."
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirm_password">Confirm password</label>
                <input 
                  type="password" 
                  name="confirm_password" 
                  className={`form-control`}
                  placeholder="Confirm password..."
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;