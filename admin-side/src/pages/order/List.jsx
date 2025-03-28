import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../hooks/hook';

const List = () => {    
    usePageTitle("Order list");
    const [msg, setMsg] = useState('');
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('/admin/orders').then((response) => {
            setOrders(response.data);
        }).catch((error) => {
              console.error('Error fetching orders:', error);
        }); 
    })

  return (
    <>
       {msg && (
        <div className="alert alert-success text-center">
          {msg}
        </div>
      )}
      <div className="row mb-4 mt-4">
        <div className="col">
          <input type="search" className="form-control" placeholder="Enter keyword ..."/>
        </div>
      </div>
      <hr />
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <p>Order code</p>
            </th>
            <th>
              <p>Date of purchase</p>
              <select className="form-control text-center" >
                <option value="">All</option>
              </select>
            </th>
            <th>
              <p>Status</p>
              <select className="form-control text-center" >
                <option value="">All</option>
                <option value="1">Pending Payment</option>
                <option value="2">Paid</option>
              </select>
            </th>
            <th><p>Student name</p></th>
            <th><p>Price</p></th>
            <th><p>Detail</p></th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/admin/orders/detail/${order.id}`}>#{order.id}</Link>
                </td>
                <td>{formatDate(order.payment_date)}</td>
                <td>
                  <span
                    className={`badge bg-${order.ordersStatus?.color}`}
                    style={{ color: 'white' }}
                  >
                    {order.ordersStatus?.name}
                  </span>
                </td>
                <td>{order.student?.name}</td>
                <td>{formatMoney(order.total)}</td>
                <td className="d-grid">
                  <Link
                    to={`/admin/orders/detail/${order.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default List;