import React, { useEffect } from "react";
import { useCart } from "../components/cart/CartContext";
import { formatPrice, useStudentProfile } from "../hook/hook";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../axiosConfig";

const Cart = () => {
  const { cartItems, clearItem, calculateTotal, addCoupon, removeCoupon } = useCart();
  const [coupon, setCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem('coupon');
    return savedCoupon ? JSON.parse(savedCoupon) : {
      discount_type: null,
      discount_value: 0,
      coupon_code: ""
    };
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const student = useStudentProfile();
  const oldTotal = calculateTotal();
  
  
  useEffect(() => {
    if(coupon.discount_type === "percent") {
      setTotal(calculateTotal() * (1 - coupon.discount_value / 100));
    } else {
      setTotal(calculateTotal() - coupon.discount_value);
    }
  }, [coupon.discount_type, coupon.discount_value, calculateTotal]);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!coupon.coupon_code) {
      setError("Please enter a coupon code");
      return;
    }
    setIsLoading(true);
    setError("");
    axios.get(`/coupon/${coupon.coupon_code}`).then((response) => {
      if (response.data.success) {
        const couponItem = {
          discount_type: response.data.discount_type,
          discount_value: response.data.discount_value,
          coupon_code: response.data.coupon_code
        };
        addCoupon(couponItem);
        setCoupon(couponItem);
      }
    }).catch((error) => {
      setError(error.response?.data?.message || "Invalid coupon code");
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCoupon({
      discount_type: null,
      discount_value: 0,
      coupon_code: ""
    });
  }
  
  const handleCheckout = (e) => {
    e.preventDefault();
    console.log(cartItems);
    console.log(coupon);
    console.log(total);
    axios.post('/order', {
      student_id: student.id,
      total: total,
      coupon_code: coupon.coupon_code,
      discount: oldTotal - total,
      courses: cartItems,
      coupon: coupon.coupon_code,
    }).then((response) => {
      const order = response.data.order;
      navigate(`/checkout/${order.id}`);
    });
  }
  return (
    <section className="cart-container py-4">
      <div className="cart-card container">
        <h2 className="cart-title">Your Shopping Cart</h2>
        <div className="cart-content row">
          <div className="cart-items col-md-7">
            {cartItems.length === 0 ? (
              <div className="text-center">
                <p>Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.code} className="cart-item d-flex align-items-center">
                  <img className="cart-item-image" src={item.thumbnail} alt={item.name} />
                  <div className="cart-item-details flex-grow-1">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">
                      Price: {formatPrice(item.price)}
                      {coupon.discount_value > 0 && (
                        <span className="text-danger ms-2">
                          -{coupon.discount_type === "percent" ? `${coupon.discount_value}%` : formatPrice(coupon.discount_value)}
                        </span>
                      )}
                    </p>
                  </div>
                  <button className="cart-item-remove" onClick={() => clearItem(item.code)}>&#10005;</button>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary col-md-5">
            <h3 className="summary-title">Order Summary</h3>
            <div className="discount-code">
              {error && (
                <div className="text-center mb-2" style={{ color: 'red' }}>
                  {error}
                </div>
              )}
              <label htmlFor="discount-code">Discount Code:</label>
              {coupon.discount_value === 0 ? (
                <div className="d-flex gap-2">
                  <input 
                    type="text" 
                    id="discount-code" 
                    name="discount-code" 
                    placeholder="Enter discount code"
                    className="flex-grow-1"
                    onChange={(e) => setCoupon({...coupon, coupon_code: e.target.value})}
                    disabled={isLoading}
                  />
                  <button 
                    onClick={handleCouponSubmit} 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        Applying...
                      </>
                    ) : (
                      'Apply'
                    )}
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-success" type="button">{coupon.coupon_code}</button>
                  <button className="btn btn-sm btn-danger" type="button" onClick={handleRemoveCoupon}>&times;</button>
                </div>
              )}
            </div>
            <div className="summary-details">
              <p>Quantity: <span>{cartItems.length}</span></p>
              <p>Discount: 
                <span>
                  {coupon.discount_value > 0 ? (
                    coupon.discount_type === "percent" 
                      ? `${coupon.discount_value}%` 
                      : formatPrice(coupon.discount_value)
                  ) : "None"}
                </span>
              </p>
              <p>Payment Method: <span>Bank Transfer (QR scan)</span></p>
              <p>Total: <span className="total-price">{formatPrice(total)}</span></p>
            </div>
            <button className="checkout-button" disabled={cartItems.length === 0} onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
        <div className="back-to-shop">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>&larr; Back to Home</Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;