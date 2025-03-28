import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axiosConfig';
import { usePageTitle } from '../../hooks/hook';
import { AddNewModule, ShowLessons } from '../../components/lesson/Lesson';
import Swal from 'sweetalert2';
const List = () => {
    usePageTitle("Course Lessons");
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    
    useEffect(() => {
        axios.get(`/admin/lessons/${courseId}`)
            .then((response) => {
                setLessons(response.data.lessons);
            })
            .catch((error) => {
                console.error("Fetching lessons:", error);
            });
    }, [courseId]);

    const handleDelete = (e, id) => {
        e.preventDefault();
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
              axios.delete(`/admin/lessons/${id}`).then((response) => {
                setMsg(response.data.message);
                setLessons(lessons.filter((lesson) => lesson.id !== id));
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
            <div className="row mb-4">
                <div className="col">
                    <Link to={`/admin/courses`} className="btn btn-success btn-sm cus_success_btn">
                        Go back
                    </Link>
                    <AddNewModule courseId={courseId} resetData={setLessons} />
                </div>
            </div>
            <hr />
            <table className="table table-bordered text-center" id="table_lessons">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Trial</th>
                        <th>View</th>
                        <th>Duration</th>
                        <th>Create time</th>
                        <th>Add</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <ShowLessons lessons={lessons} onDelete={handleDelete} />
                </tbody>
            </table>
        </div>
    );
};

export default List;