import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { usePageTitle } from "../../hooks/hook";
import { Link, useParams } from "react-router-dom";
import { useInputNumberInt } from "../../hooks/hook";

const Edit = () => {
  usePageTitle("Edit Student");
  const inputNumberInt = useInputNumberInt();
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const [studentDetail, setStudentDetail] = useState({ name: '', phone: '', email: '', password: '' });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios.get(`/admin/students/${id}`).then((response) => {
      setStudentDetail(response.data.student);
    }).catch((error) => {
      console.error("There was an error fetching the student details!", error);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetail({ ...studentDetail, [name]: value });
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    studentDetail.password = "";
    if (password) {
      studentDetail.password = password;
    }
    console.log(studentDetail);
    
    handleUpdateStudent(id, studentDetail);
  };

  const handleUpdateStudent = (id, student) => {
    axios.put(`/admin/students/${id}`, student)
      .then((response) => {
        setError("");
        setMsg(response.data.message);
      })
      .catch((error) => {
        setMsg("");
        let errorMessage = "";
        const errors = error.response.data.errors; 
        Object.entries(errors).forEach(([index, message]) => {
          errorMessage += `${message} \n`;
        });
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <div>
      {msg && <div className="alert alert-success text-center">{msg}</div>}
      {error && (
        <div className="alert alert-danger text-center" style={{ whiteSpace: "pre-wrap" }}>
          {error}
        </div>
      )}
      <div className="row">
        <div className="col">
          <p>
            <Link
              to="/admin/students"
              className="btn btn-success btn-sm cus_success_btn"
            >
              Go back
            </Link>
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered text-center" id="table_student">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" name="name" value={studentDetail.name}
                  onChange={handleInputChange}/>
              </td>
              <td>
                <input type="text" name="phone" value={studentDetail.phone} onChange={handleInputChange}
                  onKeyPress={inputNumberInt}/>
              </td>
              <td>
                <input type="email" name="email" value={studentDetail.email}
                  onChange={handleInputChange}/>
              </td>
              <td>
                <input type="password" name="password" value={password}
                  onChange={handleInputPassword} placeholder="Enter if you want to change ..."/>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <button type="submit" className="btn btn-primary btn-sm cus_primary_btn">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;