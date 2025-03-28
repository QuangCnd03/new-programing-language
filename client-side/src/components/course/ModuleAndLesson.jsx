
const ModuleAndLesson = ({ course }) => {
  return (
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
  );
};

export default ModuleAndLesson;
