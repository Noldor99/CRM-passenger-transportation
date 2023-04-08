import React from "react";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "40px" }}
    >
      &copy; {year} All Rights Reserved
    </div>
  );
};

export default Footer;
