import { Link } from "react-router-dom";
import React, { use, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import Swal from "sweetalert2";
import { usePageTitle } from "../../hooks/hook";
const List = () => {
  usePageTitle("List Users");
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    axios.get("/admin/users")
      .then((response) => {
        console.log(response);
        
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);
  const handleSearchChange = (e) => {
    e.preventDefault();
    axios.post(`/admin/users/search`, { keyword: e.target.value }).then((response) => {
        setUsers(response.data.users);
      }).catch((error) => {
        console.error("There was an error searching the users!", error);
      });
  };
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/admin/users/${id}`).then((response) => {
          setMsg(response.data.message);
          setUsers(users.filter((user) => user.id !== id));
        });
      }
    });
  };
  return (
    <div>
      {msg && <div className="alert alert-success text-center">{msg}</div>}
      <p>
        <Link
          to="/admin/users/create"
          className="btn btn-success cus_success_btn"
        >
          Add new user
        </Link>
      </p>
      <div className="row mb-4">
        <div className="col">
          <input type="search" className="form-control" name="search" 
            id="keyword" placeholder="Enter keyword ..." onChange={handleSearchChange} />
        </div>
      </div>
      <table className="table table-bordered text-center" id="table_users">
        <thead>
          <tr>
            <th>No.</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Created time</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <p>
                    <Link to={`/admin/users/edit/${user.id}`}>
                      <i className="fa fa-edit"></i>
                    </Link>
                  </p>
                </td>
                <td>
                  <p>
                    <a href="#" id="user-remove" onClick={() => handleDeleteUser(user.id)}>
                      <i className="fa fa-trash"></i>
                    </a>
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;