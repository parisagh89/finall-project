import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { MdDelete } from "react-icons/md";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { addingTocart, decrementqty, removeAllItem } from "../redux/action";
import { cart } from "../redux/reducer";
import { useNavigate } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";

export default function Cart() {
  const [data, setData] = useState([]);
  const [totalprice, settotalprice] = useState(0);

  const cartData = useSelector((state) => {
    return state.cart;
  });
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const islogin = useSelector((state) => state.islogin);

  const navigate = useNavigate();
  let total = 0;
  const gettotalprice = () => {
    cartData.map((item) => {
      total += item.price * item.qty;
    });
        total=Math.round((total + Number.EPSILON) * 100) / 100

  };
  useEffect(() => {
    window.scrollTo({ top: "1rem", behavior: "smooth" });

    console.log("cartdata"+ cartData);
    gettotalprice();
    settotalprice(total);
    if (!cartData.length) {
      toast("The shopping cart is empty", {
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
  }, [cartData]);

  return (
    <div>
      {!cartData.length ? (
        <div className="d-flex justify-content-center section">
          {" "}
          <div className="chpassword">"The shopping cart is empty" </div>
        </div>
      ) : (
        <section
          className=" section "
          style={{ backgroundColor: "#eee", height: "200vh" }}
        >
          <MDBContainer className="py-3 pb-5 h-100">
            <MDBRow className="justify-content-center  h-100">
              <MDBCol md="10">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                    Shopping Cart
                  </MDBTypography>
                </div>
                {cartData.map((item, index) => {
                  return (
                    <MDBCard key={item._id} className="rounded-3 mb-4">
                      <MDBCardBody className="p-4">
                        <MDBRow className="justify-content-between align-items-center">
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              className=" item_img"
                              fluid
                              src={item.image}
                            
                            />
                          </MDBCol>
                          <MDBCol md="3" lg="3" xl="3">
                            <p className="lead fw-normal mb-2">{item.name}</p>
                            <p>
                              <span className="text-muted">brand: </span>
                              {item.brand}
                              <span className="text-muted"> color: </span>
                              {item.color}
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="3"
                            lg="3"
                            xl="2"
                            className="d-flex align-items-center justify-content-around"
                          >
                            <MDBBtn
                              color="link"
                              className="px-2"
                              style={
                                item.qty === 1
                                  ? { display: "none" }
                                  : { color: "link" }
                              }
                              onClick={() => {
                                dispatch(decrementqty(item));
                              }}
                            >
                              <BsFillCaretDownFill fas icon="minus" size={25} />
                            </MDBBtn>

                            <span>{item.qty} </span>
                            <MDBBtn
                              color="link"
                              className="px-2"
                              style={
                                item.countInStock <= item.qty
                                  ? { display: "none" }
                                  : { color: "link" }
                              }
                              onClick={() => {
                                dispatch(addingTocart(item));
                              }}
                            >
                              <BsFillCaretUpFill icon="plus" size={25} />
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                            <MDBTypography tag="h5" className="mb-0">
                              <span>&#36;</span>
                              {item.price}
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="1" lg="1" xl="1" className="text-end">
                            <MdDelete
                              fas
                              className="trash text-danger"
                              size={40}
                              onClick={() => {
                                dispatch(removeAllItem(item));
                              }}
                            />
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  );
                })}

                <MDBCard className="mb-4">
                  <MDBCardBody className="p-4 d-flex flex-row">
                    <MDBCol md="3" lg="3" xl="3">
                      <div className="cart_totalprice">
                        <p className="lead fw-normal mb-2 fs-3">
                          total price : <span>&#36;</span>
                          {totalprice}
                        </p>
                      </div>
                    </MDBCol>
                    <MDBCol md="3" lg="3" xl="9">
                      <div className="p-3 ">
                        <MDBBtn
                          className="ms-3 nex_btn"
                          color="secondary"
                          block
                          size="lg"
                          onClick={() => {
                            islogin && token
                              ? navigate("/Address")
                              : navigate("/Login");
                          }}
                        >
                          Next <GrLinkNext color="white" />
                        </MDBBtn>
                      </div>
                    </MDBCol>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      )}
      <ToastContainer style={{ width: "50rem" }} />
    </div>
  );
}
