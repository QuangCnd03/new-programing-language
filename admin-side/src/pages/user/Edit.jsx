import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import Swal from "sweetalert2";
import usePageTitle from '../../hooks/usePageTitle';
const Edit = () => {
  usePageTitle("Edit User");
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");
    const handleUpdateUser = (id, user) => {
        axios.put(`/admin/users/${id}`, user)
        .then((response) => {
            setMsg(response.data.message);
            setUsers(users.map((u) => (u.id === id ? response.data.user : u)));
        })
        .catch((error) => {
            console.error("There was an error updating the user!", error);
        });
    };
  return (
    <h1>ok</h1>
  )
};

export default Edit;
