import React from "react";
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div className="footer-group">
              <h3>Contact</h3>
              <ul>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-mobile"></i>
                    0123456789
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-envelope"></i>
                    mquang1712003@gmail.com
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-house"></i>
                    Hồ Chí Minh
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            <div className="footer-group">
              <h3>Support</h3>
              <ul>
                <li>
                  <a href="#"> Question 1</a>
                </li>
                <li>
                  <a href="#"> Question 2</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            <div className="footer-group">
              <h3>Policy</h3>
              <ul>
                <li>
                  <a href="#">Affiliate</a>
                </li>
                <li>
                  <a href="#">Service</a>
                </li>
                <li>
                  <a href="#">Security</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p>
        Made with
        <span>
          <i className="fa-solid fa-heart"></i>
        </span>
        by MQ
      </p>
    </footer>
  );
};

export default Footer;
