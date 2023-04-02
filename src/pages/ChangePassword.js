import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import { MdDone } from "react-icons/md";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const islogin = useSelector((state) => state.islogin);
  const navigate = useNavigate();

  const [password, setpassword] = useState([
    {
      value: "",
      Istouch: false,
      error: "please enter your  password ",
      isvalid: false,
    },
    {
      value: "",
      Istouch: false,

      error_regex: "your  password is not valid",

      isvalid_regex: false,
    },
  ]);
  const passwordregex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const token = useSelector((state) => state.token);
  const req = async () => {
    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password: password[0].value,
          new_password: password[1].value,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
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
  const handleInputChange = (e, x) => {
    setpassword((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[x].value = e.target.value.trim();
      return [...help];
    });
  };
  const setIstouchfalse = (x) => {
    setpassword((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[x].Istouch = false;
      return [...help];
    });
  };
  const setIstouchtrue = (x) => {
    setpassword((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[x].Istouch = true;
      return [...help];
    });
  };
  useEffect(() => {
 
  }, [islogin]);
  return (
    <div className="pass_container">
      <div className="chpassword">
        <form
          className="passwordform "
          onSubmit={(e) => {
            return e.preventDefault();
          }}
        >
          <p className="fs-3 p-3 "> change your password:</p>

          <div className="pass_item">
            {" "}
            <MDBInput
              className="mb-4"
              type="text"
              id="form1Example1"
              label="old Password "
              onFocus={() => setIstouchfalse(0)}
              onChange={(e) => {
                handleInputChange(e, 0);
              }}
              onBlur={() => {
                setpassword((last) => {
                  const help = JSON.parse(JSON.stringify(last));
                  help[0].value.length != 0
                    ? (help[0].isvalid = true)
                    : (help[0].isvalid = false);
                  help[0].Istouch = true;

                  return [...help];
                });
              }}
            />
            {password[0].Istouch && !password[0].isvalid && (
              <span className="pt-1 pb-3 display-error">
                {password[0].error}
              </span>
            )}
          </div>
          <div className="pass_item">
            {" "}
            <MDBInput
              className="mb-4"
              type="password"
              id="form1Example2"
              label=" new Password"
              onFocus={() => setIstouchfalse(1)}
              onBlur={() =>
                setpassword((last) => {
                  const help = JSON.parse(JSON.stringify(last));

                  passwordregex.test(help[1].value)
                    ? (help[1].isvalid_regex = true)
                    : (help[1].isvalid_regex = false);
                  help[1].Istouch = true;
                  return [...help];
                })
              }
              onChange={(e) => {
                handleInputChange(e, 1);
              }}
            />
            {password[1].Istouch && !password[1].isvalid_regex && (
              <span className="pt-1 pb-3 display-error">
                {password[1].error_regex}
              </span>
            )}{" "}
          </div>

          <div className="pass_item">
            {" "}
            <Button
              className=" w-100"
              type="submit"
              variant="secondary"
              onClick={() => {
                req();
              }}
            >
              done <MdDone size={30} />{" "}
            </Button>
          </div>
        </form>
        <ToastContainer style={{ width: "50rem" }} />
      </div>
    </div>
  );
}
