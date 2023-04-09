import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectEmail } from "../../store/slice/authSlice";

const initialState = {
  carNumber: "",
  phone: 0,
  date: "",
};

const ModalTrip = () => {
  const [product, setProduct] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const email = useSelector(selectEmail);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      addDoc(collection(db, "orders"), {
        email: email,
        carNumber: product.carNumber,
        phone: Number(product.phone),
        date: product.date,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setProduct({ ...initialState });
      toast.success("Product uploaded successfully.");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addProduct}>
            <Form.Group controlId="formCarNumber">
              <Form.Label>Car Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car number"
                name="carNumber"
                value={product.carNumber}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={product.phone}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={product.date}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalTrip;
