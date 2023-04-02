import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function OrderDetail() {
  const { orderId } = useParams();
  const [allOrder, setallOrder] = useState([]);
  const [addresDetail, setdetail] = useState({});
  const [Data, setData] = useState({});

  const token = useSelector((state) => state.token);
  const islogin = useSelector((state) => state.islogin);
  const navigate = useNavigate();

  const req = async () => {
    try {
      const { data } = await axios.get(
        `http://kzico.runflare.run/order/${orderId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      const { orderItems } = data;
      const { shippingAddress } = data;
      setdetail(shippingAddress);
      setallOrder(orderItems);
      setData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    
    req();
  }, [islogin]);

  return (
    <section className="h-100 h-custom section">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">Order details</MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1 fs-4" style={{ color: "#913175" }}>
                          Cart item :
                        </p>
                      </div>
                    </div>
                    {allOrder.map((item) => {
                      return (
                        <MDBCard className="mb-3  orderDetail_card " key={item._id}>
                          <MDBCardBody>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    className="rounded-3 orderDetail-cardimg "
                                    src={item.product.image}
                                  />
                                </div>
                                <div className="ms-3">
                                  <MDBTypography tag="h5">
                                    {item.product.name}{" "}
                                  </MDBTypography>
                                  <p className="small mb-0">qty : {item.qty}</p>

                                  <p className="small mb-0">
                                    brand : {item.product.brand}
                                  </p>
                                  <p className="small mb-0">
                                    color :{item.product.color}{" "}
                                  </p>

                                  <p className="small mb-0">
                                    {item.product.description}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: "80px" }}>
                                  <MDBTypography tag="h5" className="mb-0">
                                    ${item.product.price}
                                  </MDBTypography>
                                </div>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      );
                    })}
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="bg-secondary text-white rounded-3">
                      <MDBCardBody>
                        <MDBTypography tag="h5" className="mb-0">
                          Address :{addresDetail.address}
                        </MDBTypography>
                        <hr />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">city</p>
                          <p className="mb-2">{addresDetail.city}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Phone</p>
                          <p className="mb-2">{addresDetail.phone}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">PostalCode</p>
                          <p className="mb-2">{addresDetail.postalCode}</p>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">paymentMethod</p>
                          <p className="mb-2">{Data.paymentMethod}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">shippingPrice</p>
                          <p className="mb-2">{Data.shippingPrice}</p>
                        </div>

                        <div className="orderdet_box d-flex justify-content-between p-2 mb-2">
                          <h5 className="fw-bold mb-0">Total:</h5>
                          <h5 className="fw-bold mb-0">$2261</h5>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
