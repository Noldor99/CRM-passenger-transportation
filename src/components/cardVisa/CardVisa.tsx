import React from "react";
import { Card, Button } from "react-bootstrap";
import ModalTrip from '../modalTrip/ModalTrip'
const CardVisa = ({ img, name, price, desc }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{desc}</Card.Text>
        <div className="d-flex justify-content-between">
          <ModalTrip />
          <p>{price}$</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardVisa;
