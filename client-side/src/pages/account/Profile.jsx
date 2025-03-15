import React, { useState } from 'react';
import Menu from '../../components/account/Menu';
import "../../assets/css/profile.css";
const Profile = () => {
  const [status, setStatus] = useState("table");

  const renderBtn = () => {
    return status === "table" ? "Update" : "Cancel";
  };

  const renderTableForm = () => {
    setStatus(status === "table" ? "form" : "table");
  };

  return (
    <section className="all-course py-2">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9 account-page">
            <h2 className="py-2">Information</h2>
            <button className={`btn my-3 profile-btn ${status === "table" ? "btn-warning" : "btn-danger"}`} onClick={renderTableForm}>
              {renderBtn()}
            </button>
            <div className={`profile-table profile-item ${status === "table" ? "active" : ""}`}>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td width="25%">Name</td>
                    <td>John Doe</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>john.doe@example.com</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>123-456-7890</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>123 Main St, Anytown, USA</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>Created time</td>
                    <td>01/01/2020 12:00:00</td>
                  </tr>
                  <tr>
                    <td>Activation time</td>
                    <td>01/01/2020 12:00:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form className={`profile-table profile-item ${status === "form" ? "active" : ""}`} method="POST">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td width="25%">Name</td>
                    <td>
                      <input type="text" name="name" className="form-control" placeholder="Enter name..." defaultValue="John Doe" />
                      <span className="error error-name text-danger"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                      <input type="text" name="email" className="form-control" placeholder="Enter Email..." defaultValue="john.doe@example.com" />
                      <span className="error error-email text-danger"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>
                      <input type="text" name="phone" className="form-control" placeholder="Enter phone..." defaultValue="123-456-7890" />
                      <span className="error error-phone text-danger"></span>
                    </td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>
                      <input type="text" name="address" className="form-control" placeholder="Enter Address..." defaultValue="123 Main St, Anytown, USA" />
                      <span className="error error-address text-danger"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="btn-update btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;