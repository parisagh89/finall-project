import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Islogin, gettoken } from "../redux/action";
import "./../login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { TfiFaceSmile } from "react-icons/tfi";
const Login = () => {
  const [email, setemail] = useState("");
  const islogin = useSelector((state) => state.islogin);
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const req = async () => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/login",
        {
          email: email,
          password: password,
        }
      );
 
      dispatch(gettoken(data.user.token));
      dispatch(Islogin(true));
    
   
    
        navigate("/");
     
    } catch (error) {
      const { message } = error.response.data;

      console.log(error.response.data);
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
    <div className="section login_sec d-flex justify-content-center align-items-center">
      <div className="login_container">
        <MDBContainer className="p-3 my-5 d-flex flex-column ">
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />

          <MDBBtn className="mb-4" color="secondary" onClick={req}>
            login
          </MDBBtn>

          <div className="text-center">
            <p>
              Not a member?{" "}
              <Link className="register fs-4" to="/Signup">
                Register <TfiFaceSmile />
              </Link>
            </p>
          </div>
        </MDBContainer>
      </div>
      <ToastContainer style={{ width: "50rem" }} />
    </div>
  );
};
export default Login;
