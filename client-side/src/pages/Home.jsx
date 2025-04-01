import { use, useEffect, useState } from "react";
import Banner from "../components/Banner";
import Question from "../components/Question";
import Partner from "../components/Partner";
import AboutUs from "../components/AboutUs";
import axios from "../../axiosConfig";
import { formatPrice, getTimeDuration } from "../hook/hook";
import { Link } from "react-router-dom";
const Home = () => {
  const [basicCourse, setBasicCourse] = useState([]);
  const [advancedCourse, setAdvancedCourse] = useState([]);
  const [mycourses, setMycourses] = useState([]);
  useEffect(() => {
    axios.get("/courses").then((response) => {
      setMycourses(response.data.mycourses ?? []);
      
      // Lọc ra các khóa học không có trong myCourses
      const availableCourses = response.data.courses.filter(course => 
        !response.data.mycourses.some(myCourse => myCourse.id === course.id)
      );
      
      // Phân loại các khóa học có sẵn thành basic và advanced
      setBasicCourse(availableCourses.filter((course) => course.levels === 0));
      setAdvancedCourse(availableCourses.filter((course) => course.levels === 1));
      }).catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Banner />
      {mycourses && (
        <section className="foundation-course">
          <div className="container padding">
            <h3 style={{backgroundColor: "red", color: "white"}}>My courses</h3>
            <div className="row">
              {mycourses.map((course, index) => (
                  <div className="col-12 col-lg-6" key={index}>
                    <div className="d-flex course">
                      <div className="banner-course" style={{width: "300px", height: "170px"}}>
                        <img src={course.thumbnail} alt={course.name} style={{width: "300px", height: "170px"}}/>
                      </div>
                      <div className="descreption-course">
                        <div className="descreption-top">
                          <p>
                            <i className="fa-solid fa-clock"></i>{getTimeDuration(course.durations)} h
                          </p>
                          <p>
                            <i className="fa-solid fa-video"></i>{course.module} parts/{course.lesson} lessons
                          </p>
                          <p>
                            <i className="fa-solid fa-eye"></i>{course.view}
                          </p>
                        </div>
                        <h5 className="descreption-title">
                          <Link to={`/course-detail/${course.slug}`} onClick={() => window.scrollTo(0, 0)} >
                            {course.name}
                          </Link>
                        </h5>
                        <div className="descreption-teacher">
                          <img  src={course.teacher_image} alt={course.name} />
                          <span>{course.teacher_name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
      {basicCourse && (
        <section className="foundation-course">
          <div className="container padding">
            <h3>Basic course</h3>
            <div className="row">
              {basicCourse.map((course, index) => (
                  <div className="col-12 col-lg-6" key={index}>
                    <div className="d-flex course">
                      <div className="banner-course" style={{width: "370px", height: "240px"}}>
                        <img src={course.thumbnail} alt={course.name}/>
                      </div>
                      <div className="descreption-course">
                        <div className="descreption-top">
                          <p>
                            <i className="fa-solid fa-clock"></i>{getTimeDuration(course.durations)} h
                          </p>
                          <p>
                            <i className="fa-solid fa-video"></i>{course.module} parts/{course.lesson} lessons
                          </p>
                          <p>
                            <i className="fa-solid fa-eye"></i>{course.view}
                          </p>
                        </div>
                        <h5 className="descreption-title">
                          <Link to={`/course-detail/${course.slug}`} onClick={() => window.scrollTo(0, 0)} >
                            {course.name}
                          </Link>
                        </h5>
                        <div className="descreption-teacher">
                          <img  src={course.teacher_image} alt={course.name} />
                          <span>{course.teacher_name}</span>
                        </div>
                        <p className="descreption-price">
                          {course.sale_price > 0 ? (
                            <>
                              <span className="sale">{formatPrice(course.price)}</span>
                              <span>{formatPrice(course.sale_price)}</span>
                            </>
                          ) : (
                            <span>{formatPrice(course.price)}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
      {advancedCourse && (
        <section className="foundation-course">
          <div className="container padding">
            <h3>Advance course</h3>
            <div className="row">
              {advancedCourse
                .map((course, index) => (
                  <div className="col-12 col-lg-6" key={index}>
                    <div className="d-flex course">
                      <div className="banner-course" style={{width: "370px", height: "240px"}}>
                        <img src={course.thumbnail} alt={course.name} style={{width: "370px", height: "240px"}}/>
                      </div>
                      <div className="descreption-course">
                        <div className="descreption-top">
                          <p>
                            <i className="fa-solid fa-clock"></i>{getTimeDuration(course.durations)} h
                          </p>
                          <p>
                            <i className="fa-solid fa-video"></i>{course.module} parts/{course.lesson} lessons
                          </p>
                          <p>
                            <i className="fa-solid fa-eye"></i>{course.view}
                          </p>
                        </div>
                        <h5 className="descreption-title">
                          <Link to={`/course-detail/${course.slug}`} onClick={() => window.scrollTo(0, 0)} >
                            {course.name}
                          </Link>
                        </h5>
                        <div className="descreption-teacher">
                          <img  src={course.teacher_image} alt={course.name} />
                          <span>{course.teacher_name}</span>
                        </div>
                        <p className="descreption-price">
                          {course.sale_price > 0 ? (
                            <>
                              <span className="sale">{formatPrice(course.price)}</span>
                              <span>{formatPrice(course.sale_price)}</span>
                            </>
                          ) : (
                            <span>{formatPrice(course.price)}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
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
