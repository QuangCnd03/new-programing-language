import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { formatPrice, getTimeDuration, useStudentProfile } from "../hook/hook";
import ModuleAndLesson from "../components/course/ModuleAndLesson";
import Swal from "sweetalert2";
import { useCart } from "../components/cart/CartContext";

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
  console.log(course);
  
  useEffect(() => {
    axios.get(`/courses/${courselug}`).then((response) => {
      setCourse(response.data.course);
    })
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
    <section className="course-detal">
      <div className="container">
        <div className="row relative">
          <div className="col-12 col-lg-9">
            <div className="submenu">
              <ul>
                <li>
                  <a href="#information">
                    <i className="fa-solid fa-file"></i> Information
                  </a>
                </li>
                <li>
                  <a href="#curriculum">
                    <i className="fa-solid fa-book"></i>
                    Document
                  </a>
                </li>
                <li>
                  <a href="#author">
                    <i className="fa-solid fa-user"></i>
                    Teacher
                  </a>
                </li>
                <li>
                </li>
              </ul>
            </div>
            <div className="course-descreption" id="information">
              <div className="course-content">
                <h4>Course Content</h4>
                <p className="course-content-infor">
                  With a duration of 41 videos, this course is built based on the real-world
                  project implemented by DSCons. Students will receive comprehensive
                  guidance and hands-on practice in creating architectural animation using
                  Lumion software combined with professional Premiere Pro. The main skills
                  include:
                </p>
                <ul>
                  <li>Installation, interface, and operations for beginners.</li>
                  <li>Importing Revit MEP models into the Lumion environment.</li>
                  <li>
                    Assigning materials to architectural, structural, and MEP objects to
                    support image and video rendering.
                  </li>
                  <li>
                    Creating terrain, placing human models, trees, etc., to enhance
                    realism.
                  </li>
                  <li>Capturing images, composing, and preparing animation content.</li>
                  <li>Post-processing videos before finalizing the product.</li>
                  <li>Integrating text, logos, music, and professional effects.</li>
                </ul>
              </div>
              <div className="course-content">
                <h4>Course Benefits</h4>
                <p className="course-content-infor">
                  From a project that exists only in drawings, Lumion and Premiere Pro will
                  provide viewers with a comprehensive and detailed perspective of the
                  project. Thanks to 3D visualizations and animated sequences, it becomes
                  easier to present ideas and impress even the most demanding investors and
                  audiences. The key benefits of this course include:
                </p>
                <ul>
                  <li>Installation, interface, and operations for beginners.</li>
                  <li>Importing Revit MEP models into the Lumion environment.</li>
                  <li>
                    Assigning materials to architectural, structural, and MEP objects to
                    support image and video rendering.
                  </li>
                  <li>
                    Creating terrain, placing human models, trees, etc., to enhance
                    realism.
                  </li>
                  <li>Capturing images, composing, and preparing animation content.</li>
                  <li>Post-processing videos before finalizing the product.</li>
                  <li>Integrating text, logos, music, and professional effects.</li>
                </ul>
              </div>
              <div className="course-content">
                <h4>Who Should Take This Course?</h4>
                <p className="course-content-infor">
                  From a project that exists only in drawings, Lumion and Premiere Pro will
                  provide viewers with a comprehensive and detailed perspective of the
                  project. Thanks to 3D visualizations and animated sequences, it becomes
                  easier to present ideas and impress even the most demanding investors and
                  audiences. The key benefits of this course include:
                </p>
                <ul>
                  <li>Installation, interface, and operations for beginners.</li>
                  <li>Importing Revit MEP models into the Lumion environment.</li>
                  <li>
                    Assigning materials to architectural, structural, and MEP objects to
                    support image and video rendering.
                  </li>
                  <li>
                    Creating terrain, placing human models, trees, etc., to enhance
                    realism.
                  </li>
                  <li>Capturing images, composing, and preparing animation content.</li>
                  <li>Post-processing videos before finalizing the product.</li>
                  <li>Integrating text, logos, music, and professional effects.</li>
                </ul>
              </div>
            </div>

            <div className="accordion" id="curriculum">
              <div className="accordion-top">
                <p>
                  <i className="fa-solid fa-book me-1"></i>
                  Includes {course.moduleQuantity} parts / {course.lessonQuantity} lessons
                </p>
                <p>
                  <i className="fa-solid fa-clock me-1"></i>
                  Duration: {getTimeDuration(course.durations)} h
                </p>
              </div>
              < ModuleAndLesson course={course} student={student} />
            </div>
            <div className="course-video mb-4" id="author">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img src={course.teacher_image} alt={course.name} className="rounded-circle" style={{width: "80px"}} />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h4 className="mt-2"><a href="/giang-vien/{{$course->teacher->slug}}">{course.teacher_name}</a></h4>
                  </div>
                </div>
                <p className="course-content-infor mt-3">
                  {course.teacher_description}
                </p>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="course-profile">
              <div className="img">
                <img src={course.thumbnail} alt={course.name} />
              </div>
              <div className="group-text">
                <p className="price">
                  <i className="fa-solid fa-tag"></i>
                    {course.sale_price > 0 ? (
                      <>
                        <span className="sale">{formatPrice(course.price)}</span>
                        <span>{formatPrice(course.sale_price)}</span>
                      </>
                      ) : (
                        <span>{formatPrice(course.price)}</span>
                      )}
                </p>
                <p className="bookmark">
                  <i className="fa-solid fa-bookmark"></i>
                  Course ID: {course.code}
                </p>
                <p className="chart">
                  <i className="fa-solid fa-chart-simple"></i>
                  Level: {course.levels == 0 ? "Basic Course" : "Advance Course"}
                </p>
                <p className="techer">
                  <i className="fa-solid fa-user"></i>
                  Teacher: {course.exp} Experience
                </p>
                <p className="clock">
                  <i className="fa-solid fa-clock"></i>
                  Duration: {getTimeDuration(course.durations)}
                </p>
                {course.isMyCourse ? (
                  <button className="payment" style={{backgroundColor: "red"}} onClick={enterCourse}>Enter course</button>
                ) : (
                  <button className="payment" onClick={ !student ? () => alert("Please login to your account!") : handleOrder }>Order course</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* <RelatedCourses /> */}
    </>
  );
};

export default CourseDetail;
