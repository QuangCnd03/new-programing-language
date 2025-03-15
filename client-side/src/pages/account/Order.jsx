import React from 'react';
import Menu from '../../components/account/Menu';

const Order = () => {
  const orders = [
    {
      id: 1,
      total: 1000000,
      ordersStatus: { color: 'success', name: 'Completed' },
      created_at: '2025-03-09T15:24:34',
    },
    {
      id: 2,
      total: 2000000,
      ordersStatus: { color: 'warning', name: 'Pending' },
      created_at: '2025-03-08T14:20:00',
    },
    // Thêm các đơn hàng khác vào đây
  ];

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
                      <a href={`/order/${order.id}`}>#{order.id}</a>
                    </td>
                    <td>{order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td>
                      <span className={`badge bg-${order.ordersStatus.color}`} style={{ color: 'white' }}>
                        {order.ordersStatus.name}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleString('vi-VN')}</td>
                    <td className="d-grid">
                      <a href={`/order/${order.id}`} className="btn btn-outline-primary btn-sm">
                        Details
                      </a>
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