import React from "react";
import Logo from "../../../assets/images/logo.jpg";

const FooterAddress = () => {
  return (
    <div className="footer-address">
      <div className="footer-logo">
        <img src={`${Logo}`}/>
      </div>
      <p className="street-address">
        <span>
          <i className="fa fa-address-book" aria-hidden="true"></i>
        </span>
        <span className="landmark">
          1151 Pittsford Victor Rd #200
          New York(NY), 14534
        </span>
      </p>
      <div className="footer-email">
        <span>
          <i className="fa fa-envelope" aria-hidden="true"></i>
        </span>
        <span>support@elink.com</span>
      </div>
      <div className="footer-phone">
        <p>
          <i className="fa fa-phone" aria-hidden="true"></i> +1 800 559 6580{" "}
        </p>
      </div>
    </div>
  );
};

export default FooterAddress;
