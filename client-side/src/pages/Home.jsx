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
  useEffect(() => {
    axios.get("/courses").then((response) => {
        setBasicCourse(response.data.courses.filter((course) => course.levels === 0) ?? null);
        setAdvancedCourse(response.data.courses.filter((course) => course.levels === 1) ?? null);
      }).catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Banner />
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
                            <i className="fa-solid fa-clock"></i>{getTimeDuration(course.durations)} học
                          </p>
                          <p>
                            <i className="fa-solid fa-video"></i>{course.module} phần/{course.lesson} bài
                          </p>
                          <p>
                            <i className="fa-solid fa-eye"></i>{course.view}
                          </p>
                        </div>
                        <h5 className="descreption-title">
                          <Link to={`/course-detail/${course.slug}`} >
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
                            <i className="fa-solid fa-clock"></i>{getTimeDuration(course.durations)} học
                          </p>
                          <p>
                            <i className="fa-solid fa-video"></i>{course.module} phần/{course.lesson} bài
                          </p>
                          <p>
                            <i className="fa-solid fa-eye"></i>{course.view}
                          </p>
                        </div>
                        <h5 className="descreption-title">
                          <Link to={`/course-detail/${course.slug}`} >
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
