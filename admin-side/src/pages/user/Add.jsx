import { Link } from 'react-router-dom';
import React, { useState } from "react";
import axios from "../../axiosConfig";
import Swal from "sweetalert2";
import usePageTitle from '../../hooks/usePageTitle';
const Add = () => {
  usePageTitle("Add User");
  const [users, setUsers] = useState([{ fullname: '', phone: '', email: '', password: '' }]);
  const [rowCount, setRowCount] = useState(1);

  const handleAddRows = () => {
    const newRows = Array.from({ length: rowCount }, () => ({ fullname: '', phone: '', email: '', password: '' }));
    setUsers([...users, ...newRows]);
  };

  const handleInputChange = (index, event) => {
    const values = [...users];
    values[index][event.target.name] = event.target.value;
    setUsers(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateUser(users);
  };
  const handleCreateUser = (newUsers) => {
    axios
      .post("/admin/users", { users: newUsers })
      .then((response) => {
        console.log(response.data);

        // setMsg(response.data.message);
        // setUsers([...users, response.data.user]);
      })
      .catch((error) => {
        console.error("There was an error creating the user!", error);
      });
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          <p><Link to="/admin/users" className="btn btn-success btn-sm cus_success_btn">Go back</Link></p>
        </div>
        <div className="col-3 d-flex align-items-center">
          <label htmlFor="rowCount" className="mr-2">Add</label>
          <input type="number" className="form-control form-control-sm mr-2" placeholder="" value={rowCount}
            onChange={(e) => setRowCount(Number(e.target.value))}/>
          <label htmlFor="rowCount" className="mr-2">Column(s)</label>
          <button type="button" className="btn btn-warning rounded-pill" onClick={handleAddRows}>Go</button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered text-center" id="table_user">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <input type="text" name="fullname" value={user.fullname} onChange={event => handleInputChange(index, event)} required />
                </td>
                <td>
                  <input type="text" name="phone" value={user.phone} onChange={event => handleInputChange(index, event)} required />
                </td>
                <td>
                  <input type="email" name="email" value={user.email} onChange={event => handleInputChange(index, event)} required />
                </td>
                <td>
                  <input type="password" name="password" value={user.password} onChange={event => handleInputChange(index, event)} required />
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
};

export default Add;