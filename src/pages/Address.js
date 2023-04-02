import React, { useEffect, useState } from "react";
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
import pic1 from "./../img/1.jpg";
import { Last } from "react-bootstrap/esm/PageItem";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Address() {
  // const[islogin , setislogin]=useState(false)
  const [deliverInfo, setdeliverInfo] = useState([
    {
      value: "",
      Istouch: false,
      error: "city must be at least 2 characters",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: "address must be at least 10 characters ",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: "postalCode is not valid ",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: " your phonenumber is not valid ",
      isvalid: false,
    },
  ]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
 const islogin= useSelector((state) => state.islogin);

  const mobileregex = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const postalcoderegex= /^[0-9]{10}$/;
  const handleInputChange = (e, x) => {
    setdeliverInfo((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[x].value = e.target.value.trim();
      return [...help];
    });
  };
  const setIstouchfalse = (x) => {
    setdeliverInfo((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[x].Istouch = false;
      return [...help];
    });
  };
  const setIstouchtrue = (x) => {
    setdeliverInfo((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[x].Istouch = true;
      return [...help];
    });
  };

  return (
    <div className="section">
      <MDBContainer style={{ maxWidth: "1100px" }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol>
              <MDBCard className="my-4 shadow-3">
                <MDBRow className="g-0">
                  <MDBCol md="6" className="d-xl-block bg-image ">
                    <MDBCardImage src={pic1} fluid className="align-middle" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBCardBody className="p-md-5 text-black">
                      <MDBTypography tag="h3" className="mb-4 text-uppercase">
                        Delivery Info
                      </MDBTypography>

                      <MDBInput
                        label="City"
                        type="text"
                        className="mb-4"
                        size="lg"
                        onFocus={() => setIstouchfalse(0)}
                        onChange={(e) => {
                          handleInputChange(e, 0);
                        }}
                        onBlur={() => {
                          setdeliverInfo((last) => {
                            const help = JSON.parse(JSON.stringify(last));
                            help[0].value.length >= 2
                              ? (help[0].isvalid = true)
                              : (help[0].isvalid = false);
                            help[0].Istouch = true;

                            return [...help];
                          });
                        }}
                      />
                      {deliverInfo[0].Istouch && !deliverInfo[0].isvalid && (
                        <span className="pt-1 pb-3 display-error">
                          {deliverInfo[0].error}
                        </span>
                      )}

                      <MDBInput
                        label="Address"
                        type="text"
                        className="mb-4"
                        size="lg"
                        onFocus={() => setIstouchfalse(1)}
                        onChange={(e) => {
                          handleInputChange(e, 1);
                        }}
                        onBlur={() => {
                          setdeliverInfo((last) => {
                            const help = JSON.parse(JSON.stringify(last));
                            help[1].value.length >= 10
                              ? (help[1].isvalid = true)
                              : (help[1].isvalid = false);
                            help[1].Istouch = true;

                            return [...help];
                          });
                        }}
                      />
                      {deliverInfo[1].Istouch && !deliverInfo[1].isvalid && (
                        <span className="pt-1 pb-3 display-error">
                          {deliverInfo[1].error}
                        </span>
                      )}
                      <MDBRow>
                        <MDBCol md="6" className="mb-4">
                          <MDBInput
                            label="Postal Code"
                            type="text"
                            size="lg"
                            onFocus={() => setIstouchfalse(2)}
                            onChange={(e) => {
                              handleInputChange(e, 2);
                            }}
                            onBlur={() => {
                              setdeliverInfo((last) => {
                                const help = JSON.parse(JSON.stringify(last));
                                 help[2].isvalid = postalcoderegex.test( help[2].value)
                                 
                                // help[2].value.length >= 1 
                                //   ? (help[2].isvalid = true)
                                //   : (help[2].isvalid = false);
                                help[2].Istouch = true;

                                return [...help];
                              });
                            }}
                          />
                          {deliverInfo[2].Istouch &&
                            !deliverInfo[2].isvalid && (
                              <span className="pt-1 pb-3 display-error">
                                {deliverInfo[2].error}
                              </span>
                            )}
                        </MDBCol>
                        <MDBCol md="6" className="mb-4">
                          <MDBInput
                            label="Phone Number"
                            type="text"
                            size="lg"
                            onFocus={() => setIstouchfalse(3)}
                            onChange={(e) => {
                              handleInputChange(e, 3);
                            }}
                            onBlur={() => {
                              setdeliverInfo((last) => {
                                const help = JSON.parse(JSON.stringify(last));
                                help[3].isvalid = mobileregex.test(
                                  help[3].value
                                );

                                help[3].Istouch = true;

                                return [...help];
                              });
                            }}
                          />
                          {deliverInfo[3].Istouch &&
                            !deliverInfo[3].isvalid && (
                              <span className="pt-1 pb-3 display-error">
                                {deliverInfo[3].error}
                              </span>
                            )}
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-end pt-3">
                        <MDBBtn
                          size="lg"
                          type="submit"
                          className="ms-2"
                          style={{ backgroundColor: "gray" }}
                          onClick={() => {
                            deliverInfo.filter(
                              (item) =>
                                item.isvalid === false ||
                                item.value.length === 0
                            ).length
                              ? toast.success("Please fix the errors", {
                                  position: "top-center",
                                  autoClose: 5000,
                                  hideProgressBar: true,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "colored",

                                  type: "error",
                                })
                              : navigate("/Checkout");
                            localStorage.setItem(
                              "deliverInfo",
                              JSON.stringify({
                                city: deliverInfo[0].value,
                                address: deliverInfo[1].value,
                                postalCode: deliverInfo[2].value,
                                phonenumber: deliverInfo[3].value,
                              })
                            );
                          }}
                        >
                          Next
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
        <ToastContainer style={{ width: "50rem" }} />
      </MDBContainer>
    </div>
  );
}
