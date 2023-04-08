import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/auth/Login";
import Reset from "./pages/auth/Reset";
import Message from "./pages/user/message/Message";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/dashboard/Dashboard";
import Favourite from "./pages/user/favourite/Favourite";
import Tickets from "./pages/user/tickets/Tickets";
import TripDetails from "./pages/user/tripDetails/TripDetails";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/notFound/NotFound";
import Admin from "./pages/admin/Admin";
import AdminOnlyRoute from "./utils/adminOnlyRoute/AdminOnlyRoute";

import Settings from "./pages/user/settings/Settings";
import Transaction from "./pages/user/transaction/Transaction";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />

        <Route path="CRM-passenger-transportation" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="favourite" element={<Favourite />} />
          <Route path="message" element={<Message />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tripdetails/:id" element={<TripDetails />} />

          <Route
            path="admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
