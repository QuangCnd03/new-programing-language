import React, { useEffect, useState } from 'react';
import Menu from '../../components/account/Menu';
import axios from '../../../axiosConfig';

const Course = () => {
  const [mycourses, setMycourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    axios.get("/my-courses").then((response) => {
      setMycourses(response.data.courses);
      setFilteredCourses(response.data.courses);
      
      const uniqueTeachers = response.data.courses.reduce((acc, course) => {
        const teacher = course.teacher;
        if (!acc.some(t => t.id === teacher.id)) {
          acc.push(teacher);
        }
        return acc;
      }, []);
      
      setTeachers(uniqueTeachers);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  // Xử lý tìm kiếm và lọc
  useEffect(() => {
    let filtered = [...mycourses];

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo giáo viên
    if (selectedTeacher) {
      filtered = filtered.filter(course => 
        course.teacher.id === parseInt(selectedTeacher)
      );
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedTeacher, mycourses]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  return (
    <section className="all-course py-2">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9">
            <h2 className="py-2">My Courses</h2>
            <form className="mb-3">
              <div className="row">
                <div className="col-5">
                  <select 
                    name="teacher_id" 
                    className="form-select"
                    value={selectedTeacher}
                    onChange={handleTeacherChange}
                  >
                    <option value="">All Teachers</option>
                    {teachers.map((teacher) => (
                      <option key={`teacher-${teacher.id}`} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-7">
                  <input 
                    type="search" 
                    name="keyword" 
                    className="form-control" 
                    placeholder="Course Name..." 
                    value={searchTerm}
                    onChange={handleSearch}
                  />
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
                {filteredCourses.map((course, index) => (
                  <tr key={`course-${course.id}`}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={`/course/${course.slug}`}>{course.name}</a>
                    </td>
                    <td>
                      <a href="#">{course.teacher.name}</a>
                    </td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td className="d-grid">
                      <a href={`/course/${course.slug}`} className="btn btn-outline-primary btn-sm">
                        Enter
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">No courses found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;