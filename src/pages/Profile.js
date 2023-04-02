import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pictest from "./../img/1.jpg";

export default function Profile() {
  const [proInfo, setProInfo] = useState({});
  const token = useSelector((state) => state.token);
  const islogin = useSelector((state) => state.islogin);
  const navigate = useNavigate();

  const getprofile = async () => {
    try {
      const {
        data: { user },
      } = await axios.get("http://kzico.runflare.run/user/profile", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(user);
      setProInfo(user);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
 
    getprofile();
  }, [islogin]);
  return (
    // <section className="h-200 proShow  section d-flex justify-content-center align-items-center">
      <div className="ProContainer section">
        <div className="content">
          <div className="p-5 ProContainer">
            <img src={proInfo.image} className="proImg" />
          </div>
          <p className="ProName">
            {proInfo.firstname} {proInfo.lastname}
          </p>
          <div className="m-5 p-3 user_info">
            <div>
              <p>Email:</p>
              <p>User name</p>
              <p>Mobile</p>
              <p>First name</p>
              <p>Last name</p>
              <p>Gender</p>
              <p>Age</p>
              <p>city</p>
            </div>
            <div>
              <p>{proInfo.email}</p>
              <p>{proInfo.username}</p>
              <p>{proInfo.mobile}</p>
              <p>{proInfo.firstname}</p>
              <p>{proInfo.lastname}</p>
              <p>{proInfo.gender}</p>
              <p>{proInfo.age}</p>
              <p>{proInfo.city}</p>
            </div>
          </div>
        </div>
      </div>
    // </section>
  );
}
