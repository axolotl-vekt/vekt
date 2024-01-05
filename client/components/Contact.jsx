import React from "react";
import Navbar, { items } from "./Navbar";

const Contact = () => {
  return (
    <div>
      <div>
        <Navbar items={items} />
      </div>
      <h1>Contact Us</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name</h5>
          <p className="card-text">Amir Munoz</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Email</h5>
          <p className="card-text">
            <a href="mailto:amir034@gmail.com">amir034@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name</h5>
          <p className="card-text">Jarod Crawford</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Email</h5>
          <p className="card-text">
            <a href="mailto:crawfojm04@gmail.com">crawfojm04@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name</h5>
          <p className="card-text">Sean Nguyen</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Email</h5>
          <p className="card-text">
            <a href="mailto:seannguyennn@gmail.com">seannguyennn@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name</h5>
          <p className="card-text">Solomon Moon</p>
        </div>
        <div className="card-body">
          <h5 className="card-title">Email</h5>
          <p className="card-text">
            <a href="mailto:chochobo91@gmail.com">chochobo91@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
