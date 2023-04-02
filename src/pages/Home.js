import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import "./../style.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import React from "react";
import "./../loader.css";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardHeader,
} from "mdb-react-ui-kit";

const Home = () => {
  const [page, setpage] = useState(1);
  const [pageinate, setpageinate] = useState([]);
  const [Data, setData] = useState({ product: [], loading: false, error: "" });
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const pagenum = [];

  const scroll = useRef();
  const req = async () => {
    try {
      setData((last) => {
        return { ...last, loading: true };
      });
      const { data } = await axios.get("http://kzico.runflare.run/product/");

      setData((last) => {
        return { ...last, product: [...data], loading: false };
      });

      for (let i = 1; i <= Math.ceil(data.length / 6); i++) {
        pagenum.push(i);
      }
      setpageinate([...pagenum]);
    } catch (error) {
      setData((last) => {
        return { ...last, error: error.message };
      });
    }
  };

  useEffect(() => {
    req();
    window.scrollTo({ top: "1rem", behavior: "smooth" });
  }, [page]);

  return (
    <div className="App">
      {Data.loading ? (
        <div className="loaderContainer">
          {" "}
          <span className="loader">Loading</span>
        </div>
      ) : (
        <>
          <div className="section homeSection" ref={scroll}>
            <Container
              style={{
                padding: "0 3rem",
                border: "3px solid #f6f6f8",
                borderRadius: "20px",
              }}
            >
              <Row>
                {Data.product.slice((page - 1) * 6, page * 6).map((item) => {
                  return (
                    <Col md="6" lg="4" className="my-5 glass " key={item._id}>
                      <div
                        className="homeCard "
                        onClick={() => {
                          navigate(`/product/${item._id.toString()}`);
                        }}
                      >
                        <div className="p-3">
                          <img className="card-image" src={item.image} />
                        </div>
                        <div class="card-Text d-flex justify-content-center align-items-center ">
                          <div>
                            <h5>{item.name}</h5>
                            <p>countInStock : {item.countInStock}</p>
                          </div>
                        </div>
                        <div className="lastSec d-flex justify-content-between">
                          <p>price:${item.price}</p>
                          <p>rating:{item.rating}</p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>

              <div
                className="pagination "
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "2rem  0",
                }}
              >
                <div>
                  <span
                    className="number sidebtn "
                    onClick={() => {
                      page === pageinate[0]
                        ? setpage(1)
                        : setpage((last) => last - 1);
                    }}
                  >
                    {" "}
                    <BsChevronDoubleLeft />
                    <span className="nxpre">privious</span>
                  </span>
                </div>

                <div>
                  {pageinate.map((item, index) => {
                    return (
                      <span
                        className={
                          item == page ? "pagination-active number" : "number"
                        }
                        onClick={() => setpage(item)}
                        key={index}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
                <div>
                  <span
                    className="number sidebtn"
                    onClick={() => {
                      page === pageinate[pageinate.length - 1]
                        ? setpage(1)
                        : setpage((last) => last + 1);
                    }}
                  >
                    <span className="nxpre">next</span>
                    <BsChevronDoubleRight />
                  </span>
                </div>
              </div>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
