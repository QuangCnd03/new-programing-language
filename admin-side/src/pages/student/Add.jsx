import React, { useState } from 'react'
import { usePageTitle } from '../../hooks/hook'
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../axiosConfig";
import { useInputNumberInt } from '../../hooks/hook';
const Add = () => {
  usePageTitle("Add Students");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [students, setStudents] = useState([{name: "", phone: "", email: "", password: ""}]);
  const [rowCount, setRowCount] = useState(1);
  const navigate = useNavigate();
  const inputNumberInt = useInputNumberInt();
  const handleInputChange = (index, event) => {
    const values = [...students];
    values[index][event.target.name] = event.target.value;
    setStudents(values);
  }
  const handleAddRows = () => {
    const newRows = Array.from({length: rowCount}, () => ({name: "", phone: "", email: "", password: ""}));
    setStudents([...students, ...newRows]);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateStudents(students);
  }
  const handleCreateStudents = (newStudents) => {
    axios.post(`/admin/students`, { students: newStudents}).then((response) => {
      setError("");
      setMsg(response.data.message);
      setTimeout(() => {
        navigate("/admin/students");
      }, 2000);
      
    }).catch((error) => {
      setMsg("");
      const errors = error.response.data.errors;
      if(errors) {
        const groupedErrors = {};
        Object.entries(errors).forEach(([index, messages]) => {
          messages.forEach((message) => {
            if(!groupedErrors[message]) {
              groupedErrors[message] = [];
            }
            groupedErrors[message].push(parseInt(index) + 1);
          });
        });
        let errorMessage = "";
        Object.entries(groupedErrors).forEach(([message, rows]) => {
          console.log(rows);
          
          errorMessage += `${message} (Row: ${rows.join(", ")})\n`;
        });
        setError(errorMessage.trim());
      }
    });
  }
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
          <p><Link to="/admin/students" className="btn btn-success btn-sm cus_success_btn">Go back</Link></p>
        </div>
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="rowCount" className="mr-2">Add</label>
          <input type="number" className="form-control form-control-sm mr-2"
           value={rowCount} onChange={(e) => setRowCount(Number(e.target.value))}/>
          <label htmlFor="rowCount" className="mr-2">Column(s)</label>
          <button type="button" className="btn btn-warning rounded-pill" onClick={handleAddRows}>Go</button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered text-center" id="table_student">
        <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input type="text" name="name" value={student.name} onChange={(event) => handleInputChange(index, event)}/>
                </td>
                <td>
                  <input type="text" name="phone" value={student.phone} onChange={(event) => handleInputChange(index, event)} onKeyPress={inputNumberInt}/>
                </td>
                <td>
                  <input type="email" name="email" value={student.email} onChange={(event) => handleInputChange(index, event)}/>
                </td>
                <td>
                  <input type="password" name="password" value={student.password} onChange={(event) => handleInputChange(index, event)}/>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        <div className="row">
          <div className="col d-flex justify-content-end">
            <button type="submit" className="btn btn-primary btn-sm cus_primary_btn">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add