import React from "react";
import { Route, Routes } from "react-router-dom";
import AddTrip from "../../components/admin/addTrip/AddTrip";
import AllTrip from "../../components/admin/allTrip/AllTrip";
import Home from "../../components/admin/home/Home";
import Orders from "../../components/admin/orders/Orders";
import UserList from "../../components/admin/userList/UserList";

const Admin = () => {
  return (
    <div  >
      <div>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="allTrip" element={<AllTrip />} />
          <Route path="addTrip/:id" element={<AddTrip />} />
          <Route path="orders" element={<Orders />} />
          <Route path="userList" element={<UserList />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
