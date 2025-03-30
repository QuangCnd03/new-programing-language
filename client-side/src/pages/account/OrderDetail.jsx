import React, { useEffect, useState } from 'react';
import Menu from '../../components/account/Menu';
import { useParams } from 'react-router-dom';
import axios from '../../../axiosConfig';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    id: null,
    total: null,
    created_at: null,
    ordersStatus: {
      name: null,
      color: null,
      is_success: false
    },
    orderDetail: [],
    expired: false
  });
  
  useEffect(() => {
    axios.get(`/my-order-detail/${orderId}`).then((response) => {
      const orderData = response.data.order;
      setOrder({
        ...orderData,
        ordersStatus: {
          name: orderData.order_status_id === 2 ? 'Completed' : 'Pending',
          color: orderData.order_status_id === 2 ? 'success' : 'warning',
          is_success: orderData.order_status_id === 2
        },
        orderDetail: orderData.order_detail || []
      });
      console.log(response.data);
      
    });
  }, [orderId]);

  return (
    <section className="all-course py-2">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9">
            <div className="order-detail">
              <h2 className="py-2">Order</h2>
              <h4 className="mb-3">Basic information</h4>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th width="20%">Order ID</th>
                    <td>#{order.id}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>{order.total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  </tr>
                  <tr>
                    <th>Order date</th>
                    <td>{new Date(order.created_at).toLocaleString('vi-VN')}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <span className={`badge bg-${order.ordersStatus.color}`}>
                        {order.ordersStatus.name}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h4>Detail</h4>
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th width="5%">No.</th>
                    <th>Course name</th>
                    <th>Price</th>
                    <th>Teacher</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {order.orderDetail.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.course?.name}</td>
                      <td>{item.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                      <td>{item.course?.teacher?.name}</td>
                      <td>
                        <span className={`badge bg-${item.course?.status ? 'success' : 'danger'}`}>
                          {item.course?.status ? 'Active' : 'Block'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a href="/my-orders" className="btn btn-primary btn-sm">List of orders</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;