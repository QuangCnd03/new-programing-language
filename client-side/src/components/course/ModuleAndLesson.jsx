import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getTimeDuration } from "../../hook/hook";

const ModuleAndLesson = ({ course, student }) => {
  const [activeModule, setActiveModule] = useState(0);
  const modules = (course.lessons || [])
    .filter((lesson) => lesson.parent_id === null)
    .sort((a, b) => (a.position || 0) - (b.position || 0));

  const lessons = (course.lessons || [])
    .filter((lesson) => lesson.parent_id !== null)
    .sort((a, b) => (a.position || 0) - (b.position || 0));

  const toggleModule = (index) => {
    setActiveModule(activeModule === index ? null : index);
  };

  return (
    <>
      {modules.length > 0 ? (
        modules.map((module, index) => (
          <div className="accordion-group" key={module.id}>
            <h4
              className={`accordion-title ${activeModule === index ? "active" : ""}`}
              onClick={() => toggleModule(index)}
            >
              Module {index + 1}: {module.name}
            </h4>
            <div
              className="accordion-detail"
              style={{ display: activeModule === index ? "block" : "none" }}
            >
              {lessons
                .filter((lesson) => lesson.parent_id === module.id)
                .map((lesson, lessonIndex) => (
                  <div className="card-accordion" key={lesson.id}>
                    <div>
                      <i className="fa-brands fa-youtube pe-2"></i>
                      {student ? (
                        course.isMyCourse ? (
                          <a
                            className="text-dark"
                            href={`/lesson/${lesson.slug}`}
                          >
                            Lesson {lessonIndex + 1}: {lesson.name}
                          </a>
                        ) : (
                          <Link className="text-dark">
                            Lesson {lessonIndex + 1}: {lesson.name}
                          </Link>
                        )
                      ) : (
                        <Link className="text-dark" onClick={(e) => { e.preventDefault(); alert("Please login to your account!");}}>
                          Lesson {lessonIndex + 1}: {lesson.name}
                        </Link>
                      )}
                      {lesson.is_trial === 1 && (
                        <p className="is_trial" onClick={() => window.location.href = `/lesson/${lesson.slug}`}>
                          Trial
                        </p>
                      )}
                      <span>{getTimeDuration(lesson.durations)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      ) : (
        <p>No modules found for this course.</p>
      )}
    </>
  );
};

export default ModuleAndLesson;