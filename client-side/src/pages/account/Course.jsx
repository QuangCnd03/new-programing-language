import React from 'react';
import Menu from '../../components/account/Menu';

const Course = () => {
  const teachers = [
    { id: 1, name: 'Teacher 1' },
    { id: 2, name: 'Teacher 2' },
    // Thêm các giáo viên khác vào đây
  ];

  const courses = [
    {
      id: 1,
      name: 'Course 1',
      slug: 'course-1',
      teacher: { name: 'Teacher 1' },
      pivot: { status: true },
    },
    {
      id: 2,
      name: 'Course 2',
      slug: 'course-2',
      teacher: { name: 'Teacher 2' },
      pivot: { status: false },
    },
  ];

  return (
    <section className="all-course py-2">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9">
            <h2 className="py-2">My Courses</h2>
            <form action="" className="mb-3">
              <div className="row">
                <div className="col-3">
                  <select name="teacher_id" className="form-select">
                    <option value="">All Teachers</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-7">
                  <input type="search" name="keyword" className="form-control" placeholder="Course Name..." />
                </div>
                <div className="col-2 d-grid">
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </form>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="5%">No.</th>
                  <th>Name</th>
                  <th width="25%">Teacher</th>
                  <th width="15%">Status</th>
                  <th width="10%">Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>
                      <a href="">{course.name}</a>
                    </td>
                    <td>
                      <a href="#">{course.teacher.name}</a>
                    </td>
                    <td>
                        <span className="badge bg-success">Active</span>
                    </td>
                    <td className="d-grid">
                      <a href="" className="btn btn-outline-primary btn-sm">
                        Enter
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination component can be added here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;