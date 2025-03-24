import React, { useEffect, useRef, useState } from 'react'
import { ShowCategoryCheckbox } from '../../components/course/Course';
import { usePageTitle, handleSlug } from '../../hooks/hook';
import axios from "../../axiosConfig";
import { useNavigate } from 'react-router-dom';

const Add = () => {
    usePageTitle("Add Course");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [course, setCourse] = useState({
        name: '',
        slug: '',
        teacher_id: '',
        levels: '',
        code: '',
        price: 0,
        sale_price: 0,
        is_document: '0',
        status: '0',
        supports: '',
        detail: '',
        thumbnail: null,
        categories: []
    });
    const [categories, setCategories] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const handleChooseClick = () => {
        fileInputRef.current.click();
    }
    useEffect(() => {
        axios.get(`/admin/categories`).then((response) => {
            setCategories(response.data.categories);
        }).catch((error) => {
            console.error("Categories", error);
        });
        axios.get(`/admin/teachers`).then((response) => {
            setTeachers(response.data.teachers);
        }).catch((error) => {
            console.error("Teachers ", error);
        });
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name === "name") {
            setCourse({
                ...course, 
                [name] : value,
                slug: handleSlug(value)
            });
        }else if(name === "thumbnail") {
            const file = e.target.files[0];
            if(file) {
                setCourse({
                    ...course,
                    thumbnail: file
                });
            }
        }else{
            setCourse({...course, [name] : value});
        }
    }
    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if(checked) {
            setCourse({
                ...course,
                categories: [...course.categories, value]
            });
        }else{
            setCourse({
                ...course,
                categories: course.categories.filter((category) => category !== value)
            });
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", course.name);
        formData.append("slug", course.slug);
        formData.append("teacher_id", course.teacher_id);
        formData.append("levels", course.levels);
        formData.append("code", course.code);
        formData.append("price", course.price);
        formData.append("sale_price", course.sale_price);
        formData.append("is_document", course.is_document);
        formData.append("status", course.status);
        formData.append("supports", course.supports);
        formData.append("detail", course.detail);
        
        if (Array.isArray(course.categories)) {
            course.categories.forEach((catId) => formData.append("categories[]", catId));
        }
        if (course.thumbnail) {
          formData.append("thumbnail", course.thumbnail); // Gửi file ảnh
        }
        
        axios.post(`/admin/courses`, formData).then((response) => {
            setError("");
            setMsg(response.data.message);
            setTimeout(() => navigate("/admin/courses"), 2000);

        }).catch((error) => {
            console.log(error);
            
            setMsg("");
            const errors = error.response.data.errors;
            let errorMessage = "";
            if(errors) {
              Object.entries(errors).forEach(([index, messages]) => {
                errorMessage += messages + "\n";
              });
              setError(errorMessage);
            }
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
                        <a href="/admin/courses" className="btn btn-success btn-sm cus_success_btn">
                            Go back
                        </a>
                    </p>
                </div>
            </div>
            <form id="form-courses" onSubmit={handleSubmit}>
                <div className="row">

                    <div className="col-6 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Course name</label>
                        <input type="text" className="form-control" name="name" placeholder="Enter course name ..." 
                        value={course.name} onChange={handleInputChange} />
                    </div>

                    <div className="col-6 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Slug</label>
                        <input type="text" className="form-control" name="slug"
                        value={course.slug} onChange={handleInputChange} />
                    </div>

                    <div className="col-4 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Teacher</label>
                        <select className="form-control" name="teacher_id" 
                            onChange={handleInputChange} >
                            <option value="">Choose</option>
                            {teachers &&
                                teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-4 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Level</label>
                        <select className="form-control" name="levels" onChange={handleInputChange} >
                            <option value="">Choose</option>
                            <option value="0">Basic</option>
                            <option value="1">Advance</option>
                        </select>
                    </div>

                    <div className="col-4 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Code</label>
                        <input type="text" className="form-control" name="code" placeholder="Enter code ..."
                        value={course.code} onChange={handleInputChange} />
                    </div>

                    <div className="col-6 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Price</label>
                        <input type="text" className="form-control" name="price" placeholder="Enter price ..."
                        value={course.price} onChange={handleInputChange} />
                    </div>

                    <div className="col-6 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Sale price</label>
                        <input type="text" className="form-control" name="sale_price" placeholder="Enter sale price ..."
                        value={course.sale_price} onChange={handleInputChange}/>
                    </div>

                    <div className="col-6 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Document</label>
                        <select className="form-control" name="is_document" onChange={handleInputChange}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>

                    <div className="col-6 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Status</label>
                        <select className="form-control" name="status" onChange={handleInputChange}>
                            <option value="0">Not released</option>
                            <option value="1">Released</option>
                        </select>
                    </div>

                    <div className="col-12 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Categories:</label>
                        { <ShowCategoryCheckbox  categories={categories} handleCategoryChange={handleCategoryChange} /> }
                    </div>

                    <div className="col-12 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Support</label>
                        <textarea className="form-control" name="supports"
                        value={course.supports} onChange={handleInputChange}>
                        </textarea>
                    </div>

                    <div className="col-12 mb-3 group-control">
                        <label style={{ fontWeight: 700 }}>Content</label>
                        <textarea className="form-control" name="detail"
                        value={course.detail} onChange={handleInputChange}>
                        </textarea>
                    </div>

                    <div className="col-12">
                        <div className="mb-3">
                            <div className="row align-items-end">
                                <div className="col-7">
                                    <label style={{ fontWeight: 700 }}>Avatar</label>
                                    <input type="text" className="form-control" value={course.thumbnail ? course.thumbnail.name : ""} placeholder="Avatar..." readOnly/>
                                    <input type="file" ref={fileInputRef} name="thumbnail" onChange={handleInputChange} accept="image/*" 
                                    style={{ display: "none" }}/>
                                </div>
                                <div className="col-2 d-grid">
                                    <button type="button" className="btn btn-primary" id="lfm-image" data-input="thumbnail" 
                                    data-preview="holder" onClick={handleChooseClick}>
                                        Choose
                                    </button>
                                </div>
                                {course.thumbnail && (
                                    <div className="col-3">
                                        <div id="holder">
                                            <img alt="Avatar preview" src={URL.createObjectURL(course.thumbnail)} 
                                            style={{
                                                width: "100%",
                                                maxHeight: "150px",
                                                objectFit: "contain",
                                            }}  
                                        />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary btn-sm cus_primary_btn">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Add