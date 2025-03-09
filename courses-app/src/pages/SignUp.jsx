import { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
const SignUp = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: ""
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    useEffect(() => {
        document.title = "Sign up";
    }, [])
    // useEffect(() => {
    //     Object.entries(errors).forEach(([key, value]) => {
    //         console.log(`${key}: ${value.join(", ")}`);
    //     });
        
    // }, [errors]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/sign-up", formData);
            const { success, errors, message, user } = response.data;
            if(!success) {
                throw new Error(errors);
            }
            setMessage(message);
            setTimeout(() => {
                navigate("/sign-in");
            }, 1000);
        } catch (errors) {
            setErrors(errors.response.data.errors);
            
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
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
        <div className="sign-up">
            <h3>Sign up</h3>
            {message && (
                <div className="alert alert-success text-center">
                        {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" name="fullname" onChange={handleChange} placeholder="Full name" />
                {errors.fullname && errors.fullname.map((error, index) => (
                    <label key={index} className="error_fullname" style={{color: "red"}}>{error}</label>
                ))}
                <input type="text" name="email" onChange={handleChange} placeholder="Email" />
                {errors.email && errors.email.map((error, index) => (
                    <label key={index} className="error_email" style={{color: "red"}}>{error}</label>
                ))}
                <input type="text" name="phone" onChange={handleChange} placeholder="Phone" />
                {errors.phone && errors.phone.map((error, index) => (
                    <label key={index} className="error_phone" style={{color: "red"}}>{error}</label>
                ))}
                <input type="text" name="password" onChange={handleChange} placeholder="Password" />
                {errors.password && errors.password.map((error, index) => (
                    <label key={index} className="error_password" style={{color: "red"}}>{error}</label>
                ))}
                <input type="text" name="confirm_password" onChange={handleChange} placeholder="Confirm password" />
                {errors.confirm_password && errors.confirm_password.map((error, index) => (
                    <label key={index} className="error_confirm_password" style={{color: "red"}}>{error}</label>
                ))}
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