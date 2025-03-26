import React, { useState } from "react";
import axios from "../../axiosConfig";
import { getTimeDuration, handleSlug } from "../../hooks/hook"; // Giả sử bạn có hàm handleSlug
import { Link } from "react-router-dom";

export const AddNewModule = ({ courseId, resetData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [module, setModule] = useState({ name: "", slug: "", course_id: courseId});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setModule({
                ...module,
                [name]: value,
                slug: handleSlug(value),
            });
        } else {
            setModule({ ...module, [name]: value });
        }
    };
    const handleSave = () => {
        if (!module.name || !module.slug) {
            alert("Both name and slug are required");
            return;
        }
        axios.post(`/admin/lessons/${courseId}/module`, module).then((response) => {
            resetData(response.data.lessons);
            setModule({ name: "", slug: "" });
            setIsOpen(false);
        }).catch((error) => {
            console.error("Error adding module:", error);
            alert("Failed to add module");
        });
    };
    const handleCancel = () => {
        setModule({ name: "", slug: "" });
        setIsOpen(false);
    };
    return (
        <>
            <button className="btn btn-info cus_info_btn" onClick={() => setIsOpen(true)}>
                Add new module
            </button>
            {isOpen && (
                <div className="modal" style={modalStyle}>
                    <div className="modal-content" style={modalContentStyle}>
                        <h4>Create New Module</h4>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" placeholder="Module name..."
                                value={module.name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Slug</label>
                            <input type="text" className="form-control" name="slug"value={module.slug} placeholder="Slug..." 
                                onChange={handleInputChange}/>
                        </div>
                        <div className="modal-footer" style={{ marginTop: "20px" }}>
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancel} style={{ marginLeft: "10px" }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const ShowLessons = ({ lessons, parentId = null, level = '', onDelete }) => {
    let moduleIndex = 1;
    let lessonIndex = 1;
    return lessons.filter(lesson => lesson.parent_id == parentId)
        .map(lesson => (
            <React.Fragment key={lesson.id}>
                <tr>
                    {lesson.parent_id === null ? (
                        <>
                            <td className="text-left module-item">
                                Module {moduleIndex++}: {level}{lesson.name}
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{new Date(lesson.created_at).toLocaleDateString()}</td>
                            <td>
                                <Link  className="btn btn-primary btn-sm" to={`/admin/lessons/${lesson.course_id}/create?module=${lesson.id}`}>
                                    Add more lesson
                                </Link>
                            </td>
                            <td>
                                <Link>
                                    <i className="fa fa-edit"></i>
                                </Link>
                            </td>
                            <td>
                                <Link onClick={(e) => onDelete(e, lesson.id)}>
                                    <i className="fa fa-trash"></i>
                                </Link>
                            </td>
                        </>
                    ) : (
                        <>
                            <td className="text-left lesson-item">
                                {level}Lesson {lessonIndex++}: {lesson.name}
                            </td>
                            <td>
                                {lesson.is_trial === 0 ? (
                                    <span className="badge bg-warning">No</span>
                                ) : (
                                    <span className="badge bg-success">Yes</span>
                                )}
                            </td>
                            <td>{lesson.views || 0}</td>
                            <td>{getTimeDuration(lesson.durations)}</td>
                            <td>{new Date(lesson.created_at).toLocaleDateString()}</td>
                            <td></td>
                            <td>
                                <Link>
                                    <i className="fa fa-edit"></i>
                                </Link>
                            </td>
                            <td>
                                <Link onClick={(e) => onDelete(e, lesson.id)}>
                                    <i className="fa fa-trash"></i>
                                </Link>
                            </td>
                        </>
                    )}
                </tr>
                <ShowLessons
                    lessons={lessons}
                    parentId={lesson.id}
                    level={level + '->| '}
                    onDelete={onDelete}
                />
            </React.Fragment>
        ));
};
export const ShowLessonOptionLevel = ({ lessons, parentId = null, level = "" }) => {
    if (!Array.isArray(lessons)) {
        return null;
    }
    return lessons
        .filter((lesson) => lesson.parent_id === parentId) // Loại bỏ lesson hiện tại
        .map((lesson) => (
            <React.Fragment key={lesson.id}>
                <option value={lesson.id}>
                    {level}{lesson.name}
                </option>
                <ShowLessonOptionLevel
                    lessons={lessons}
                    parentId={lesson.id}
                    level={level + "|- "}
                />
            </React.Fragment>
        ));
};

const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};
const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};