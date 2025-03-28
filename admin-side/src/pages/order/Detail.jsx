import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../axiosConfig';

const Detail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [msg, setMsg] = useState('');

  return (
    <div className="container">
      {msg && (
        <div className="alert alert-success text-center">
          {msg}
        </div>
      )}
      <p>
        <Link to="/admin/orders" className="btn btn-success cus_success_btn">
          Go back
        </Link>
      </p>
      <hr />

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Order code</th>
            <th>Date of purchase</th>
            <th>Status</th>
            <th>Payment date</th>
            <th>Course</th>
            <th>Student</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>

          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;