import React from "react";

const Question = () => {
  return (
    <section className="question">
      <div className="container padding">
        <h3>Why Choose ATX Education?</h3>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="group">
              <div className="group-icon">
                <i className="fas fa-history"></i>
              </div>
              <div className="group-title">
                <p>Established Since 2017</p>
                <ul>
                  <li>4 years of experience in both Offline & Online training</li>
                  <li>Over 50 classes with 1086 students and 14 enterprise partners</li>
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
                  <li>Professional teachers with industry experience</li>
                  <li>Practical knowledge and hands-on training approach</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="group">
              <div className="group-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="group-title">
                <p>Career Support</p>
                <ul>
                  <li>Job placement assistance and career guidance</li>
                  <li>Strong network with industry partners</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="group">
              <div className="group-icon">
                <i className="fas fa-book-reader"></i>
              </div>
              <div className="group-title">
                <p>Modern Curriculum</p>
                <ul>
                  <li>Up-to-date content aligned with industry needs</li>
                  <li>Balanced mix of theory and practical projects</li>
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
