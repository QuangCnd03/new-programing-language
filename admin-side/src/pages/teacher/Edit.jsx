import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { handleErrorMsg, handleSlug, usePageTitle } from "../../hooks/hook";

const Add = () => {
  usePageTitle("Update teacher");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    name: "",
    slug: "",
    exp: "",
    description: "",
    image: "",
    currentImage: null
  });
  useEffect(() => {
    if (id) {
      axios.get(`/admin/teachers/${id}`).then((response) => {
        const teacher = response.data.teacher;
        setTeacher({
          name: teacher.name,
          slug: teacher.slug,
          exp: teacher.exp,
          description: teacher.description,
          image: teacher.image,
          currentImage: null
        });
      }).catch((error) => {
        setMsg("");
        const { errors } = error.response.data ?? null;
        setError(handleErrorMsg(errors));
    });; 
    }
  }, [id])

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
    if(teacher.currentImage){
      formData.append("currentImage", teacher.currentImage);
    }
    axios.post(`/admin/teachers/edit/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      }
    }).then((response) => {
      setError("");
      setMsg(response.data.message);
      console.log(response.data.teacher);
      
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
                    <input type="text" className="form-control"  value={ teacher.currentImage !== null ? teacher.currentImage.name : teacher.image}  placeholder="Avatar ..." readOnly/>
                      <input type="file" name="currentImage" onChange={handleFileChange} accept="image/*" style={{ display: "none" }} id="image-upload"/>
                    <label htmlFor="image-upload" className="btn btn-success">
                      Choose
                    </label>
                  </div>
                </div>
                <div className="col-3">
                  <div id="holder">
                    {(teacher.image) && <img src={teacher.currentImage !== null ? URL.createObjectURL(teacher.currentImage) : "http://localhost:8000" + teacher.image} 
                      alt="Avatar" style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}/>}
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