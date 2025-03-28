import { useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { handleErrorMsg } from "../hook/hook";
const SignUp = () => {
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({
            ...prev,
            [name] : value
        })); 
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(student.password !== student.confirm_password){
            setError("Password and confirm password are not the same");
            return; 
        }
        axios.post("/sign-up", student).then((response) => {
            setError("");
            const { message, token } = response.data;
            setMsg(message);
            localStorage.setItem("token", token);
            navigate("/");
        }).catch((error) => {
            const { errors } = error.response.data ?? null;
            setMsg("");
            setError(handleErrorMsg(errors));
        });
        
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
            <div className="sign-up">
                <h3>Sign up</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" onChange={handleInputChange} placeholder="Full name" />
                    <input type="text" name="email" onChange={handleInputChange} placeholder="Email" />
                    <input type="text" name="phone" onChange={handleInputChange} placeholder="Phone" />
                    <input type="password" name="password" onChange={handleInputChange} placeholder="Password" />
                    <input type="password" name="confirm_password" onChange={handleInputChange} placeholder="Confirm password" />
                    <button type="submit">
                        <i className="fa-solid fa-user"></i> Sign up
                    </button>
                </form>
                <p className="sign-in">Already have an account?
                    <a href="/sign-in">Sign in</a>
                </p>
            </div>
        </div>
    )
}
export default SignUp;