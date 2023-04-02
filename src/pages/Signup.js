import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { SiGnuprivacyguard } from "react-icons/si";
import { GrMail } from "react-icons/gr";
import { FaKey, FaMobileAlt } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import pic7 from "./../img/7.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () => {
  const [confirmPass, setconfirmPass] = useState("");
  const islogin = useSelector((state) => state.islogin);
  const navigate = useNavigate();

  const [userinfo, setuserinfo] = useState([
    {
      value: "",
      Istouch: false,
      error: "'username must be at least 5 characters'",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: "your email is not valid ",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: "your  password is not valid ",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: "your phonenumber is not valid ",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: "Passwords are not same",
      isvalid: false,
    },
  ]);

  const sendata = async () => {
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/signup",
        {
          username: userinfo[0].value,
          email: userinfo[1].value,
          password: userinfo[2].value,
          mobile: userinfo[3].value,
        }
      );
      const { message } = data;
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
      });
      setuserinfo((last) => {
        const help = JSON.parse(JSON.stringify(last));
        help[0].value = "";
        help[1].value = "";
        help[2].value = "";
        help[3].value = "";
        help[4].value = "";
        return [...help];
      });
   
      setTimeout(() => {
        navigate("/");
      }, 5000);
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

  const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordregex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const mobileregex = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;
  const handleInputChange = (e, x) => {
    // const fieldName = e.target.name;

    setuserinfo((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[x].value = e.target.value.trim();
      return [...help];
    });
  };
  const setIstouchfalse = (x) => {
    setuserinfo((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[x].Istouch = false;
      return [...help];
    });
  };
  const setIstouchtrue = (x) => {
    setuserinfo((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[x].Istouch = true;
      return [...help];
    });
  };
  const toas = () => {};

  return (
    <MDBContainer className=" section d-flex justify-content-center align-items-center">
      {islogin ? (
        <div className="permition fs-4">
          "You do not have permission to access this page"{" "}
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex align-items-center justify-content-center">
            <MDBCard className="text-black " style={{ borderRadius: "25px" }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    md="12"
                    lg="6"
                    className="order-md-0 pt-5  d-flex flex-column align-items-center"
                  >
                    <div className="d-flex flex-row align-items-center mb-4 ">
                      <BsFillPersonFill size={30} className="me-3" />
                      <MDBInput
                        value={userinfo[0].value}
                        label="Username"
                        id="form1"
                        type="text"
                        className="w-100 pl-3"
                        onFocus={() => setIstouchfalse(0)}
                        onChange={(e) => {
                          handleInputChange(e, 0);
                        }}
                        onBlur={() => {
                          setuserinfo((last) => {
                            const help = JSON.parse(JSON.stringify(last));
                            help[0].value.length >= 5
                              ? (help[0].isvalid = true)
                              : (help[0].isvalid = false);
                            help[0].Istouch = true;

                            return [...help];
                          });
                        }}
                      />
                    </div>
                    {userinfo[0].Istouch && !userinfo[0].isvalid && (
                      <span className="pt-1 pb-3 display-error">
                        {userinfo[0].error}
                      </span>
                    )}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <GrMail size={30} className="me-3" />
                      <MDBInput
                        label="Your Email"
                        id="form2"
                        type="email"
                        value={userinfo[1].value}
                        onFocus={() => setIstouchfalse(1)}
                        onChange={(e) => {
                          handleInputChange(e, 1);
                        }}
                        onBlur={() => {
                          setuserinfo((last) => {
                            const help = JSON.parse(JSON.stringify(last));
                            help[1].isvalid = emailregex.test(help[1].value);
                            help[1].Istouch = true;
                            return [...help];
                          });
                        }}
                      />
                    </div>

                    {userinfo[1].Istouch &&
                      !userinfo[1].isvalid &&
                      userinfo[1].value.length > 0 && (
                        <span className="pt-1 pb-3 display-error">
                          {userinfo[1].error}
                        </span>
                      )}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <SiGnuprivacyguard size={30} className="me-3" />
                      <MDBInput
                        label="Password"
                        id="form3"
                        type="password"
                        value={userinfo[2].value}
                        onFocus={() => setIstouchfalse(2)}
                        onChange={(e) => {
                          handleInputChange(e, 2);
                        }}
                        onBlur={() => {
                          setuserinfo((last) => {
                            const help = JSON.parse(JSON.stringify(last));
                            help[2].isvalid = passwordregex.test(help[2].value);
                            help[2].Istouch = true;
                            return [...help];
                          });
                        }}
                      />
                    </div>
                    {userinfo[2].Istouch &&
                      !userinfo[2].isvalid &&
                      userinfo[2].value.length > 0 && (
                        <span className=" pt-1 pb-3 display-error">
                          {userinfo[2].error}
                        </span>
                      )}

                    <div className="d-flex flex-row align-items-center mb-4">
                      <FaKey size={30} className="me-3" />
                      <MDBInput
                        label="Repeat your password"
                        id="form4"
                        type="password"
                        value={userinfo[4].value}
                        onFocus={() => setIstouchfalse(4)}
                        onBlur={() =>
                          setuserinfo((last) => {
                            const help = JSON.parse(JSON.stringify(last));
                            help[4].value === help[2].value
                              ? (help[4].isvalid = true)
                              : (help[4].isvalid = false);
                            help[4].Istouch = true;
                            return [...help];
                          })
                        }
                        onChange={(e) => {
                          handleInputChange(e, 4);
                        }}
                      />
                    </div>
                    {userinfo[4].Istouch && !userinfo[4].isvalid && (
                      <span className="pt-1 pb-3 display-error">
                        {userinfo[4].error}
                      </span>
                    )}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <FaMobileAlt size={30} className="me-3" />
                      <MDBInput
                        label="mobile"
                        id="form4"
                        type="text"
                        value={userinfo[3].value}
                        onChange={(e) => {
                          handleInputChange(e, 3);
                        }}
                        onFocus={() => setIstouchfalse(3)}
                        onBlur={() =>
                          setuserinfo((last) => {
                            const help = JSON.parse(JSON.stringify(last));
                            help[3].isvalid = mobileregex.test(help[3].value);
                            help[3].Istouch = true;
                            return [...help];
                          })
                        }
                      />
                    </div>
                    {userinfo[3].Istouch &&
                      !userinfo[3].isvalid &&
                      userinfo[3].value.length > 0 && (
                        <span className="pt-1 pb-3 display-error">
                          {userinfo[3].error}
                        </span>
                      )}

                    <Button
                      variant="secondary"
                      size="lg"
                      type="submit"
                      onClick={() => {
                        userinfo.filter(
                          (item) =>
                            item.isvalid === false || item.value.length === 0
                        ).length
                          ? toast.success("Please fix the errors", {
                              position: "top-center",
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              // theme: "light",
                              theme: "colored",

                              type: "error",
                            })
                          : sendata();
                      }}
                    >
                      Sign up
                    </Button>
                  </MDBCol>

                  <MDBCol
                    md="10"
                    lg="6"
                    className="order-1 order-lg-2 d-flex align-items-center"
                  >
                    <MDBCardImage className="signup_img" src={pic7} fluid />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </div>
        </form>
      )}
      <ToastContainer style={{ width: "50rem" }} />
    </MDBContainer>
  );
};
export default Signup;
