import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [Data, setData] = useState([]);
  const token = useSelector((state) => state.token);
  const islogin = useSelector((state) => state.islogin);

  const navigate = useNavigate();

  const req = async () => {
    try {
      const { data } = await axios.get("http://kzico.runflare.run/order/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setData(data);
      //   data.map((item)=>console.log(item))
      console.log(islogin);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
  
    req();
  }, [islogin]);
  return (
    <div className=" section showOrder">
      {Data.map((item) => {
        return (
          <div className="orderSec"  key={item._id} onClick={() => navigate(item._id)}>
            <div className="p-3 fs-4">order info:</div>
            <div
              className="d-flex justify-content-evenly border-bottom  flex-wrap
py-3 my-2 orderinfo_box"
            >
              <p className="fs-5">paymentMethod:{item.paymentMethod}</p>
              <p className="fs-5">shippingPrice:${item.shippingPrice}</p>
              <p className="fs-5">totalPrice:${item.totalPrice}</p>
            </div>
            <Row className="order_line">
              {item.orderItems.map((Item) => {
                return (
                  <Col md="4" className="mt-3" key={Item._id}>
                    <MDBCard className="order_card ">
                      <MDBCardImage
                        className="order-cardimg"
                        src={Item.product.image}
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody className="d-flex flex-column justify-content-between">
                        <MDBCardText>{Item.product.name}</MDBCardText>
                        <MDBCardText>
                          {" "}
                          Number:
                          {Item.qty}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>{" "}
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
    </div>
  );
}
