import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useParams } from "react-router-dom";
import { handleErrorMsg, handleSlug, usePageTitle } from "../../hooks/hook";
import { ShowLessonOptionLevel } from "../../components/lesson/Lesson";

const Edit = () => {
    usePageTitle("Update Lesson");
    const { lessonId } = useParams();
    const [courseId, setCourseId] = useState(null);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [lessons, setLessons] = useState([]);
    const [lessonDetail, setLessonDetail] = useState({
        name: "",
        slug: "",
        parent_id: null,
        is_trial: 0,
        status: 1,
        video: "",
        video_id: null,
        document: "",
        document_id: null,
        description: "",
        course_id: null,
        currentVideo: null,
        currentDocument: null,
    });

    useEffect(() => {
        if(lessonId) {
            axios.get(`/admin/lessons/edit/${lessonId}`).then((response) => {
              const lesson = response.data.lesson;
                setLessonDetail({
                  name: lesson.name,
                  slug: lesson.slug,
                  parent_id: lesson.parent_id,
                  is_trial: lesson.is_trial,
                  status: lesson.status,
                  video: lesson.video.name,
                  video_id: lesson.video.id,
                  document: lesson.document.name,
                  document_id: lesson.document.id,
                  description: lesson.description,
                  course_id: lesson.course_id,
                  currentVideo: null,
                  currentDocument: null,
                })
                setCourseId(response.data.lesson.course_id);
            }).catch((error) => {
                console.error("Fetching lesson", error);
            });
        }
        if(courseId) {
          axios.get(`/admin/lessons/${courseId}`).then((response) => {
              setLessons(response.data.lessons);
          }).catch((error) => {
              console.error("Fetching lessons:", error);
          });
      }
    }, [lessonId, courseId]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
          setLessonDetail({
            ...lessonDetail,
            [name]: value,
            slug: handleSlug(value),
        });
        } else {
        setLessonDetail({ ...lessonDetail, [name]: value });
        }
    };
    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setLessonDetail({ ...lessonDetail, [name]: file });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', lessonDetail.name);
        formData.append('slug', lessonDetail.slug);
        formData.append('parent_id', lessonDetail.parent_id);
        formData.append('is_trial', lessonDetail.is_trial);
        formData.append('status', lessonDetail.status);
        formData.append('description', lessonDetail.description);
        formData.append('course_id', lessonDetail.course_id);
        formData.append('document', lessonDetail.document);
        formData.append('document_id', lessonDetail.document_id);
        formData.append('video', lessonDetail.video);
        formData.append('video_id', lessonDetail.video_id);
        if(lessonDetail.currentVideo) {
            formData.append('currentVideo', lessonDetail.currentVideo);
        }
        if(lessonDetail.currentDocument) {
            formData.append('currentDocument', lessonDetail.currentDocument);
        }
        axios.post(`/admin/lessons/edit/${lessonId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((responese) => {
          setError("");
          setMsg(responese.data.message);
        }).catch((error) => {
          setMsg("");
          const { errors } = error.response.data;
          setError(handleErrorMsg(errors));
      });
        
    };

  return (
    <div>
      {msg && <div className="alert alert-success text-center">{msg}</div>}
      {error && (
        <div
          className="alert alert-danger text-center"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {error}
        </div>
      )}
      <div className="row">
        <div className="col">
          <p>
            <Link to={`/admin/lessons/${courseId}`} className="btn btn-success btn-sm cus_success_btn">
              Go back
            </Link>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} id="form-courses">
        <div className="row" id="lesson-form">
          <div className="col-6 mb-3 group-control">
            <label style={{ fontWeight: 700 }}>Name</label>
            <input type="text" className="form-control" name="name" value={lessonDetail.name} placeholder="Enter lesson name ..."
              onChange={handleInputChange}/>
          </div>
          <div className="col-6 mb-3 group-control">
            <label style={{ fontWeight: 700 }}>Slug</label>
            <input  type="text" className="form-control" name="slug" value={lessonDetail.slug} placeholder="Enter slug"
              onChange={handleInputChange}/>
          </div>
          <div className="col-6 mb-3 group-control">
            <label style={{ fontWeight: 700 }}>Module</label>
            <select className="form-control" name="parent_id" value={lessonDetail.parent_id}
              onChange={handleInputChange}>
              <option value="">No</option>
              <ShowLessonOptionLevel lessons={lessons} />
            </select>
          </div>
          <div className="col-3 mb-3 group-control">
            <label style={{ fontWeight: 700 }}>Trial</label>
            <select className="form-control" name="is_trial" value={lessonDetail.is_trial}
              onChange={handleInputChange}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="col-3 mb-3 group-control">
            <label style={{ fontWeight: 700 }}>Status</label>
            <select className="form-control" name="status" value={lessonDetail.status}
              onChange={handleInputChange}>
              <option value="0">Not activated</option>
              <option value="1">Activated</option>
            </select>
          </div>
          <div className="col-6 mb-3">
            <label style={{ fontWeight: 700 }}>Video</label>
            <div className="input-group">
              <input type="text" className="form-control" 
                value={ lessonDetail.currentVideo !== null ? (lessonDetail.currentVideo.name || lessonDetail.currentDocument) : lessonDetail.video }
                 placeholder="Video ..." readOnly/>
              <input type="file" name="currentVideo" onChange={handleFileChange} accept="video/*" style={{ display: "none" }} id="video-upload"/>
              <label htmlFor="video-upload" className="btn btn-success">
                Choose
              </label>
            </div>
          </div>
          <div className="col-6 mb-3">
            <label style={{ fontWeight: 700 }}>Document</label>
            <div className="input-group">
              <input type="text" className="form-control" 
                value={ lessonDetail.currentDocument !== null ? (lessonDetail.currentDocument.name || lessonDetail.currentDocument) : lessonDetail.document } 
                placeholder="Document ..." readOnly/>
              <input type="file" name="currentDocument" onChange={handleFileChange} accept=".pdf,.doc,.docx" style={{ display: "none" }} id="document-upload"/>
              <label htmlFor="document-upload" className="btn btn-success">
                Choose
              </label>
            </div>
          </div>
          <div className="col-12 mb-3 group-control">
            <label style={{ fontWeight: 700 }}>Content</label>
            <textarea className="form-control" name="description" value={lessonDetail.description} onChange={handleInputChange} rows="5"/>
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

export default Edit;
