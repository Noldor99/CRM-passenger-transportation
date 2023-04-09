import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, STORE_USERS } from "../../../store/slice/userSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { Table, Image, Button, Container } from "react-bootstrap";

const UserList = () => {
  const { data, isLoading } = useFetchCollection("users");
  const users = useSelector(selectUsers);
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      STORE_USERS({
        users: data,
      })
    );
  }, [dispatch, data]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete User!!!",
      "You are about to delete this user",
      "Delete",
      "Cancel",
      function okCb() {
        deleteUser(id, imageURL);
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

  const deleteUser = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "users", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No user found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Image</th>
              <th>Name</th>
              <th>role</th>
              <th>email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const { id, displayName, email, photoURL, role } = user;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={photoURL}
                      alt={displayName}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{displayName}</td>
                  <td>{role}</td>
                  <td>{email}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="success"
                        onClick={() =>
                          navigate(
                            `/CRM-passenger-transportation/admin/addUser/${id}`
                          )
                        }
                      >
                        <FaEdit size={20} />
                      </Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => confirmDelete(id, displayName)}
                      >
                        <FaTrashAlt size={18} />
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
  );
};

export default UserList;
