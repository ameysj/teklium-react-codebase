import React from "react";
import { Link } from "react-router-dom";
import { FooterLinks } from "../../../Constants/FooterLinks/Footer.Data";
const FooterNavlink = () => {
  const renderLinks = FooterLinks.map((item) => {
    return <li key ={item.name}>
                <Link to={`${item.to}`}>{item.name}</Link>
           </li>
  })
  return (
    <div>
      <ul className="footer-link">
        {renderLinks}
      </ul>
    </div>
  );
};

export default FooterNavlink;
