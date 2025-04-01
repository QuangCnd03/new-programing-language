import React from "react";

const Question = () => {
  return (
    <section className="question">
      <div className="container padding">
        <h3>Why Choose ATX for Your Learning Journey</h3>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="group">
              <div className="group-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <div className="group-title">
                <p>Training Since 2017</p>
                <ul>
                  <li>4 years of experience in Offline + Zoom training</li>
                  <li>Over 50 classes with 1,086 students and 14 companies</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="group">
              <div className="group-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <div className="group-title">
                <p>Expert Instructors</p>
                <ul>
                  <li>Experienced professionals in the industry</li>
                  <li>Dedicated to student success and learning outcomes</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="group">
              <div className="group-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <div className="group-title">
                <p>Practical Learning</p>
                <ul>
                  <li>Hands-on projects and real-world applications</li>
                  <li>Industry-standard tools and technologies</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="group">
              <div className="group-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <div className="group-title">
                <p>Career Support</p>
                <ul>
                  <li>Career guidance and job placement assistance</li>
                  <li>Industry connections and networking opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Question;
