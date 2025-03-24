import React, { useEffect, useState } from "react";
import { handleSlug, usePageTitle } from "../../hooks/hook";
import axios from "../../axiosConfig";
import { data, useParams } from "react-router-dom";
import { ShowCategoryOptionLevel } from "../../components/category/Category";

const Edit = () => {
  usePageTitle("Update category");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const [category, setCategory] = useState({parent_id: 0, name: "", slug: ""});
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(`/admin/categories/${id}`).then((response) => {
      const { category, categories } = response.data;
      setCategory(category);
      setCategories(categories.filter((cat) => cat.id !== category.id));
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "name") {
      setCategory({
        ...category,
        [name]: value,
        slug: handleSlug(value)
      })
    }else{
      setCategory({...category, [name]: value})
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");
    axios.put(`/admin/categories/${id}`, category).then((response) => {
      setMsg(response.data.message);
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
                <select className="form-control" name="parent_id" id="parent_id" value={category.parent_id} 
                  onChange={handleInputChange} >
                  <option value="0">No</option>
                  <ShowCategoryOptionLevel categories={categories}/>
                </select>
              </td>
              <td>
                <input type="text" className="form-control" name="name" id="name"
                value={category.name} onChange={handleInputChange} required/>
              </td>
              <td>
                <input type="text" className="form-control" name="slug" id="slug" 
                value={category.slug} onChange={handleInputChange} required/>
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
};

export default Edit;
