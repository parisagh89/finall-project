import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../navbar.css";
import { BsFillHouseFill, BsFillPersonFill, BsCart4 } from "react-icons/bs";
import { cart } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { Islogin, NOTlogin, removeToken } from "../redux/action";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Dropdown } from "react-bootstrap";
import { ImProfile } from "react-icons/im";
import { BsFillBasketFill } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";
import { MdArrowBackIosNew } from "react-icons/md";
export default function Navbar() {
  const [active, setActive] = useState("Nav__menu");
  const [toggleIcon, settoggleIcon] = useState("nav__toggler");
  const navToggle = () => {
    active == "Nav__menu"
      ? setActive("Nav__menu nav__active")
      : setActive("Nav__menu");
    toggleIcon === "nav__toggler"
      ? settoggleIcon("nav__toggler toggle")
      : settoggleIcon("nav__toggler");
  };
  const [email, setemail] = useState("");

  const [cartnum, setcartnum] = useState(0);
  const cartData = useSelector((state) => {
    return state.cart;
  });
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const islogin = useSelector((state) => state.islogin);

  const getprofile = async () => {
    try {
      const { data } = await axios.get(
        "http://kzico.runflare.run/user/profile",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setemail(data.user.email);
      dispatch(Islogin(true));
    } catch (error) {
     console.log(error.response.data);
      dispatch(Islogin(false));
    }
  };
  const cartnumberitem = () => {
    setcartnum(0);
    cartData.map((item) => {
      setcartnum((last) => last + item.qty);
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    cartnumberitem();
    getprofile();
    console.log(islogin);
  }, [cartData, token, islogin]);
  return (
    <nav className="nav">
      <p className="nav__brand fs-2">DGshop</p>
      <ul className={active}>
        <li
          className={
            active == "Nav__menu nav__active"
              ? "Nav_items"
              : "Nav_items me-auto"
          }
        >
          <Link className="fs-4 Nav-link" to="/">
            <span className="homeformat">
              <BsFillHouseFill size={32} className="header_text" />
              Home
            </span>{" "}
          </Link>
        </li>
        <li className="Nav_items " style={{ position: "relative" }}>
          <Link className=" Nav-link " to="/Cart">
            <BsCart4 size={60} />{" "}
            <Badge
              className="cardNumbadg"
              bg="danger"
              style={{ position: "absolute", top: "37px", right: "-8px" }}
            >
              {cartnum}
            </Badge>
          </Link>
        </li>
        {islogin && token ? (
          <li className="">
            {" "}
            <Dropdown>
              <Dropdown.Toggle className="drop__down" id="dropdown-basic">
                {email}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to="/Profile"
                  className=" d-flex justify-content-between fs-5"
                >
                  <MdArrowBackIosNew className="backicon" />
                  profile
                  <ImProfile className="navicon" />
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/Order"
                  className="d-flex justify-content-between fs-5"
                >
                  {" "}
                  <MdArrowBackIosNew className="backicon" />
                  orders
                  <BsFillBasketFill className="navicon" />
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/setting/ChangeProfile"
                  className=" d-flex justify-content-between fs-5"
                >
                  {" "}
                  <MdArrowBackIosNew className="backicon" />
                  setting
                  <GrUserSettings className="navicon" />
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex justify-content-between fs-5"
                  onClick={() => {
                    dispatch(removeToken());
                    dispatch(Islogin(false));
                  }}
                >
                  <MdArrowBackIosNew className="backicon" />
                  log out
                  <TbLogout className="navicon" />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        ) : (
          <li className=" ">
            <Link className=" Nav-link login__email drop__down" to="/Login">
              {" "}
              <BsFillPersonFill size={25} /> login|sign up{" "}
            </Link>
          </li>
        )}
      </ul>
      <div
        onClick={() => {
          navToggle();
          console.log(islogin);
        }}
        className={toggleIcon}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
