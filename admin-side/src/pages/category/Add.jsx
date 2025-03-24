import axios from "../../axiosConfig";
import React, { useEffect, useState } from 'react'
import { ShowCategoryOptionLevel } from "../../components/category/Category";
import { handleSlug, usePageTitle } from "../../hooks/hook";
import { useNavigate } from "react-router-dom";
const Add = () => {
    usePageTitle('Add category');
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        parent_id: 0,
        name: "",
        slug: ""
    });
    useEffect(() => {
        axios.get(`/admin/categories`).then((response) => {
            setCategories(response.data.categories);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name === "name") {
            setFormData({
                ...formData,
                [name]: value,
                slug: handleSlug(value)
            });
        }else{
            setFormData({...formData, [name]: value,});
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/admin/categories`, formData).then((response) => {
            setMsg(response.data.message);
            setTimeout(() => {
                navigate("/admin/categories");
            }, 2000);
            
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <div>
          {msg && <div className="alert alert-success text-center">{msg}</div>}
          <div className="row">
            <div className="col">
              <p>
                <a href="/admin/categories" className="btn btn-success btn-sm cus_success_btn">
                  Go back
                </a>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <table className="table table-bordered text-center" id="table_user">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Parent</th>
                  <th>Name</th>
                  <th>Slug</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select className="form-control" name="parent_id" id="parent_id" onChange={handleInputChange} 
                        value={formData.parent_id} >
                      <option value="0">No</option>
                      { <ShowCategoryOptionLevel categories={categories} /> }
                    </select>
                  </td>
                  <td>
                    <input type="text" className="form-control" name="name" id="name" value={formData.name} onChange={handleInputChange}  required/>
                  </td>
                  <td>
                    <input type="text" className="form-control" name="slug" id="slug" value={formData.slug} onChange={handleInputChange}  required/>
                  </td>
                </tr>
              </tbody>
            </table>
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