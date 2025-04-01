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
    expired: false,
    coupon_code: null,
    discount: null
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
                    <th>Coupon code</th>
                    <td>{order.coupon_code || 'No coupon used'}</td>
                  </tr>
                  <tr>
                    <th>Discount</th>
                    <td>{order.discount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <span className={`badge bg-${order.ordersStatus.color}`}>
                        {order.ordersStatus.name}
                      </span>
                      {!order.ordersStatus.is_success && (
                        <>
                          {order.expired ? (
                            <span className="badge bg-danger">Payment is due</span>
                          ) : (
                            <a href={`/checkout/${order.id}`} className="btn btn-success btn-sm update-payment-date">
                              Check out
                            </a>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h4>Detail</h4>
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th width="5%">No.</th>
                    <th>Course ID</th>
                    <th>Price</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {order.orderDetail.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.course_id}</td>
                      <td>{item.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                      <td>{new Date(item.created_at).toLocaleString('vi-VN')}</td>
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