import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({email: "", password: ""});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({text: "", type: ""});
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sign in";
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({});
    setErrors({});
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/sign-in", formData);
      const { success, errors, token, message } = response.data;
      if(!success) {
        throw new Error(errors);
      }
      setMessage(prev => ({
        ...prev,
        text: message,
        type: "success"
      }))

      Cookies.set("token", token.plainTextToken, {
        secure: true,
        path: "/",
      });
      setTimeout(() => {
        window.location = "/";
      }, 1000);

    } catch (errors) {
      if(errors.response.data.errors) {
        setErrors(errors.response.data.errors)
      }else{
        setMessage(prev => ({
          ...prev,
          text: errors.response.data.message,
          type: "danger"
        }))
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name] : value
    }));
  }

  return (
    <div className="container">
      <div className="home-back">
        <a href="/">
          <span>
          <FontAwesomeIcon icon={faLeftLong} style={{color: "white"}} />
          </span>
          Go back
        </a>
      </div>
      <div className="sign-in">
        {message.text && (
              <div className={`alert alert-${message.type} text-center`}>
                      {message.text}
              </div>
          )}
        <h3>Sign in</h3>
        <form onSubmit={handleSubmit} id="sign_in_form">
          <input type="text" name="email" placeholder="Email" onChange={handleChange} />
          {errors.email && errors.email.map((error, index) => (
              <label key={index} className="error_email" style={{color: "red"}}>{error}</label>
          ))}
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          {errors.password && errors.password.map((error, index) => (
              <label key={index} className="error_password" style={{color: "red"}}>{error}</label>
          ))}
          <p className="forgot-password">Forgot password</p>
          <button type="submit"><i className="fa-solid fa-user"></i> Sign in</button>
        </form>
        <p className="sign-up">
          You don't have an account?
          <a href="/sign-up">Sign up now</a>
        </p>
      </div>
    </div>
  )
}

export default SignIn;