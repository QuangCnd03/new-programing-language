import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { handleErrorMsg, handleSlug, usePageTitle } from "../../hooks/hook";

const Add = () => {
  usePageTitle("Add teacher");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [teacher, setTeacher] = useState({
    name: "",
    slug: "",
    exp: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setTeacher({
        ...teacher,
        [name]: value,
        slug: handleSlug(value),
      });
    }else{
      setTeacher({ ...teacher, [name]: value });
    }
  };
    const handleFileChange = (e) => {
      const { name } = e.target;
      const file = e.target.files[0];
      setTeacher({ ...teacher, [name]: file });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", teacher.name); 
    formData.append("slug", teacher.slug);
    formData.append("exp", teacher.exp);
    formData.append("description", teacher.description);
    formData.append("image", teacher.image);

    axios.post("/admin/teachers", formData).then((response) => {
      setError("");
      setMsg(response.data.message);
      navigate("/admin/teachers");
    }).catch((error) => {
        setMsg("");
        const { errors } = error.response.data ?? null;
        setError(handleErrorMsg(errors));
    });
  }

  return (
    <div>
      {msg && <div className="alert alert-success text-center">{msg}</div>}
      {error && (
        <div className="alert alert-danger text-center" style={{ whiteSpace: "pre-wrap" }}>
          {error}
        </div>
      )}
  
      <div className="row">
        <div className="col">
          <p>
            <Link to="/admin/teachers" className="btn btn-success btn-sm cus_success_btn">Go back</Link>
          </p>
        </div>
      </div>
  
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 mb-3 group-control">
            <label htmlFor="name" style={{ fontWeight: 700 }}> Name </label>
            <input type="text" className="form-control" name="name" value={teacher.name} placeholder="Enter name..." onChange={handleInputChange}/>
          </div>
  
          <div className="col-6 mb-3 group-control">
            <label htmlFor="slug" style={{ fontWeight: 700 }}> Slug </label>
            <input type="text" className="form-control" name="slug" id="slug" value={teacher.slug} onChange={handleInputChange} placeholder=""/>
          </div>
  
          <div className="col-6 mb-3 group-control">
            <label htmlFor="exp" style={{ fontWeight: 700 }}> Exp </label>
            <input type="text" className="form-control" name="exp" id="exp" value={teacher.exp} onChange={handleInputChange} placeholder="Enter exp ..."/>
          </div>
  
          <div className="col-12 mb-3 group-control">
            <label htmlFor="description" style={{ fontWeight: 700 }}> Description </label>
            <textarea className="form-control" name="description" value={teacher.description} onChange={handleInputChange}></textarea>
          </div>
  
          <div className="col-12">
            <div className="mb-3">
              <div className="row align-items-end">
                <div className="col-7">
                  <div className="input-group">
                    <input type="text" className="form-control"  value={ teacher.image ? teacher.image.name : ""  }  placeholder="Avatar ..." readOnly/>
                      <input type="file" name="image" onChange={handleFileChange} accept="image/*" style={{ display: "none" }} id="image-upload"/>
                    <label htmlFor="image-upload" className="btn btn-success">
                      Choose
                    </label>
                  </div>
                </div>
                <div className="col-3">
                  <div id="holder">
                    {teacher.image && <img src={URL.createObjectURL(teacher.image)} alt="Avatar" style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}/>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <hr/>
  
        <div className="row">
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-sm cus_primary_btn">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
  
};

export default Add;