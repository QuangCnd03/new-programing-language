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
    return (
        <div>
        {msg && <div className="alert alert-success text-center">{msg}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <p>
            <Link to="/admin/courses/create" className="btn btn-success cus_success_btn">
                Add more
            </Link>
        </p>
        <table className="table table-bordered text-center" id="table_courses">
            <thead>
            <tr>
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
                courses.map((course) => (
                <tr key={course.id}>
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
                    <a href="#" data-value={course.id}>
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
