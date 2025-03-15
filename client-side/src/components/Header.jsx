import Cookies from "js-cookie";
import { getProfile } from "../utils/utils";
import { useEffect, useState } from "react";
const Header = () => {
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      getProfile(token).then((data) => {
        setUser(data);
      });
    }
    console.log();
    
  }, []);
  
  
  return (
    <header className="header">
      <div className="action-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="d-none d-lg-block col-lg-8">
              <div className="d-flex">
                <p className="slogan">
                  <i className="fas fa-phone"></i>Tư vấn & hỗ trợ:
                  <a href="#">0123456789</a>
                </p>
                <p className="mail">
                  <i className="far fa-envelope"></i>
                  <a href="#">mquang1712003@gmail.com</a>
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="social">
                {user ? (
                  <>
                    <a className="btn btn-primary text-white" href="#">
                      <i className="fas fa-user"></i> Hi! {user.fullname}
                    </a>
                    <a
                      className="btn btn-primary text-white"
                      style={{ marginLeft: "10px" }}
                      href="/sign-in"
                      onClick={() => {
                        Cookies.remove("token"); // Xóa token khi logout
                      }}
                    >
                      <i className="fas fa-key"></i> Logout
                    </a>
                  </>
                ) : (
                  <>
                    <a className="btn btn-primary text-white" href="/sign-up">
                      <i className="fas fa-user"></i> Sign up
                    </a>
                    <a
                      className="btn btn-primary text-white"
                      style={{ marginLeft: "10px" }}
                      href="/sign-in"
                    >
                      <i className="fas fa-key"></i> Sign in
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="/images/client/page-logo.png"
              style={{ height: "3rem" }}
              alt=""
            />
          </a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  <i className="fas fa-home"></i>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-tv"></i>
                  New Courses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-route"></i>
                  Map
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-globe-europe"></i>
                  Knowledge
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-star"></i>
                  Tuyển dụng
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-broadcast-tower"></i>
                  CTV
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fas fa-user"></i>
                  DSCons
                </a>
              </li> */}
            </ul>
          </div>
          <p className="cart">
            <a href="">
              <i className="fas fa-shopping-cart"></i>
            </a>
            <span className="item-count">0</span>
          </p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
