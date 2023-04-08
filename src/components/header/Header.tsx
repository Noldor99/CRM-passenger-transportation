import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../../store/slice/authSlice";
import { useState } from "react";
import { AdminOnlyLink } from "../../utils/adminOnlyRoute/AdminOnlyRoute";
import ShowOnLogin, { ShowOnLogout } from "../../utils/hiddenLink/hiddenLink";


const Header = () => {
  const [displayName, setdisplayName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName == null) {
          //@ts-ignore
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        //@ts-ignore
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  return (
    <Navbar variant="dark" style={{ background: "#141627" }}>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <ShowOnLogout>
          <Nav.Link onClick={() => navigate("/login")}>login</Nav.Link>
        </ShowOnLogout>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        <AdminOnlyLink>
          <Button onClick={() => navigate("admin/home")}>Admin</Button>
        </AdminOnlyLink>
      </Nav>
      <Form className="d-flex pt-5px">
        <ShowOnLogin>
          <p className="w-100 m-1" style={{ color: "#ff7722" }}>
            Hi, {displayName}
          </p>
        </ShowOnLogin>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    </Navbar>
  );
};

export default Header;
