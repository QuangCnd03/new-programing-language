import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { useStudentProfile } from "../hook/hook";
import ModuleAndLesson from "../components/course/ModuleAndLesson";

const Lesson = () => {
  const { lessonSlug } = useParams();
  const [course, setCourse] = useState({
    lessons: [],
    lesson: {
      name: '',
      video: {
        url: ''
      },
      document: null
    }
  });
  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' hoặc 'document'
  const student = useStudentProfile();
  useEffect(() => {
    axios.get(`/lesson/${lessonSlug}`).then((response) => {
      console.log(response.data.course);
      setCourse(response.data.course);
    });
  }, [lessonSlug]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <section className="video">
        <div className="container">
          <h3>{course.lesson?.name || 'Loading...'}</h3>
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="video-detail">
                {course.lesson?.video?.url ? (
                  <iframe
                    width="100%"
                    height="515"
                    src={"http://localhost:8000" + course.lesson.video.url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
                ) : (
                  <div className="text-center py-5">
                    <p>No video available</p>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between mt-3">
                <p className="prev">Quay lại</p>
                <p className="next">Tiếp theo</p>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="nav flex">
                <p 
                  className={`lesson ${activeTab === 'lesson' ? 'active' : ''}`}
                  onClick={() => handleTabClick('lesson')}
                  style={{ cursor: 'pointer' }}
                >
                  Lesson
                </p>
                <p 
                  className={`document ${activeTab === 'document' ? 'active' : ''}`}
                  onClick={() => handleTabClick('document')}
                  style={{ cursor: 'pointer' }}
                >
                  Document
                </p>
              </div>
              <div className="group">
                <div className={`accordion ${activeTab === 'lesson' ? 'active' : ''} title`}>
                  <ModuleAndLesson course={course} student={student} />
                </div>
                <div className={`document-title title ${activeTab === 'document' ? 'active' : ''}`}>
                  {course.lesson?.document ? (
                    <ul className="list-group mt-2">
                      <li className="list-group-item">
                        <Link to={"http://localhost:8000" + course.lesson.document.url} target="_blank">
                          {course.lesson.document.name}
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <p>No document</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Lesson;