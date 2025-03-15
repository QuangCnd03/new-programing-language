
const Lesson = () => {
  return (
    <>
      <section className="video">
        <div className="container">
          <h3>Title video</h3>
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="video-detail">
                <iframe
                  width="100%"
                  height="515"
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <p className="prev">Quay lại</p>
                <p className="next">Tiếp theo</p>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="nav flex">
                <p className="lesson active">Bài học</p>
                <p className="document">Tài liệu</p>
              </div>
              <div className="group">
                <div className="accordion active title">
                  {[1, 2, 3, 4].map((section) => (
                    <div className="accordion-group" key={section}>
                      <h4 className="accordion-title">Section {section}</h4>
                      <div className="accordion-detail">
                        {[1, 2, 3].map((lesson) => (
                          <div className="card-accordion" key={lesson}>
                            <div>
                              <i className="fa-brands fa-youtube"></i>
                              <p>học thử</p>
                              Bài {lesson}: title
                              <span>time</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="document-title title">
                  <p>tài liệu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Lesson;