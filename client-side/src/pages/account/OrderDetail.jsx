import React from 'react';
import Menu from '../../components/account/Menu';

const OrderDetail = () => {
  const order = {
    id: 1,
    total: 1000000,
    created_at: '2025-03-09T15:24:34',
    ordersStatus: { color: 'success', name: 'Completed', is_success: true },
    expired: false,
    orderDetail: [
      {
        course: { name: 'Course 1', teacher: { name: 'Teacher 1' }, status: true },
        price: 500000,
      },
      {
        course: { name: 'Course 2', teacher: { name: 'Teacher 2' }, status: false },
        price: 500000,
      },
    ],
  };

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
                    <td>{order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
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
                      <td>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
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