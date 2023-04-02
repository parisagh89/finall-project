import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import pic3 from "./../img/3.jpg";
import axios from "axios";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { emptyCart } from "../redux/action";

export default function Checkout() {
  const [totalprice, settotalprice] = useState(0);

  const cart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.token);
  const islogin = useSelector((state) => state.islogin);
  const navigate = useNavigate();

  const [completed, setcompleted] = useState(false);
  const dispatch = useDispatch();
  const address = JSON.parse(localStorage.getItem("deliverInfo"));
  let total = 0;
  const gettotalprice = () => {
    cart.map((item) => {
      total += item.price * item.qty;
    });
    total=Math.round((total + Number.EPSILON) * 100) / 100
  };

  const orderitem = [];
  const test = cart.map((item) => {
    return { product: item._id, qty: item.qty };
  });

  const req = async () => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems: [...test],
          shippingAddress: {
            address: address.address,
            city: address.city,
            postalCode: address.postalCode,
            phone: address.phonenumber,
          },
          paymentMethod: "ship",
          shippingPrice: "0",
          totalPrice: totalprice,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setcompleted(true);
      toast("your order has been completed", {
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
      dispatch(emptyCart());
    } catch (error) {
      console.log(error.response.data);
      const { message } = error.response.data;
      let errorMessage = "";
      message.map((item) => (errorMessage += item + "&"));

      toast(errorMessage, {
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
  useEffect(() => {
   
    gettotalprice();
    settotalprice(total);
  }, [completed, islogin]);
  return (
    <div className="section">
      <section className="h-100 gradient-custom">
        <MDBContainer className=" h-100">
          <MDBRow className="justify-content-center my-4">
            <MDBCol md="8">
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Cart items
                  </MDBTypography>
                </MDBCardHeader>

                {cart.map((item) => {
                  return (
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                          <MDBRipple
                            rippleTag="div"
                            rippleColor="light"
                            className="bg-image rounded hover-zoom hover-overlay"
                          >
                            <img src={item.image} className="w-100 item_img" />
                            <a href="#!">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                              ></div>
                            </a>
                          </MDBRipple>
                        </MDBCol>

                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                          <p>
                            <strong>{item.name}</strong>
                          </p>
                          <p>brand: {item.brand}</p>
                          <p>color: {item.color}</p>
                          <p>qty: {item.qty}</p>
                        </MDBCol>
                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                          <p className="text-start text-md-center">
                            <strong>${item.price}</strong>
                          </p>
                        </MDBCol>
                      </MDBRow>
                      <hr className="my-4" />
                    </MDBCardBody>
                  );
                })}
              </MDBCard>
            </MDBCol>

            <MDBCol md="4">
              <MDBCard className="mb-4">
                <MDBCardHeader>
                  <MDBTypography tag="h5" className="mb-0">
                    Checkout Form
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBCol
                    md="12"
                    className="d-flex flex-row justify-content-center"
                  >
                    <MDBCardImage src={pic3} fluid className="" />
                  </MDBCol>
                  <MDBListGroup flush>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      City
                      <span>{address.city}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className=" border-0 d-flex justify-content-between align-items-center px-0">
                      Postalcode:
                      <span>{address.postalCode}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className=" border-0 d-flex justify-content-between align-items-center px-0">
                      Phonenumber:
                      <span>{address.phonenumber}</span>
                    </MDBListGroupItem>
                    <hr className="my-4" />
                    <MDBListGroupItem className=" border-0 px-0 mb-3">
                      <div>
                        <strong>Address : </strong>
                      </div>
                      <span>
                        <strong>{address.address}</strong>
                      </span>
                    </MDBListGroupItem>
                    <hr className="my-4" />

                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-1 mb-3 cart_totalprice">
                      <strong>Total price</strong>

                      <span>
                        <strong>${totalprice}</strong>
                      </span>
                    </MDBListGroupItem>
                  </MDBListGroup>
                  {completed ? (
                    <span className="fs-4">
                      "your order has been completed"
                    </span>
                  ) : (
                    <div className="d-flex justify-content-around">
                      <button
                        class="button-79 btnc "
                        role="button"
                        onClick={() => {
                          navigate("/Cart");
                        }}
                      >
                        <BsFillArrowLeftSquareFill size={15} /> Edit
                      </button>

                      <button
                        class="button-79 btnc  blue"
                        onClick={() => {
                          req();
                        }}
                      >
                        Done <TiTick className="iconbtn" />
                      </button>
                    </div>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <ToastContainer style={{ width: "50rem" }} />
      </section>
    </div>
  );
}
