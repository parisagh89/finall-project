import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import { MdDone } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useMemo } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ChangeProfile() {
  const token = useSelector((state) => state.token);
  const islogin = useSelector((state) => state.islogin);
  const navigate = useNavigate();

  const [userinfo, setuserinfo] = useState([
    {
      value: "",
      Istouch: false,
      error: "firstname must be at least 3 characters",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: "lastname must be at least 3 characters ",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: "gender is not valid ",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: " age must be greater than or equal to 15",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,
      error: "city must be at least 3 characters",
      isvalid: false,
    },
  ]);
  const handleInputChange = (e, x) => {
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

  const req = async () => {
    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname: userinfo[0].value,
          lastname: userinfo[1].value,
          gender: userinfo[2].value,
          age: userinfo[3].value,
          city: userinfo[4].value,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
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
    } catch (error) {
      console.log(error.response.data);
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
  useEffect(() => {
   
  }, [islogin]);
  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <Row className="w-100 d-flex justify-content-center align-items-center  ">
        <Col md="6" sm="12" lg="6" className="chprofile ">
          <Form
            onSubmit={(e) => {
              return e.preventDefault();
            }}
          >
            <Row className="mb-4">
              <Col md="12" lg="12" sm="12">
                <p className="fs-3 p-3 "> change profile info:</p>

                <MDBInput
                  className="proinput "
                  id="form6Example1"
                  label="First name"
                  onFocus={() => setIstouchfalse(0)}
                  onChange={(e) => {
                    handleInputChange(e, 0);
                  }}
                  onBlur={() => {
                    setuserinfo((last) => {
                      const help = JSON.parse(JSON.stringify(last));
                      help[0].value.length >= 3
                        ? (help[0].isvalid = true)
                        : (help[0].isvalid = false);
                      help[0].Istouch = true;

                      return [...help];
                    });
                  }}
                />
                {userinfo[0].Istouch && !userinfo[0].isvalid && (
                  <span className="pt-1 pb-3 display-error">
                    {userinfo[0].error}
                  </span>
                )}
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md="12" lg="12" sm="12">
                <MDBInput
                  className="proinput  "
                  id="form6Example2"
                  label="Last name"
                  onFocus={() => setIstouchfalse(1)}
                  onChange={(e) => {
                    handleInputChange(e, 1);
                  }}
                  onBlur={() => {
                    setuserinfo((last) => {
                      const help = JSON.parse(JSON.stringify(last));
                      help[1].value.length >= 3
                        ? (help[1].isvalid = true)
                        : (help[1].isvalid = false);
                      help[1].Istouch = true;

                      return [...help];
                    });
                  }}
                />
                {userinfo[1].Istouch && !userinfo[1].isvalid && (
                  <span className="pt-1 pb-3 display-error">
                    {userinfo[1].error}
                  </span>
                )}
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md="12" lg="12" sm="12">
                <Form.Select
                  className=" p-sm-2 proinput selector w-100"
                  style={{ backgroundColor: "inherit" }}
                  aria-label="Default select example"
                  onFocus={() => setIstouchfalse(2)}
                  onChange={(e) => {
                    handleInputChange(e, 2);
                  }}
                  onBlur={() => {
                    setuserinfo((last) => {
                      const help = JSON.parse(JSON.stringify(last));
                      help[2].value.length != 0
                        ? (help[2].isvalid = true)
                        : (help[2].isvalid = false);
                      help[2].Istouch = true;

                      return [...help];
                    });
                  }}
                >
                  <option>Gender</option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                </Form.Select>
                {userinfo[2].Istouch && !userinfo[2].isvalid && (
                  <span className="pt-1 pb-3 display-error">
                    {userinfo[2].error}
                  </span>
                )}
              </Col>
            </Row>

            <MDBInput
              wrapperClass="mb-4"
              className="proinput"
              type="number"
              id="form6Example3"
              label="Age"
              onFocus={() => setIstouchfalse(3)}
              onChange={(e) => {
                handleInputChange(e, 3);
              }}
              onBlur={() => {
                setuserinfo((last) => {
                  const help = JSON.parse(JSON.stringify(last));
                  help[3].value >= 15
                    ? (help[3].isvalid = true)
                    : (help[3].isvalid = false);
                  help[3].Istouch = true;

                  return [...help];
                });
              }}
            />

            {userinfo[3].Istouch && !userinfo[3].isvalid && (
              <span className="pt-1 pb-3 display-error">
                {userinfo[3].error}
              </span>
            )}
            <MDBInput
              wrapperClass="mb-4"
              type="text"
              id="form6Example5"
              label="City"
              onFocus={() => setIstouchfalse(4)}
              onChange={(e) => {
                handleInputChange(e, 4);
              }}
              onBlur={() => {
                setuserinfo((last) => {
                  const help = JSON.parse(JSON.stringify(last));
                  help[4].value.length >= 3
                    ? (help[4].isvalid = true)
                    : (help[4].isvalid = false);
                  help[4].Istouch = true;

                  return [...help];
                });
              }}
            />
            {userinfo[4].Istouch && !userinfo[4].isvalid && (
              <span className="py-3 display-error">{userinfo[4].error}</span>
            )}

            <Button
              className="mb-4 w-100"
              variant="secondary"
              type="submit"
              block
              onClick={() => {
                userinfo.filter((item) => item.isvalid === false).length
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
                  : req();
              }}
            >
              Done <MdDone size={30} />{" "}
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer style={{ width: "50rem" }} />
    </Container>
  );
}
