import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Table, Button, Image, Container } from "react-bootstrap";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { selectTrips, STORE_TRIPS } from "../../../store/slice/tripSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";

import React from "react";

const AllTrip = () => {
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

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Trip!!!",
      "You are about to delete this trip",
      "Delete",
      "Cancel",
      function okCb() {
        deleteTrip(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteTrip = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "trips", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Trip deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Container>
        <h2>All Trips</h2>

        <div>
          <p>
            <b>{trips?.length}</b> trips found
          </p>
        </div>

        {trips.length === 0 ? (
          <p>No trip found.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>desc</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, index) => {
                const { id, name, price, imageURL, desc } = trip;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{desc}</td>
                    <td>{`$${price}`}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/CRM-passenger-transportation/admin/addTrip/${id}`}
                        >
                          <Button variant="success">
                            <FaEdit size={20} color="white" />
                          </Button>
                        </Link>
                        &nbsp;
                        <Button
                          variant="danger"
                          onClick={() => confirmDelete(id, imageURL)}
                        >
                          <FaTrashAlt size={18} color="white" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default AllTrip;
