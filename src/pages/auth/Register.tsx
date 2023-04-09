import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";
import React from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // Create user document in Firestore
        addDoc(collection(db, "users"), {
          email: user.email,
          displayName: "User" + Math.floor(Math.random() * 1000),
          photoURL: '',
          role: 'user',
          createdAt: Timestamp.now().toDate(),
        });

        setIsLoading(false);
        toast.success("Registration Successful...");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <Container style={{ height: '100vh' }}>
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} sm={8} md={6} lg={4} >
          <h2 className="mb-4 text-center">Register</h2>

          <Form onSubmit={registerUser}>

            <Stack style={{
              display: 'flex', flexDirection: 'column', gap: '10px'
            }}>

              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>

            </Stack>

          </Form>

          <div className="mt-3 text-center">
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </Col>
      </Row>
    </Container >
  );
};

export default Register;
