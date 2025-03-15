const Banner = () => {
  return (
    <section className="banner">
      <div className="container padding">
        <div className="row">
          {/* Banner Left */}
          <div className="d-none d-md-block col-md-4 col-lg-3" style={{ height: "400px" }}>
            <div className="banner-left">
              <div className="course-group">
                <p>Key Features of ATX</p>
                <ul>
                  <li><a href="#">Real-world exposure</a></li>
                  <li><a href="#">Identify strengths and weaknesses</a></li>
                  <li><a href="#">Showcase yourself</a></li>
                  <li><a href="#">Improve coding mindset</a></li>
                  <li><a href="#">Algorithm knowledge</a></li>
                  <li><a href="#">Interview skills</a></li>
                  <li><a href="#">Learn more</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Banner Slider */}
          <div className="col-12 col-md-8 col-lg-6" style={{ height: "400px" }}>
            <div className="banner-slider">
              <div className="banner-slider-inner">
                <img src="images/client/slider-3.jpeg" alt="Banner Slider" />
              </div>
            </div>
          </div>

          {/* Banner Right */}
          <div className="d-none d-lg-block col-lg-3" style={{ height: "400px" }}>
            <div className="banner-right">
              <div className="banner-right__img">
                <img src="images/client/ai.jpg" alt="AI" />
              </div>
              <div className="banner-right__img">
                <img src="images/client/mobile.jpg" alt="Mobile" />
              </div>
              <div className="banner-right__img">
                <img src="images/client/web.jpg" alt="Web" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
