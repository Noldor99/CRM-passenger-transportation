import React from "react";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { Table } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectEmail } from "../../../store/slice/authSlice";

const Tickets = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const email = useSelector(selectEmail);
  const filteredReviews = data.filter((review) => review.email === email);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Car Number</th>
          <th>Date</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {filteredReviews.map((item, index) => (
          <tr key={index}>
            <td>{item.carNumber}</td>
            <td>{item.date}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tickets;
