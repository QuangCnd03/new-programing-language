import React from "react";
import "../styles/Partner.css";

const Partner = () => {
  return (
    <section className="partner">
      <div className="container">
        <div className="partner-header">
          <h3>Our Enterprise Partners</h3>
          <p>Trusted by leading companies for training and recruitment</p>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-6 col-md-4 col-lg-3">
            <div className="partner-card">
              <div className="partner-img">
                <img src="/images/client/partner.jpeg" alt="Partner Company" />
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="partner-card">
              <div className="partner-img">
                <img src="/images/client/partner.jpeg" alt="Partner Company" />
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="partner-card">
              <div className="partner-img">
                <img src="/images/client/partner.jpeg" alt="Partner Company" />
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <div className="partner-card">
              <div className="partner-img">
                <img src="/images/client/partner.jpeg" alt="Partner Company" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
