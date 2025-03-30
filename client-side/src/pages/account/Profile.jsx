import React, { useState, useEffect } from 'react';
import Menu from '../../components/account/Menu';
import axios from '../../../axiosConfig';
import Swal from 'sweetalert2';
import { handleErrorMsg, useStudentProfile } from '../../hook/hook';

const Profile = () => {
  const [status, setStatus] = useState("table");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const student = useStudentProfile();
  
  useEffect(() => {
    if(student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        address: student.address
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('/update', formData).then(response => {
      setError("");
      setMsg(response.data.message);
    }).catch(error => {
      const { errors } = error.response.data ?? null;
      setMsg("");
      setError(handleErrorMsg(errors));
    });
  };

  const renderBtn = () => {
    return status === "table" ? "Update" : "Cancel";
  };

  const renderTableForm = () => {
    setStatus(status === "table" ? "form" : "table");
  };

  return (
    <section className="all-course py-2">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9 account-page">
            <h2 className="py-2">Information</h2>
            {msg && <div className="alert alert-success text-center">{msg}</div>}
            {error && (
              <div className="alert alert-danger text-center" style={{ whiteSpace: "pre-wrap" }}>
                {error}
              </div>
            )}
            <button 
              className={`btn my-3 profile-btn ${status === "table" ? "btn-warning" : "btn-danger"}`} 
              onClick={renderTableForm}
            >
              {renderBtn()}
            </button>
            
            <div className={`profile-table profile-item ${status === "table" ? "active" : ""}`}>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td width="25%">Name</td>
                    <td>{formData.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{formData.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{formData.phone}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{formData.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <form 
              className={`profile-table profile-item ${status === "form" ? "active" : ""}`} 
              onSubmit={handleSubmit}
            >
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td width="25%">Name</td>
                    <td>
                      <input 
                        type="text" 
                        name="name" 
                        className={`form-control`}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name..." 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                      <input 
                        type="email" 
                        name="email" 
                        className={`form-control`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email..." 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>
                      <input 
                        type="tel" 
                        name="phone" 
                        className={`form-control`}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone..." 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>
                      <input 
                        type="text" 
                        name="address" 
                        className={`form-control`}
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address..." 
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button 
                type="submit" 
                className="btn-update btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;