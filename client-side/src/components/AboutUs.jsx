import React from "react";

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="text">
              <a href="#">Go to website</a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mt-3 mt-md-0">
            <div className="text">
              <a href="#">Go to facebook</a>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-md-12 mt-3 mt-lg-0">
            <div className="text">
              <a href="#">Go to youtube</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
