import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../../hooks/hook'
import axios from "../../axiosConfig";
import Swal from "sweetalert2";
const List = () => {
    usePageTitle("List Students");
    const [msg, setMsg] = useState("");
    const [students, setStudents] = useState([]);
    useEffect(() => {
        axios.get("/admin/students")
        .then((response) => {
            setStudents(response.data.students);
        }).catch((error) => {
            console.error("There was an error fetching the students!", error);
        });
    }, []);
    const handleSearchChange = (e) => {
        e.preventDefault();
        axios.post(`/admin/students/search`, {keyword: e.target.value}).then((response) => {
            setStudents(response.data.students);            
        }).catch((error) => {
            console.error("There was an error searching the students!", error);
        });
    };
    const handleDeleteStudent = (id) => {
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
            axios.delete(`/admin/students/${id}`).then((response) => {
              setMsg(response.data.message);
              setStudents(students.filter((student) => student.id !== id));
            });
          }
        });
      };
    return (
        <div>
          {msg && <div className="alert alert-success text-center">{msg}</div>}
          <p>
            <Link to="/admin/students/create" className="btn btn-success cus_success_btn">
              Add new student
            </Link>
          </p>
          <div className="row mb-4">
            <div className="col">
              <input type="search" className="form-control" name="search" id="keyword"
              placeholder="Enter keyword ..." onChange={handleSearchChange}/>
            </div>
          </div>
          <table className="table table-bordered text-center" id="table_users">
            <thead>
              <tr>
                <th>No.</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Status</th>
                <th>Created time</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {students.length > 0 ? (
                    students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.address}</td>
                            <td>
                                {student.status === 1 ? (
                                    <span className="badge bg-success" style={{color: 'white'}}>Actived</span>
                                ) : (
                                    <span className="badge bg-danger" style={{color: 'white'}}>Not activated</span>
                                )}
                            </td>
                            <td>{new Date(student.created_at).toLocaleDateString()}</td>
                            <td>
                                <p>
                                    <Link to={`/admin/students/edit/${student.id}`}>
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                </p>
                            </td>
                            <td>
                                <p>
                                    <a href="#" id="user-remove" onClick={() => handleDeleteStudent(student.id)}>
                                        <i className="fa fa-trash"></i>
                                    </a>
                                </p>
                            </td>
                        </tr>
                    ))
                ): (
                    <tr>
                        <td colSpan="9">No student found</td>
                    </tr>
                )}
            </tbody>
          </table>
        </div>
      );
}

export default List