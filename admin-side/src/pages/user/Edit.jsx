import React, { use, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { usePageTitle } from "../../hooks/hook";
import { Link, useParams } from "react-router-dom";
import { useInputNumberInt } from "../../hooks/hook";
const Edit = () => {
  usePageTitle("Edit User");
  const inputNumberInt = useInputNumberInt();
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState({fullname: '', phone: '', email: '', password: ''});
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    axios.get(`/admin/users/${id}`).then((response) => {
      setUserDetail(response.data.user);
    })
    .catch((error) => {
      console.error("There was an error updating the user!", error);
    });
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({...userDetail, [name]: value});
  }
  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    userDetail.password = "";
    if(password) {
      userDetail.password = password;
    }
    handleUpdateUser(id, userDetail);
  };
  const handleUpdateUser = (id, user) => {
    axios.put(`/admin/users/${id}`, user)
      .then((response) => {
        setMsg(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
      });
  };
  return (
    <div>
      {msg && <div className="alert alert-success text-center">{msg}</div>}
      <div className="row">
        <div className="col">
          <p>
            <Link
              to="/admin/users"
              className="btn btn-success btn-sm cus_success_btn"
            >
              Go back
            </Link>
          </p>
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
              <tr>
                <td><input type="text" name="fullname" value={userDetail.fullname} onChange={handleInputChange}/>
                </td>
                <td>
                  <input type="text" name="phone" value={userDetail.phone}
                    onChange={handleInputChange} onKeyPress={inputNumberInt}
                  />
                </td>
                <td>
                  <input type="email" name="email" value={userDetail.email}
                    onChange={handleInputChange}/>
                </td>
                <td>
                  <input type="password" name="password" value={password} onChange={handleInputPassword} placeholder="Enter if you want to change ..." />
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
