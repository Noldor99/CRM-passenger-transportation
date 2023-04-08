import React, { FC, useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";


const LayoutComponent = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="d-flex w-100" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div
        className="d-flex flex-column justify-content-start w-100"
        style={{ minHeight: "100vh" }}
      >
        <Header />
        <div className="d-flex" style={{ flexGrow: 1 }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutComponent;
