import { useEffect, useState } from 'react';
import { useCart } from "../components/cart/CartContext";
import { formatPrice, useStudentProfile } from "../hook/hook";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import Swal from 'sweetalert2';
const Checkout = () => {
  const { cartItems, calculateTotal, removeCoupon, clearAllItems } = useCart();
  const orderId = useParams();
  const navigate = useNavigate();
  const [coupon] = useState(() => {
    const savedCoupon = localStorage.getItem('coupon');
    return savedCoupon ? JSON.parse(savedCoupon) : {
      discount_type: null,
      discount_value: 0,
      coupon_code: ""
    };
  });
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const student = useStudentProfile();

  useEffect(() => {
    if(coupon.discount_type === "percent") {
      setTotal(calculateTotal() * (1 - coupon.discount_value / 100));
    } else {
      setTotal(calculateTotal() - coupon.discount_value);
    }
    if (student) {
      setIsLoading(false);
    }
  }, [coupon, calculateTotal, student]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }
  const handlePaymentConfirmation = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmed transfer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enter cart",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`/checkout`, {
          order_id: orderId, 
          student_id: student.id,
          courses: cartItems
        }).then((response) => {
          if(response.data.success) {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: response.data.message,
            }).then(() => {
              clearAllItems();
              removeCoupon();
              window.scrollTo(0, 0)
              navigate('/');
            });
          }
        }).catch((error) => {
          const { success, message } = error.response.data;
          if(!success) {
            Swal.fire({
              title: "Error",
              icon: "error",
              text: message,
            }).then(() => {
              clearAllItems();
              removeCoupon();
              navigate('/cart');
            });
          }
          
        });
      }
    });
    

    
  }
  return (
    <section className="all-course py-4 checkout-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-3">Order Information</h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Total</th>
                  <td>{formatPrice(calculateTotal())}</td>
                </tr>
                <tr>
                  <th>Discount</th>
                  <td className="discount-value">
                    {coupon.discount_value > 0 ? (
                      coupon.discount_type === "percent" 
                        ? `${coupon.discount_value}%` 
                        : formatPrice(coupon.discount_value)
                    ) : "No"}
                  </td>
                </tr>
                <tr>
                  <th>Order Date</th>
                  <td>{new Date().toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td><span className="badge bg-warning">Pending Payment</span></td>
                </tr>
                <tr>
                  <th>Total Order Value</th>
                  <td className="total-value">{formatPrice(total)}</td>
                </tr>
              </tbody>
            </table>
            <h4 className="mb-3">Order Detail</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="5%">No</th>
                  <th>Course Name</th>
                  <th>Price</th>
                  <th>Teacher</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.code}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{formatPrice(item.price)}</td>
                    <td>{item.teacher_name}</td>
                    <td><span className="badge bg-success">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <Link to="/cart" className="btn btn-primary btn-sm">Go Back</Link>
              <Link to="/" className="btn btn-primary btn-sm">Continue Shopping</Link>
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="mb-3">Customer Information</h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th width="25%">Name</th>
                  <td>{student.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{student.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{student.phone}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{student.address}</td>
                </tr>
              </tbody>
            </table>
            <div className="row">
              <div className="col-12">
                <h4 className="mb-3">Payment Information</h4>
                <p>Please transfer the payment to the bank account below or scan the QR code to proceed. Make sure to enter the correct amount and payment details.</p>
                <hr />
                <p>- Bank: ACB</p>
                <p>- Account Number: <span>4319141</span> <i className="bank-copy fa-regular fa-copy" onClick={() => handleCopy('4319141')} style={{ cursor: 'pointer' }}></i></p>
                <p>- Account Holder: NGUYEN MINH QUANG</p>
                <p>- Amount: <span className="total-value">{total}</span></p>
                <p>- Payment Details: <span>Payment for Order #{Math.floor(Math.random() * 1000000)}</span> <i className="bank-copy fa-regular fa-copy" onClick={() => handleCopy(`Payment for Order #${Math.floor(Math.random() * 1000000)}`)} style={{ cursor: 'pointer' }}></i></p>
              </div>
              <div className="col-12 text-center">
                <img className="qr-img" src={`https://img.vietqr.io/image/acb-4319141-compact2.jpg?amount=${total}&addInfo=thanh+toan+don+hang+ATX`} alt="QR Code" />
              </div>
              <div className="col-12 py-4 text-center">
                <button className="btn btn-warning btn-sm" onClick={handlePaymentConfirmation}>Payment Confirmation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;