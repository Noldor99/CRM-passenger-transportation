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
import { selectUsers } from "../../../store/slice/userSlice";

const initialState = {
  displayName: "",
  photoURL: "",
  email: "",
  role: "",
};

const AddUser = () => {
  const { id } = useParams();
  const users = useSelector(selectUsers);
  console.log(users);
  const userEdit = users.find((item) => item.id === id);
  console.log(userEdit);

  const [user, setUser] = useState(() => {
    const newState = detectForm(id, { ...initialState }, userEdit);
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
    setUser({ ...user, [name]: value });
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
          setUser({ ...user, photoURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addUser = (e) => {
    e.preventDefault();
    // console.log(user);
    setIsLoading(true);

    try {
      addDoc(collection(db, "users"), {
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        role: user.role,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setUser({ ...initialState });

      toast.success("User uploaded successfully.");
      // navigate("/admin/all-users");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (user.photoURL !== userEdit.photoURL) {
      const storageRef = ref(storage, `${userEdit.photoURL}`);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "users", id), {
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        role: user.role,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("User Edited Successfully");
      // navigate("/admin/all-users");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Container>
        <h2>{detectForm(id, "Add New User", "Edit User")}</h2>
        <div>
          <Form onSubmit={detectForm(id, addUser, editUser)}>
            <Form.Group>
              <Form.Label>User name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="User name"
                required
                name="name"
                value={user?.displayName}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>User image:</Form.Label>
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
                  placeholder="User Image"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />
                {user.photoURL === "" ? null : (
                  <Form.Control
                    type="text"
                    placeholder="Image URL"
                    name="photoURL"
                    value={user?.photoURL}
                    disabled
                  />
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>User email:</Form.Label>
              <Form.Control
                type="text"
                placeholder="User email"
                required
                name="email"
                value={user?.email}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>User role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                required
                value={user?.role}
                onChange={(e) => handleInputChange(e)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              {detectForm(id, "Save User", "Edit User")}
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default AddUser;
