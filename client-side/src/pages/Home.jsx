import { use, useEffect, useState } from "react";
import Banner from "../components/Banner";
import Question from "../components/Question";
import Partner from "../components/Partner";
import AboutUs from "../components/AboutUs";
import axios from "../../axiosConfig";
import { formatPrice, getTimeDuration } from "../hook/hook";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const CourseCard = ({ course, isMyCourse = false }) => {
  return (
    <Link to={`/course-detail/${course.slug}`} onClick={() => window.scrollTo(0, 0)} className="course-card">
      <div className="course-image">
        <img src={course.thumbnail} alt={course.name} />
        {!isMyCourse && course.sale_price > 0 && (
          <div className="sale-badge">Sale</div>
        )}
      </div>
      <div className="course-content">
        <div className="course-stats">
          <span><i className="fa-solid fa-clock"></i> {getTimeDuration(course.durations)}</span>
          <span><i className="fa-solid fa-video"></i> {course.module}/{course.lesson}</span>
          <span><i className="fa-solid fa-eye"></i> {course.view}</span>
        </div>
        <h5 className="course-title">
          {course.name}
        </h5>
        <div className="course-teacher">
          <img src={course.teacher_image} alt={course.teacher_name} />
          <span>{course.teacher_name}</span>
        </div>
        {!isMyCourse ? (
          <div className="course-price">
            {course.sale_price > 0 ? (
              <>
                <span className="original-price">{formatPrice(course.price)}</span>
                <span className="sale-price">{formatPrice(course.sale_price)}</span>
              </>
            ) : (
              <span className="price">{formatPrice(course.price)}</span>
            )}
          </div>
        ) : (
          <div className="course-price">
            <span className="my-course-badge">
              <i className="fa-solid fa-check"></i> Owned
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

const Home = () => {
  const [basicCourse, setBasicCourse] = useState([]);
  const [advancedCourse, setAdvancedCourse] = useState([]);
  const [mycourses, setMycourses] = useState([]);

  useEffect(() => {
    axios.get("/courses").then((response) => {
      setMycourses(response.data.mycourses ?? []);
      const availableCourses = response.data.courses.filter(course => 
        !response.data.mycourses.some(myCourse => myCourse.id === course.id)
      );
      setBasicCourse(availableCourses.filter((course) => course.levels === 0));
      setAdvancedCourse(availableCourses.filter((course) => course.levels === 1));
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <Banner />
      {mycourses.length > 0 && (
        <section className="courses-section my-courses">
          <div className="container padding">
            <h3 className="section-title">My Courses</h3>
            <div className="courses-grid">
              {mycourses.map((course, index) => (
                <CourseCard key={index} course={course} isMyCourse={true} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {basicCourse.length > 0 && (
        <section className="courses-section basic-courses">
          <div className="container padding">
            <h3 className="section-title">Basic Courses</h3>
            <div className="courses-grid">
              {basicCourse.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {advancedCourse.length > 0 && (
        <section className="courses-section advanced-courses">
          <div className="container padding">
            <h3 className="section-title">Advanced Courses</h3>
            <div className="courses-grid">
              {advancedCourse.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Question />
      <Partner />
      <AboutUs />
    </>
  );
};

export default Home;
