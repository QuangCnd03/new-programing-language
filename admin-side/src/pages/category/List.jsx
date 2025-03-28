import axios from "../../axiosConfig";
import React, { useEffect, useState } from 'react'
import { ShowCategoryLevel } from "../../components/category/Category";
import { usePageTitle } from "../../hooks/hook";
import Swal from "sweetalert2";
const List = () => {
    usePageTitle('List categories');
    const [msg, setMsg] = useState("");
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`/admin/categories`).then((response) => {
            setCategories(response.data.categories);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    const handleSearchChange = (e) => {
      axios.post(`/admin/categories/search`, {keyword: e.target.value}).then((response) => {
        setCategories(response.data.categories);
        console.log(response.data.categories);
        
      }).catch((error) => {
        console.error("There was an error searching", error);
      });
    }
    const handleDeleteCategory = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/admin/categories/${id}`).then((response) => {
            console.log(response.data.id);
            
              setMsg(response.data.message);
              setCategories(categories.filter((category) => category.id != id));
            }).catch((error) => {
              console.error(error);
            });
        }
      });
    }
    return (
        <div>
          {msg && <div className="alert alert-success text-center">{msg}</div>}
          <p>
            <a href="/admin/categories/create" className="btn btn-success cus_success_btn">
              Add new
            </a>
          </p>
          <div className="row mb-4">
            <div className="col">
              <input type="search" className="form-control" name="search" id="keyword"
              placeholder="Enter keyword ..." onChange={handleSearchChange}/>
            </div>
          </div>
          <table className="table table-bordered text-center" id="table_categories">
            <thead>
              <tr>
                <th>Name</th>
                <th>Link</th>
                <th>Create time</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {<ShowCategoryLevel categories={categories} handleDeleteCategory={handleDeleteCategory} />}
            </tbody>
          </table>
        </div>
    );
}

export default List