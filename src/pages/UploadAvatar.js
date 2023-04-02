import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function UploadAvatar() {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const islogin = useSelector((state) => state.islogin);
  const [pic, setpic] = useState(null);
  const req = async () => {
    const formData = new FormData();
    formData.append("profile-image", pic);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      const { message } = data;
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
      });
    } catch (error) {
      const { message } = error.response.data;

      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
    }
  };

  return (
    <div className="avatar_container">
      <form className="avatar_form" onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label  className="fs-3">upload your avatar</Form.Label>
          <Form.Control
            type="file"
            size="sm"
            onChange={(e) => setpic(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="secondary"  type="submit" onClick={req}>
          upload profile Image
        </Button>
      </form>
      <ToastContainer style={{ width: "50rem" }} />
    </div>
  );
}
