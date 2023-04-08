
import { Link } from "react-router-dom";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";



const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <Container style={{ height: '100vh' }}>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="mb-4 text-center">Reset Password</h2>

          <Form onSubmit={resetPassword}>

            <Form.Control
              className="mb-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Reset Password"}
            </Button>
          </Form>

          <div className="mt-3 text-center d-flex justify-content-between">
            <p>
              <Link to="/login">Login</Link>
            </p>
            <p>
              <Link to="/register">Register</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Reset;
