import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DefaultLayout from './components/layouts/DefaultLayout';

import UserAdd from './pages/user/Add';
import UserList from './pages/user/List';
import UserEdit from './pages/user/Edit';

import StudentList from './pages/student/List';
import StudentEdit from './pages/student/Edit';
import StudentAdd from './pages/student/Add';

import TeacherList from './pages/teacher/List';
import TeacherAdd from './pages/teacher/Add';
import TeacherEdit from './pages/teacher/Edit';

import CategoryList from './pages/category/List';
import CategoryAdd from './pages/category/Add';
import CategoryEdit from './pages/category/Edit';

import CourseList from './pages/course/List';
import CourseAdd from './pages/course/Add';
import CourseEdit from './pages/course/Edit';

import LessonList from './pages/lesson/List';
import LessonAdd from './pages/lesson/Add';
import LessonEdit from './pages/lesson/Edit';



function App() {
  return (
    <Routes>
      <Route path="/admin/" element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/create" element={<UserAdd />} />
        <Route path="users/edit/:id" element={<UserEdit />} />

        <Route path="students" element={<StudentList />} />
        <Route path="students/create" element={<StudentAdd />} />
        <Route path="students/edit/:id" element={<StudentEdit />} />

        <Route path="teachers" element={<TeacherList />} />
        <Route path="teachers/create" element={<TeacherAdd />} />
        <Route path="teachers/edit/:id" element={<TeacherEdit />} />


        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/create" element={<CategoryAdd />} />
        <Route path="categories/edit/:id" element={<CategoryEdit />} />

        <Route path="courses" element={<CourseList />} />
        <Route path="courses/create" element={<CourseAdd />} />
        <Route path="courses/edit/:id" element={<CourseEdit />} />

        <Route path="lessons/:courseId" element={<LessonList />} />
        <Route path="lessons/:courseId/create" element={<LessonAdd />} />
        <Route path="lessons/edit/:lessonId" element={<LessonEdit />} />
      </Route>
    </Routes>
  );
}

export default App;