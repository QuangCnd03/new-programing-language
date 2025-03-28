import React from "react";

const Cart = () => {
  return (
    <section className="cart-container py-4">
      <div className="cart-card container">
        <h2 className="cart-title">Giỏ hàng của bạn</h2>
        <div className="cart-content row">
          <div className="cart-items col-md-7">
            <div className="cart-item d-flex align-items-center">
              <img className="cart-item-image" src="images/client/javascript.jpg" alt="Khóa học" />
              <div className="cart-item-details flex-grow-1">
                <p className="cart-item-name">Javascript</p>
                <p className="cart-item-teacher">Giảng viên: Minh Quang</p>
                <p className="cart-item-price">Giá: 1.000.000 đ</p>
              </div>
              <button className="cart-item-remove">&#10005;</button>
            </div>
          </div>
          <div className="cart-summary col-md-5">
            <h3 className="summary-title">Tóm tắt đơn hàng</h3>
            <div className="discount-code">
              <label htmlFor="discount-code">Mã giảm giá:</label>
              <input type="text" id="discount-code" name="discount-code" placeholder="Nhập mã giảm giá" />
            </div>
            <div className="summary-details">
              <p>Số lượng: <span>1</span></p>
              <p>Giảm giá: <span>Không</span></p>
              <p>Phương thức thanh toán: <span>Chuyển khoản ngân hàng (QR scan)</span></p>
              <p>Tổng cộng: <span className="total-price">1.000.000 đ</span></p>
            </div>
            <button className="checkout-button">Thanh toán</button>
          </div>
        </div>
        <div className="back-to-shop">
          <a href="#">&larr; Quay lại trang chủ</a>
        </div>
      </div>
    </section>
  );
};

export default Cart;