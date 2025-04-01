import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../axiosConfig";
import { formatPrice, usePageTitle } from "../../hooks/hook";

const Detail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  usePageTitle("Order detail");
  useEffect(() => {
    axios
      .get(`/admin/orders/${orderId}`)
      .then((response) => {
        console.log(response.data.order);
        
        setOrder(response.data.order);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [orderId]);

  return (
    <>
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
            <th>Student</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order && (
            <tr>
              <td>#{order.id}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>
                <span className={`badge bg-${order.orders_status?.color}`}>
                  {order.orders_status?.name}
                </span>
              </td>
              <td>{order.payment_date}</td>
              <td>{order.student?.name}</td>
              <td>{formatPrice(order.total)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Detail;
