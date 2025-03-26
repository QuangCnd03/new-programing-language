import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { handleErrorMsg, handleSlug, usePageTitle } from "../../hooks/hook";

const Add = () => {
  usePageTitle("Add teacher");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const [teacher, setTeacher] = useState({
    name: "",
    slug: "",
    exp: "",
    description: "",
    image: null, // Lưu file ảnh thay vì URL
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setTeacher({
        ...teacher,
        [name]: value,
        slug: handleSlug(value),
      });
    } else if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        setTeacher({
          ...teacher,
          image: file, // Lưu file thực tế
        });
      }
    } else {
      setTeacher({ ...teacher, [name]: value });
    }
  };
console.log(teacher);

  const handleChooseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("name", teacher.name);
    formData.append("slug", teacher.slug);
    formData.append("exp", teacher.exp);
    formData.append("description", teacher.description);
    if (teacher.image) {
      formData.append("image", teacher.image); // Gửi file ảnh
    }
    
    axios.post("/admin/teachers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        setError("");
        setMsg(response.data.message);
        setTimeout(() => navigate("/admin/teachers"), 2000);
      }).catch((error) => {
        setMsg("");
        const { errors } = error.response.data;
        setError(handleErrorMsg(errors))
      })
      .finally(() => setUploading(false));
  };

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
            <Link to="/admin/teachers" className="btn btn-success btn-sm cus_success_btn">
              Go back
            </Link>
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 mb-3 group-control">
            <label htmlFor="name" style={{ fontWeight: 700 }}> Name </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={teacher.name}
              onChange={handleInputChange}
              placeholder="Enter name..."
            />
          </div>
          <div className="col-6 mb-3 group-control">
            <label htmlFor="slug" style={{ fontWeight: 700 }}> Slug </label>
            <input
              type="text"
              className="form-control"
              name="slug"
              id="slug"
              value={teacher.slug}
              onChange={handleInputChange}
              placeholder=""
            />
          </div>
          <div className="col-6 mb-3 group-control">
            <label htmlFor="exp" style={{ fontWeight: 700 }}> Exp </label>
            <input
              type="text"
              className="form-control"
              name="exp"
              id="exp"
              value={teacher.exp}
              onChange={handleInputChange}
              placeholder="Enter exp ..."
            />
          </div>
          <div className="col-12 mb-3 group-control">
            <label htmlFor="description" style={{ fontWeight: 700 }}> Description </label>
            <textarea
              className="form-control"
              name="description"
              value={teacher.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <div className="row align-items-end">
                <div className="col-7">
                  <label htmlFor="image" style={{ fontWeight: 700 }}> Avatar </label>
                  <input
                    type="text"
                    className="form-control"
                    value={teacher.image ? teacher.image.name : ""} // Hiển thị tên file
                    placeholder="Avatar..."
                    readOnly
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    disabled={uploading}
                  />
                  {uploading && <small className="text-muted">Uploading...</small>}
                </div>
                <div className="col-2 d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="lfm-image"
                    onClick={handleChooseClick}
                    disabled={uploading}
                  >
                    Choose
                  </button>
                </div>
                <div className="col-3">
                  <div id="holder">
                    {teacher.image && (
                      <img
                        src={URL.createObjectURL(teacher.image)} // Preview tạm thời
                        alt="Avatar"
                        style={{
                          width: "100%",
                          maxHeight: "150px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-4">
            <button
              type="submit"
              className="btn btn-primary btn-sm cus_primary_btn"
              disabled={uploading}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;