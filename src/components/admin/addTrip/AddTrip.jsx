import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, storage } from "../../../firebase/config";
import { Form, Button, Container } from "react-bootstrap";
import { selectTrips } from "../../../store/slice/tripSlice";

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  desc: "",
};

const UserList = () => {
  const { id } = useParams();
  const trips = useSelector(selectTrips);
  const tripEdit = trips.find((item) => item.id === id);
  console.log(tripEdit);

  const [trip, setTrip] = useState(() => {
    const newState = detectForm(id, { ...initialState }, tripEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setTrip({ ...trip, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addTrip = (e) => {
    e.preventDefault();
    // console.log(trip);
    setIsLoading(true);

    try {
      addDoc(collection(db, "trips"), {
        name: trip.name,
        imageURL: trip.imageURL,
        price: Number(trip.price),
        desc: trip.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setTrip({ ...initialState });

      toast.success("Trip uploaded successfully.");
      // navigate("/admin/all-trips");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editTrip = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (trip.imageURL !== tripEdit.imageURL) {
      const storageRef = ref(storage, tripEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "trips", id), {
        name: trip.name,
        imageURL: trip.imageURL,
        price: Number(trip.price),
        desc: trip.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Trip Edited Successfully");
      // navigate("/admin/all-trips");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Container>
        <h2>{detectForm(id, "Add New Trip", "Edit Trip")}</h2>
        <div>
          <Form onSubmit={detectForm(id, addTrip, editTrip)}>
            <Form.Group>
              <Form.Label>Trip name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Trip name"
                required
                name="name"
                value={trip?.name}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Trip image:</Form.Label>
              <div>
                {uploadProgress === 0 ? null : (
                  <div>
                    <div>
                      {uploadProgress < 100
                        ? `Uploading ${uploadProgress}`
                        : `Upload Complete ${uploadProgress}%`}
                    </div>
                  </div>
                )}

                <Form.Control
                  type="file"
                  accept="image/*"
                  placeholder="Trip Image"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />

                {trip.imageURL === "" ? null : (
                  <Form.Control
                    type="text"
                    placeholder="Image URL"
                    name="imageURL"
                    value={trip?.imageURL}
                    disabled
                  />
                )}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Trip price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Trip price"
                required
                name="price"
                value={trip?.price}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Trip Description</Form.Label>
              <Form.Control
                as="textarea"
                name="desc"
                required
                value={trip?.desc}
                onChange={(e) => handleInputChange(e)}
                cols="30"
                rows="10"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              {detectForm(id, "Save Trip", "Edit Trip")}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default UserList;
