import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axiosConfig";
import { handleErrorMsg } from "../hook/hook";

const SignIn = () => {
  const [student, setStudent] = useState({email: "", password: ""});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name] : value
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("/sign-in", student).then((response) => {
      const { token, message } = response.data;
      localStorage.setItem("token", token);
      setMsg(message);
      navigate("/");
    }).catch((error) => {
      setMsg("");
      const errorMsg = error.response.data.message;
      setError(errorMsg);
    })
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
      {msg && <div className="alert alert-success text-center">{msg}</div>}
      {error && (
          <div className="alert alert-danger text-center" style={{ whiteSpace: "pre-wrap" }}>
            {error}
          </div>
       )}
      <div className="sign-in">
        <h3>Sign in</h3>
        <form onSubmit={handleSubmit} id="sign_in_form">
          <input type="text" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
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