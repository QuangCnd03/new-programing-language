import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { handleErrorMsg, handleSlug } from "../../hooks/hook";
import { ShowLessonOptionLevel } from "../../components/lesson/Lesson";

const Add = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get("module");
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        parent_id: parseInt(moduleId),
        is_trial: 0,
        status: 1,
        video: null,
        document: null,
        description: "",
        course_id: parseInt(courseId),
    });
    const [lessons, setLessons] = useState([]);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
      axios.get(`/admin/lessons/${courseId}`).then((response) => {
        setLessons(response.data.lessons);
      }).catch((error) => {
          console.error("Fetching lessons:", error);
      });
    }, [courseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setFormData({
                ...formData,
                [name]: value,
                slug: handleSlug(value),
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        console.log(file.name);
        
        setFormData({ ...formData, [name]: file });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null) { // Chỉ thêm các giá trị không null
                data.append(key, formData[key]);
            }
        });
        // console.log(formData);
        axios.post(`/admin/lessons/${courseId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
          setError("");
          setMsg(response.data.message);
          console.log(response.data.lesson);
            
            // setTimeout(() => {
            //   navigate(`/admin/lessons?course=${courseId}`);
            // }, 1500);
        }).catch((error) => {
            const { errors } = error.response.data;
            console.log(errors);
            
            setMsg("");
            // setError(handleErrorMsg(errors));
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
            <div className="row">
                <div className="col">
                    <p>
                        <a
                            href={`/admin/lessons/${courseId}`}
                            className="btn btn-success btn-sm cus_success_btn"
                        >
                            List of modules - lessons
                        </a>
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} id="form-courses" encType="multipart/form-data">
                <div className="row" id="lesson-form">
                    <div className="col-6 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter lesson name ..."
                        />
                    </div>
                    <div className="col-6 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Slug</label>
                        <input
                            type="text"
                            className="form-control"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            placeholder=""
                        />
                    </div>
                    <div className="col-6 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Module</label>
                        <select
                            className="form-control"
                            name="parent_id"
                            value={formData.parent_id}
                            onChange={handleInputChange}
                        >
                            <ShowLessonOptionLevel lessons={lessons} />
                        </select>
                    </div>
                    <div className="col-3 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Trial</label>
                        <select
                            className="form-control"
                            name="is_trial"
                            value={formData.is_trial}
                            onChange={handleInputChange}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                    <div className="col-3 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Status</label>
                        <select
                            className="form-control"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="0">Not activated</option>
                            <option value="1">Activated</option>
                        </select>
                    </div>
                    {/* <div className="col-2 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Sort</label>
                        <input
                            type="text"
                            className="form-control"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            placeholder="position ..."
                        />
                    </div> */}
                    <div className="col-6 mb-3">
                        <label style={{ fontWeight: 700 }}>Video</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={formData.video ? formData.video.name : ""}
                                placeholder="Video ..."
                                readOnly // Chỉ hiển thị tên file, không cho chỉnh sửa
                            />
                            <input
                                type="file"
                                name="video"
                                onChange={handleFileChange}
                                accept="video/*" // Chỉ cho phép chọn file video
                                style={{ display: "none" }}
                                id="video-upload"
                            />
                            <label htmlFor="video-upload" className="btn btn-success">
                                Choose
                            </label>
                        </div>
                    </div>
                    <div className="col-6 mb-3">
                        <label style={{ fontWeight: 700 }}>Document</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={formData.document ? formData.document.name : ""}
                                placeholder="Document ..."
                                readOnly
                            />
                            <input
                                type="file"
                                name="document"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx" // Chỉ cho phép file tài liệu
                                style={{ display: "none" }}
                                id="document-upload"
                            />
                            <label htmlFor="document-upload" className="btn btn-success">
                                Choose
                            </label>
                        </div>
                    </div>
                    <div className="col-12 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Content</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="5"
                        />
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-sm cus_primary_btn">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Add;