import React from "react";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import {
  BsLayoutThreeColumns,
  BsCardChecklist,
  BsHeart,
  BsChat,
  BsCreditCard,
  BsGear,
  BsBoxArrowRight,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { Logo } from "../../assets/Logo";
import ShowOnLogin from "../../utils/hiddenLink/hiddenLink";
import { AdminOnlyLink, UserOnlyLink } from "../../utils/adminOnlyRoute/AdminOnlyRoute";
import { FaColumns, FaMapMarkerAlt, FaShoppingCart, FaUsers } from "react-icons/fa";
import { BiTrip } from 'react-icons/bi';

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/CRM-passenger-transportation/dashboard");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Col className="d-flex w-100" style={{ background: "#141627" }}>
      <Navbar variant="dark" className="d-flex flex-column pt-2">
        <Logo />

        <Nav
          className="flex-column"
          style={{ justifyContent: "space-around", flexGrow: 1 }}
        >
          <AdminOnlyLink>
            <Nav.Link onClick={() => navigate("admin/home")}>
              <FaColumns /> Home
            </Nav.Link>
            <Nav.Link onClick={() => navigate("admin/allTrip")}>
              <BiTrip /> AllTrip
            </Nav.Link>
            <Nav.Link onClick={() => navigate("admin/addTrip/ADD")}>
              <BiTrip /> AddTrip
            </Nav.Link>
            <Nav.Link onClick={() => navigate("admin/orders")}>
              <FaShoppingCart /> Orders
            </Nav.Link>
            <Nav.Link onClick={() => navigate("admin/addUser/ADD")}>
              <FaUsers /> AddUser
            </Nav.Link>
            <Nav.Link onClick={() => navigate("admin/userList")}>
              <FaUsers /> UserList
            </Nav.Link>
          </AdminOnlyLink>
          <UserOnlyLink>
            <Nav.Link onClick={() => navigate("dashboard")}>
              <BsLayoutThreeColumns /> Dashboard
            </Nav.Link>
            <Nav.Link onClick={() => navigate("tickets")}>
              <BsCardChecklist /> My Tickets
            </Nav.Link>
            <Nav.Link onClick={() => navigate("favourite")}>
              <BsHeart /> Favourite
            </Nav.Link>
            <Nav.Link onClick={() => navigate("message")}>
              <BsChat /> Message
            </Nav.Link>
            <Nav.Link onClick={() => navigate("transaction")}>
              <BsCreditCard /> Transaction
            </Nav.Link>
            <Nav.Link onClick={() => navigate("settings")}>
              <BsGear /> Settings
            </Nav.Link>
          </UserOnlyLink>
          <ShowOnLogin>
            <Nav.Link href="#" onClick={logoutUser}>
              <BsBoxArrowRight /> Logout
            </Nav.Link>
          </ShowOnLogin>
        </Nav>
      </Navbar>
    </Col>
  );
};

export default Sidebar;
