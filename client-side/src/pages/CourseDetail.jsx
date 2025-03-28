import { useParams } from "react-router-dom";
import RelatedCourses from "../components/RelatedCourses";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { formatPrice, getTimeDuration } from "../hook/hook";
const CourseDetail = () => {

  const { courselug } = useParams();
  const [course, setCourse] = useState({
    name: "",
    price: 0,
    sale_price: 0,
    detail: "",
    slug: "",
    code: "",
    durations: 0,
    module: 0,
    lesson: 0,
    support: "",
    thumbnail: "",
    levels: 0,
    teacher_name: "",
    exp: 0,
    teacher_image: "",
    teacher_description: "",
  });

  useEffect(() => {
    axios.get(`/courses/${courselug}`).then((response) => {
      setCourse(response.data.course);
      console.log(response.data.course);

    })
  }, [courselug]);
  console.log(course);
  
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
                  <a href="#evaluate">
                    <i className="fa-solid fa-comment"></i>
                    Rating
                  </a>
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
                  Includes {course.module} parts / {course.lesson} lessons
                </p>
                <p>
                  <i className="fa-solid fa-clock me-1"></i>
                  Duration: {getTimeDuration(course.durations)} h
                </p>
              </div>

              <div className="accordion-group">
                <h4 className="accordion-title">Section 1</h4>
                <div className="accordion-detail">
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 1: title
                      <span>time</span>
                    </div>
                  </div>
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 2: title
                      <span>time</span>
                    </div>
                  </div>
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 3: title
                      <span>time</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-group">
                <h4 className="accordion-title">Section 2</h4>
                <div className="accordion-detail">
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 1: title
                      <span>time</span>
                    </div>
                  </div>
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 2: title
                      <span>time</span>
                    </div>
                  </div>
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 3: title
                      <span>time</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-group">
                <h4 className="accordion-title">Section 3</h4>
                <div className="accordion-detail">
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 1: title
                      <span>time</span>
                    </div>
                  </div>
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 2: title
                      <span>time</span>
                    </div>
                  </div>
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 3: title
                      <span>time</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-group">
                <h4 className="accordion-title">Section 4</h4>
                <div className="accordion-detail">
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 1: title
                      <span>time</span>
                    </div>
                  </div>
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 2: title
                      <span>time</span>
                    </div>
                  </div>
                  <div className="card-accordion">
                    <div>
                      <i className="fa-brands fa-youtube"></i>
                      <p>học thử</p>
                      Bài 3: title
                      <span>time</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="course-video mb-4" id="author">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img src={course.teacher_image} alt="" className="rounded-circle" style={{width: "80px"}} />
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
                <button className="payment">Order course</button>
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
