import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./pages/Home";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/account/Profile";
import Course from "./pages/account/Course";
import Order from "./pages/account/Order";
import OrderDetail from "./pages/account/OrderDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import { useStudentProfile } from "./hook/hook";
const App = () => {
  const student = useStudentProfile();
  return (
    <Routes>
      <Route path="sign-in" element={ student ? <Navigate to="/" /> : <SignIn />} />
      <Route path="sign-up" element={student ? <Navigate to="/" /> : <SignUp />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />}/>
        <Route path="my-courses" element={<Course />}/>
        <Route path="course-detail/:courselug" element={<CourseDetail /> }/>
          {/* Login mới vào được */}
        <Route path="lesson/:lessonSlug" element={ <ProtectedRoute> <Lesson /> </ProtectedRoute> }/> 
        <Route path="cart" element={ <ProtectedRoute> <Cart /> </ProtectedRoute> }/>
        <Route path="checkout" element={ <ProtectedRoute> <Checkout /> </ProtectedRoute> }/>
        <Route path="my-profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute>}/>
        <Route path="my-orders" element={ <ProtectedRoute> <Order /> </ProtectedRoute> }/>
        <Route path="my-orders/:id" element={ <ProtectedRoute> <OrderDetail /> </ProtectedRoute>}/>
      </Route>
    </Routes>
  );
};

export default App;
