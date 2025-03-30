import React, { useEffect, useState } from 'react';
import Menu from '../../components/account/Menu';
import axios from '../../../axiosConfig';
import { formatPrice } from '../../hook/hook';
import { Link } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/my-orders').then((response) => {
      setOrders(response.data.orders);
      
    });
  }, []);


  return (
    <section className="all-course py-2">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9">
            <h2 className="py-2">Order List</h2>
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th width="5%">No.</th>
                  <th width="15%">Order ID</th>
                  <th>Total</th>
                  <th width="20%">Status</th>
                  <th width="20%">Time</th>
                  <th width="10%">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/my-orders/${order.id}`}>#{order.id}</Link>
                    </td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className={`badge bg-${order.orders_status.color}`} style={{ color: 'white' }}>
                        {order.orders_status.name}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleString('vi-VN')}</td>
                    <td className="d-grid">
                      <Link to={`/my-orders/${order.id}`} className="btn btn-outline-primary btn-sm">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination component can be added here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;