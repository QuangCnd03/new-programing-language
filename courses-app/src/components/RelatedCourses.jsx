const RelatedCourses = () => {
  return (
    <section className="all-course" style={{ backgroundColor: "#e3ebed", paddingBottom: "30px"}}>
      <div className="container">
      <h3 style={{paddingTop: "30px"}}>Khóa học liên quan</h3>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="d-flex course">
              <div className="banner-course">
                <img src="images/client/javascript.jpg" alt="" />
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
                    Kiểm soát mô hình 3D ngay trên Điện thoại - Máy tính
                  </a>
                </h5>
                <div className="descreption-teacher">
                  <img src="images/client/course-teacher.png" alt="" />
                  <span>Nguyễn Chí Ngọc</span>
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
                <img src="images/client/javascript.jpg" alt="" />
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
                    Kiểm soát mô hình 3D ngay trên Điện thoại - Máy tính
                  </a>
                </h5>
                <div className="descreption-teacher">
                  <img src="images/client/course-teacher.png" alt="" />
                  <span>Nguyễn Chí Ngọc</span>
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
  );
};

export default RelatedCourses;
