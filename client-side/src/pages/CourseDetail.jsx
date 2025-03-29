import { useNavigate, useParams } from "react-router-dom";
import RelatedCourses from "../components/RelatedCourses";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { formatPrice, getTimeDuration, useStudentProfile } from "../hook/hook";
import ModuleAndLesson from "../components/course/ModuleAndLesson";
import Swal from "sweetalert2";
const CourseDetail = () => {
  const student = useStudentProfile();
  const { courselug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
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
    })
  }, [courselug]);
  const enterCourse = (e) => {
    e.preventDefault();
    navigate(`/lesson/${course.lessons[1].slug}`)
  }
  const handleOrder = (e) => {
    e.preventDefault();
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
                <h4>nội dung khóa học</h4>
                <p className="course-content-infor">
                  Với thời lượng 41 Video, khóa học được xây dựng dựa trên dự án
                  thực tế DSCons đã triển khai. Học viên sẽ được hướng dẫn bài
                  bản - Thực hành Diễn họa làm phim một công trình bằng phần mềm
                  Lumion kết hợp Premiere Pro chuyên nghiệp. Các kỹ năng chính
                  bao gồm:
                </p>
                <ul>
                  <li>Cài đặt, giao diện, thao tác cho người mới bắt đầu.</li>
                  <li>Đưa mô hình Revit MEP vào trong môi trường Lumion.</li>
                  <li>
                    Gán vật liệu cho các đối tượng kiến trúc, kết cấu, cơ điện
                    để hỗ trợ Render ảnh, phim.
                  </li>
                  <li>
                    Tạo địa hình, đặt các đối tượng người, cây cối…v.v giúp cho
                    công trình có tính thực tế hơn.
                  </li>
                  <li>Chụp ảnh, lên bố cục, nội dung quay video diễn họa.</li>
                  <li>Xử lý hậu kỳ Video trước khi tạo thành phẩm</li>
                  <li>
                    Lồng ghép text và logo, nhạc và hiệu ứng chuyên nghiệp.
                  </li>
                </ul>
              </div>
              <div className="course-content">
                <h4>lợi ích khóa học</h4>
                <p className="course-content-infor">
                  Từ một công trình còn đang trên bản vẽ, Lumion và Premiere Pro
                  sẽ mang đến cho người xem góc nhìn từ tổng quát đến chi tiết
                  của dự án. Nhờ có 3D phối cảnh, các đoạn phim diễn họa chuyển
                  động… Chúng ta sẽ dễ dàng trình chiếu được ý tưởng sản phẩm và
                  chinh phục ngay cả những Chủ đầu tư – Khán giả khó tính nhất.
                  Lợi ích chính thu được trong khóa học như sau:
                </p>
                <ul>
                  <li>Cài đặt, giao diện, thao tác cho người mới bắt đầu.</li>
                  <li>Đưa mô hình Revit MEP vào trong môi trường Lumion.</li>
                  <li>
                    Gán vật liệu cho các đối tượng kiến trúc, kết cấu, cơ điện
                    để hỗ trợ Render ảnh, phim.
                  </li>
                  <li>
                    Tạo địa hình, đặt các đối tượng người, cây cối…v.v giúp cho
                    công trình có tính thực tế hơn.
                  </li>
                  <li>Chụp ảnh, lên bố cục, nội dung quay video diễn họa.</li>
                  <li>Xử lý hậu kỳ Video trước khi tạo thành phẩm</li>
                  <li>
                    Lồng ghép text và logo, nhạc và hiệu ứng chuyên nghiệp.
                  </li>
                </ul>
              </div>
              <div className="course-content">
                <h4>đối tượng nên tham gia khóa học</h4>
                <p className="course-content-infor">
                  Từ một công trình còn đang trên bản vẽ, Lumion và Premiere Pro
                  sẽ mang đến cho người xem góc nhìn từ tổng quát đến chi tiết
                  của dự án. Nhờ có 3D phối cảnh, các đoạn phim diễn họa chuyển
                  động… Chúng ta sẽ dễ dàng trình chiếu được ý tưởng sản phẩm và
                  chinh phục ngay cả những Chủ đầu tư – Khán giả khó tính nhất.
                  Lợi ích chính thu được trong khóa học như sau:
                </p>
                <ul>
                  <li>Cài đặt, giao diện, thao tác cho người mới bắt đầu.</li>
                  <li>Đưa mô hình Revit MEP vào trong môi trường Lumion.</li>
                  <li>
                    Gán vật liệu cho các đối tượng kiến trúc, kết cấu, cơ điện
                    để hỗ trợ Render ảnh, phim.
                  </li>
                  <li>
                    Tạo địa hình, đặt các đối tượng người, cây cối…v.v giúp cho
                    công trình có tính thực tế hơn.
                  </li>
                  <li>Chụp ảnh, lên bố cục, nội dung quay video diễn họa.</li>
                  <li>Xử lý hậu kỳ Video trước khi tạo thành phẩm</li>
                  <li>
                    Lồng ghép text và logo, nhạc và hiệu ứng chuyên nghiệp.
                  </li>
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
    <RelatedCourses />
    </>
  );
};

export default CourseDetail;
