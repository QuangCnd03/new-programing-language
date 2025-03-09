import { use, useEffect, useState } from "react";
import Banner from "../components/Banner";
import Question from "../components/Question";
import Partner from "../components/Partner";
import AboutUs from "../components/AboutUs";
const Home = () => {
  useEffect(() => {
    document.title = "Home";
  });

  return (
    <>
      <Banner />
      <section className="foundation-course">
        <div className="container padding">
          <h3>Basic course</h3>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="d-flex course">
                <div className="banner-course">
                  <img src="/images/client/javascript.jpg" alt="" />
                </div>
                <div className="descreption-course">
                  <div className="descreption-top">
                    <p>
                      <i className="fa-solid fa-clock"></i>1,5h học
                    </p>
                    <p>
                      <i className="fa-solid fa-video"></i>4 phần/18 bài
                    </p>
                    <p>
                      <i className="fa-solid fa-eye"></i>1000
                    </p>
                  </div>
                  <h5 className="descreption-title">
                    <a href="#">
                      Javascript cơ bản cho người mới bắt đầu
                    </a>
                  </h5>
                  <div className="descreption-teacher">
                    <img src="/images/client/course-teacher.png" alt="" />
                    <span>Nguyễn Minh Quang</span>
                  </div>
                  <p className="descreption-price">
                    <span className="sale">400.000đ</span>
                    <span>200.000đ</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex course">
                <div className="banner-course">
                  <img src="/images/client/javascript.jpg" alt="" />
                </div>
                <div className="descreption-course">
                  <div className="descreption-top">
                    <p>
                      <i className="fa-solid fa-clock"></i>1,5h học
                    </p>
                    <p>
                      <i className="fa-solid fa-video"></i>4 phần/18 bài
                    </p>
                    <p>
                      <i className="fa-solid fa-eye"></i>1000
                    </p>
                  </div>
                  <h5 className="descreption-title">
                    <a href="#">
                      Javascript cơ bản cho người mới bắt đầu
                    </a>
                  </h5>
                  <div className="descreption-teacher">
                    <img src="/images/client/course-teacher.png" alt="" />
                    <span>Nguyễn Minh Quang</span>
                  </div>
                  <p className="descreption-price">
                    <span className="sale">400.000đ</span>
                    <span>200.000đ</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex course">
                <div className="banner-course">
                  <img src="/images/client/javascript.jpg" alt="" />
                </div>
                <div className="descreption-course">
                  <div className="descreption-top">
                    <p>
                      <i className="fa-solid fa-clock"></i>1,5h học
                    </p>
                    <p>
                      <i className="fa-solid fa-video"></i>4 phần/18 bài
                    </p>
                    <p>
                      <i className="fa-solid fa-eye"></i>1000
                    </p>
                  </div>
                  <h5 className="descreption-title">
                    <a href="#">
                      Javascript cơ bản cho người mới bắt đầu
                    </a>
                  </h5>
                  <div className="descreption-teacher">
                    <img src="/images/client/course-teacher.png" alt="" />
                    <span>Nguyễn Minh Quang</span>
                  </div>
                  <p className="descreption-price">
                    <span className="sale">400.000đ</span>
                    <span>200.000đ</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex course">
                <div className="banner-course">
                  <img src="/images/client/javascript.jpg" alt="" />
                </div>
                <div className="descreption-course">
                  <div className="descreption-top">
                    <p>
                      <i className="fa-solid fa-clock"></i>1,5h học
                    </p>
                    <p>
                      <i className="fa-solid fa-video"></i>4 phần/18 bài
                    </p>
                    <p>
                      <i className="fa-solid fa-eye"></i>1000
                    </p>
                  </div>
                  <h5 className="descreption-title">
                    <a href="#">
                      Javascript cơ bản cho người mới bắt đầu
                    </a>
                  </h5>
                  <div className="descreption-teacher">
                    <img src="/images/client/course-teacher.png" alt="" />
                    <span>Nguyễn Minh Quang</span>
                  </div>
                  <p className="descreption-price">
                    <span className="sale">400.000đ</span>
                    <span>200.000đ</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Question />
      <Partner />
      <AboutUs />
    </>
  );
};

export default Home;
