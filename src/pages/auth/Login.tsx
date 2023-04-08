import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import React from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    // if (previousURL.includes("cart")) {
    // return navigate("/cart");
    // }
    navigate("/CRM-passenger-transportation/dashboard");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successful...");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Login with Goooglr
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        //@ts-ignore
        const userDocRef = doc(db, "users", user.email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          await updateDoc(userDocRef, {
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        } else {
          await addDoc(collection(db, "users"), {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        }
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="w-100 mb-3" variant="primary" type="submit">
            Log In
          </Button>
          <div className="d-flex justify-content-between">
            <Button variant="link"
              onClick={() => navigate("/reset")}>
              Forgot Password?</Button>
            <Button variant="link"
              onClick={() => navigate("/register")}>
              Register</Button>
          </div>
        </Form>
        <hr />
        <Button
          className="w-100 mt-3"
          variant="secondary"
          onClick={signInWithGoogle}
        >
          Login with Google
        </Button>
      </div>
    </Container>
  );
};

export default LoginForm;
