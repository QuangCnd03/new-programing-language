import React from 'react';
const Checkout = () => {
  return (
    <section className="all-course py-4 checkout-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-3">Order Information</h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th width="25%">Order ID</th>
                  <td>#1</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>1.000.000 đ</td>
                </tr>
                <tr>
                  <th>Discount</th>
                  <td className="discount-value">No</td>
                </tr>
                <tr>
                  <th>Order Date</th>
                  <td>9/03/2025 15:24:34</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td><span className="badge bg-warning">Pending Payment</span></td>
                </tr>
                <tr>
                  <th>Total Order Value</th>
                  <td className="total-value">1.000.000 đ</td>
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
                <tr>
                  <td>1</td>
                  <td>Javascript</td>
                  <td>1.000.000 đ</td>
                  <td>Minh Quang</td>
                  <td><span className="badge bg-success">Active</span></td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <a href="#" className="btn btn-primary btn-sm">Go Back</a>
              <a href="#" className="btn btn-primary btn-sm">Continue Shopping</a>
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="mb-3">Discount Code</h4>
            <form action="" className="mb-3 coupon-form">
              <fieldset>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Enter discount code..." />
                  <button className="btn btn-success">Apply</button>
                </div>
                <span className="text-danger error"></span>
              </fieldset>
            </form>
            <div className="row">
              <div className="col-12">
                <h4 className="mb-3">Payment Information</h4>
                <p>Please transfer the payment to the bank account below or scan the QR code to proceed. Make sure to enter the correct amount and payment details.</p>
                <hr />
                <p>- Bank: ACB</p>
                <p>- Account Number: <span>4319141</span> <i className="bank-copy fa-regular fa-copy"></i></p>
                <p>- Account Holder: NGUYEN MINH QUANG</p>
                <p>- Amount: <span className="total-value">1.000.000</span></p>
                <p>- Payment Details: <span>Payment for ATX Order</span> <i className="bank-copy fa-regular fa-copy"></i></p>
              </div>
              <div className="col-12 text-center">
                <img className="qr-img" src="https://img.vietqr.io/image/acb-4319141-compact2.jpg?amount=100000&addInfo=thanh+toan+don+hang+ATX" alt="QR Code" />
              </div>
              <div className="col-12 py-4 text-center">
                <a href="#" className="btn btn-warning btn-sm">Payment Confirmation</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;