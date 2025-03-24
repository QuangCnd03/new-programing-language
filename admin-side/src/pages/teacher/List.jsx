import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";
import Swal from "sweetalert2";
import { usePageTitle } from "../../hooks/hook";

const List = () => {
  usePageTitle("List teachers");
  const [teachers, setTeachers] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("/admin/teachers").then((response) => {
        setTeachers(response.data.teachers);
      }).catch((error) => {
        console.error("There was an error fetching the teachers!", error);
      });
  }, []);


  const handleSearchChange = (e) => {
    axios.post("/admin/teachers/search", { keyword: e.target.value }).then((response) => {
        setTeachers(response.data.teachers);
      }).catch((error) => {
        console.error("There was an error searching the teachers!", error);
      });
  };

  const handleDeleteTeacher = (id) => {
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
        axios.delete(`/admin/teachers/${id}`).then((response) => {
            setMsg(response.data.message);
            setTeachers(teachers.filter((teacher) => teacher.id != id));
          }).catch((error) => {
            console.error("There was an error deleting the teacher!", error);
          });
      }
    });
  };

  return (
    <div>
      {msg && <div className="alert alert-success text-center">{msg}</div>}
      <p>
        <Link to="/admin/teachers/create" className="btn btn-success cus_success_btn" >
          Add new teacher
        </Link>
      </p>
      <div className="row mb-4">
        <div className="col">
          <input type="search" className="form-control" name="search" id="keyword" placeholder="Enter keyword ..."
          onChange={handleSearchChange} />
        </div>
      </div>
      <table className="table table-bordered text-center" id="table_teachers">
        <thead>
          <tr>
            <th>No.</th>
            <th>Image</th>
            <th>Lecturer Name</th>
            <th>Experience</th>
            <th>Created At</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <tr key={teacher.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={"http://127.0.0.1:8000" + teacher.image} alt="" style={{ width: "150px", height: "150px" }}/>
                </td>
                <td>{teacher.name}</td>
                <td>{teacher.exp}</td>
                <td>{new Date(teacher.created_at).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/teachers/edit/${teacher.id}`}>
                    <i className="fa fa-edit"></i>
                  </Link>
                </td>
                <td>
                  <a href="#" id="teacher-remove" onClick={() => handleDeleteTeacher(teacher.id)}>
                    <i className="fa fa-trash"></i>
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No teachers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;