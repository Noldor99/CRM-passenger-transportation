import React, { useEffect, useState } from "react";

import CardVisa from "../cardVisa/CardVisa";
import { Row, Col, Container } from "react-bootstrap";
import useFetchCollection from "../../customHooks/useFetchCollection";

import {
  selectTrips,
  STORE_TRIPS,
} from "../../store/slice/tripSlice";
import { useSelector, useDispatch } from "react-redux";
const ListsVisa = () => {


  const { data, isLoading } = useFetchCollection("trips");
  const trips = useSelector(selectTrips);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_TRIPS({
        trips: data,
      })
    );

  }, [dispatch, data]);

  return (
    <Container className="pt-3">
      <Row>
        {/* @ts-ignore */}
        {trips?.map((item) => (
          <Col className="pb-3" key={item.id}>
            <CardVisa
              img={item.imageURL}
              name={item.name}
              price={item.price}
              desc={item.desc}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListsVisa;
