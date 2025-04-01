import { useNavigate, useParams } from "react-router-dom";
import RelatedCourses from "../components/RelatedCourses";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { formatPrice, getTimeDuration, useStudentProfile } from "../hook/hook";
import ModuleAndLesson from "../components/course/ModuleAndLesson";
import Swal from "sweetalert2";
import { useCart } from "../components/cart/CartContext";
import "../styles/CourseDetail.css";

const CourseDetail = () => {
  const student = useStudentProfile();
  const { courselug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [course, setCourse] = useState({
    id: null,
    name: "",
    price: 0,
    sale_price: 0,
    detail: "",
    slug: "",
    code: "",
    durations: 0,
    moduleQuantity: 0,
    lessonQuantity: 0,
    isMyCourse: false,
    support: "",
    thumbnail: "",
    levels: 0,
    lessons: [],
    teacher_name: "",
    exp: 0,
    teacher_image: "",
    teacher_description: "",
  });

  useEffect(() => {
    axios.get(`/courses/${courselug}`).then((response) => {
      setCourse(response.data.course);
    });
  }, [courselug]);

  const enterCourse = (e) => {
    e.preventDefault();
    navigate(`/lesson/${course.lessons[1].slug}`);
  }

  const handleOrder = (e) => {
    e.preventDefault();
    const success = addToCart(course);
    if (success) {
      Swal.fire({
        title: "Added to cart successfully",
        text: course.name + " added to cart",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Enter cart",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/cart");
        }
      });
    }
  }

  return (
    <>
      <section className="course-detail">
        <div className="container">
          <div className="row relative">
            <div className="col-12 col-lg-9">
              <div className="submenu">
                <ul>
                  <li>
                    <a href="#information" className="active">
                      <i className="fa-solid fa-file"></i> Information
                    </a>
                  </li>
                  <li>
                    <a href="#curriculum">
                      <i className="fa-solid fa-book"></i> Curriculum
                    </a>
                  </li>
                  <li>
                    <a href="#author">
                      <i className="fa-solid fa-user"></i> Instructor
                    </a>
                  </li>
                </ul>
              </div>

              <div className="course-description" id="information">
                <div className="course-content">
                  <h4>Course Overview</h4>
                  <p className="course-content-info">
                    This comprehensive course is designed to take you from beginner to advanced level in web development. Through a combination of theoretical concepts and hands-on projects, you'll learn the essential skills needed to build modern, responsive websites. The course covers everything from HTML and CSS fundamentals to advanced JavaScript concepts, React framework, and backend integration. Whether you're a complete beginner or an experienced developer looking to enhance your skills, this course provides a structured learning path with practical examples and real-world projects.
                  </p>
                </div>

                <div className="course-content">
                  <h4>What You'll Learn</h4>
                  <p className="course-content-info">
                    By the end of this course, you'll be able to:
                  </p>
                  <ul className="course-content-info">
                    <li>Build responsive and modern websites using HTML5 and CSS3</li>
                    <li>Master JavaScript fundamentals and advanced concepts</li>
                    <li>Develop dynamic web applications using React.js</li>
                    <li>Implement user authentication and authorization</li>
                    <li>Create RESTful APIs and integrate them with frontend</li>
                    <li>Deploy web applications to production servers</li>
                    <li>Follow best practices for code organization and maintainability</li>
                    <li>Debug and optimize web applications for better performance</li>
                  </ul>
                </div>
              </div>

              <div className="accordion" id="curriculum">
                <div className="accordion-top">
                  <div className="course-stats">
                    <span>
                      <i className="fa-solid fa-book"></i>
                      {course.moduleQuantity} modules / {course.lessonQuantity} lessons
                    </span>
                    <span>
                      <i className="fa-solid fa-clock"></i>
                      {getTimeDuration(course.durations)} hours
                    </span>
                  </div>
                </div>
                <ModuleAndLesson course={course} student={student} />
              </div>

              <div className="teacher-section" id="author">
                <div className="teacher-info">
                  <div className="teacher-avatar">
                    <img src={course.teacher_image} alt={course.teacher_name} />
                  </div>
                  <div className="teacher-details">
                    <h4>{course.teacher_name}</h4>
                    <p className="teacher-exp">
                      <i className="fa-solid fa-star"></i> {course.exp} years of experience
                    </p>
                    <p className="teacher-description">
                      {course.teacher_description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div className="course-profile">
                <div className="course-thumbnail">
                  <img src={course.thumbnail} alt={course.name} />
                  {course.sale_price > 0 && (
                    <div className="sale-badge">Sale</div>
                  )}
                </div>
                <div className="course-info">
                  <div className="price-section">
                    {course.sale_price > 0 ? (
                      <>
                        <span className="original-price">{formatPrice(course.price)}</span>
                        <span className="sale-price">{formatPrice(course.sale_price)}</span>
                      </>
                    ) : (
                      <span className="price">{formatPrice(course.price)}</span>
                    )}
                  </div>
                  <div className="course-meta">
                    <div className="meta-item">
                      <i className="fa-solid fa-hashtag"></i>
                      <span>Course ID: {course.code}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fa-solid fa-signal"></i>
                      <span>{course.levels === 0 ? "Beginner Level" : "Advanced Level"}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fa-solid fa-user"></i>
                      <span>Instructor: {course.teacher_name}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fa-solid fa-clock"></i>
                      <span>{getTimeDuration(course.durations)} hours</span>
                    </div>
                  </div>
                  {course.isMyCourse ? (
                    <button className="enter-course-btn" onClick={enterCourse}>
                      <i className="fa-solid fa-play"></i> Continue Learning
                    </button>
                  ) : (
                    <button 
                      className="order-course-btn" 
                      onClick={!student ? () => alert("Please login to your account!") : handleOrder}
                    >
                      <i className="fa-solid fa-shopping-cart"></i> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedCourses />
    </>
  );
};

export default CourseDetail;
