import React, { useEffect, useState } from "react";
import { formatPrice } from "../../hooks/hook";
import { usePageTitle } from '../../hooks/hook'
import axios from "../../axiosConfig";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const List = () => {
    usePageTitle("List Courses");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get(`/admin/courses`).then((response) => {
            setCourses(response.data.courses);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    const handleSearchChange = (e) => {
        axios.post(`/admin/courses/search`, {keyword: e.target.value}).then((response) => {
          setCourses(response.data.courses);
        }).catch((error) => {
          console.error("There was an error searching", error);
        });
      }
    const handleDeleteCourse = (id) => {
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
            axios.delete(`/admin/courses/${id}`).then((response) => {
              setMsg(response.data.message);
              setCourses(courses.filter((course) => course.id !== id));
            });
          }
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
        <p>
            <Link to="/admin/courses/create" className="btn btn-success cus_success_btn">
                Add more
            </Link>
        </p>
        <div className="row mb-4">
            <div className="col">
              <input type="search" className="form-control" name="search" id="keyword"
              placeholder="Enter keyword ..." onChange={handleSearchChange}/>
            </div>
        </div>
        <table className="table table-bordered text-center" id="table_courses">
            <thead>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Lessons</th>
                <th>Create time</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {courses.length > 0 ? (
                courses.map((course, index) => (
                <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>{course.name}</td>
                    <td>
                    {course.price === 0 && course.sale_price === 0 ? (
                        <p className="btn btn-warning btn-sm">Free</p>
                    ) : course.sale_price > 0 ? (
                        formatPrice(course.sale_price)
                    ) : (
                        formatPrice(course.price)
                    )}
                    </td>
                    <td>
                    {course.status === 0 ? (
                        <span className="badge bg-warning">Coming soon</span>
                    ) : (
                        <span className="badge bg-success">Released</span>
                    )}
                    </td>
                    <td>
                    <Link to={`/admin/lessons/${course.id}`}>
                        <i className="fa-solid fa-layer-group btn btn-primary"></i>
                    </Link>
                    </td>
                    <td>{new Date(course.created_at).toLocaleDateString()}</td>
                    <td>
                    <Link to={`/admin/courses/edit/${course.id}`}>
                        <i className="fa fa-edit"></i>
                    </Link>
                    </td>
                    <td>
                    <a href="#" onClick={() => handleDeleteCourse(course.id)}>
                        <i className="fa fa-trash"></i>
                    </a>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="7">No courses found.</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

export default List;
