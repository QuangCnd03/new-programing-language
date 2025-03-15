import { Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />}/>
        <Route path="course-detail" element={<CourseDetail />}/>
        <Route path="lesson" element={<Lesson />}/>
        <Route path="cart" element={<Cart />}/>
        <Route path="checkout" element={<Checkout />}/>
        <Route path="my-profile" element={<Profile />}/>
        <Route path="my-courses" element={<Course />}/>
        <Route path="my-orders" element={<Order />}/>
        <Route path="my-orders/:id" element={<OrderDetail />}/>
      </Route>
    </Routes>
  );
};

export default App;
