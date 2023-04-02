import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./../product.css";
import { Badge, Button } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addingTocart, decrementqty } from "../redux/action";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Border } from "react-bootstrap-icons";
export default function Product() {
  const [cartNum, setcartNum] = useState(1);
  // const [Data, setData] = useState({});
  const [Data, setData] = useState({ product: {}, loading: false, error: "" });

  // const[outOfstock , setoutOfstock]=useState(false)
  const dispatch = useDispatch();
  const cartContent = useSelector((state) => {
    return state.cart;
  });
  const { ProductId } = useParams();
  let getqty = [];
  const req = async () => {
    try {
      setData((last) => {
        return { ...last, loading: true };
      });
      const { data } = await axios.get(
        `http://kzico.runflare.run/product/${ProductId}`
      );
    
      setData((last) => {
        return { ...last, product: {...data}, loading: false };
      });
      const getCartdata = JSON.parse(localStorage.getItem("cart"));
      getqty = getCartdata.filter((item) => item._id == data._id);
      console.log(data);

      setcartNum(getqty[0].qty);
    } catch (error) {
      console.log(error.message);
      setData((last) => {
        return { ...last, error: error.message };
      });
    }
  };

  useEffect(() => {
    req();
  }, []);

  return (
    <>
    {Data.loading ? (
      <div className="loaderContainer">
      
        <span className="loader">Loading</span>
      </div>
    ) : (
   
      <div className="containerp section">
        <div className="sections " style={{ backgroundColor: "white" }}>
          <div className="  leftSec  p_5 ">
            <p className="p-3 fs-4">{Data.product.name}</p>
            <p className="countInStock fs-6 p-1  ">
              {" "}
              countInStock: {Data.product.countInStock}
            </p>
            <p className="price fs-4 p-3">
              PRICE : <span>&#36;</span>
              {Data.product.price}
            </p>

            {cartContent.filter((item) => item._id === Data.product._id).length &&
            cartNum != 0 ? (
              <div className="btndiv fs-5">
                {cartNum === 1 ? (
                  <MdDelete
                    size={28}
                    className="pointer"
                    onClick={() => {
                      setcartNum((last) => last - 1);
                      dispatch(decrementqty(Data.product));
                      console.log(cartContent);
                    }}
                  />
                ) : (
                  <AiOutlineMinus
                    className="pointer"
                    size={25}
                    onClick={() => {
                      setcartNum((last) => last - 1);
                      dispatch(decrementqty(Data.product));
                      console.log(cartContent);
                    }}
                  />
                )}
                {cartNum}
                <AiOutlinePlus
                  className="pointer"
                  size={25}
                  style={
                    Data.product.countInStock <= cartNum
                      ? { color: "#FFF1DC" }
                      : { color: "inherit" }
                  }
                  onClick={() => {
                    Data.product.countInStock <= cartNum
                      ? console.log(cartContent)
                      : setcartNum((last) => last + 1);

                    Data.product.countInStock <= cartNum
                      ? console.log(cartContent)
                      : dispatch(addingTocart(Data.product));
                  }}
                />{" "}
              </div>
            ) : !Data.product.countInStock ? (
              <span> out Of stock</span>
            ) : (
              <div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    dispatch(addingTocart(Data.product));
                    setcartNum(1);
                  }}
                >
                  <BsCart3 /> ADD TO CART
                </Button>
              </div>
            )}
          </div>
          <div className=" ">
            <img className=" productImg" src={Data.product.image}></img>
          </div>
          <div className=" secItem ">
            <p className="fs-3 ">brand : {Data.product.brand}</p>

            <p className="fs-3 ">Rating : {Data.product.rating}</p>
            <span className="fs-3 ">
              color:{" "}
              <span
                className="circle"
                style={{ backgroundColor: `${Data.product.color}` }}
              >
                &nbsp;
              </span>
            </span>

            <p className="fs-3 format pb-2">category : {Data.product.category}</p>

            <p className="fs-4 p-4">{Data.product.description}</p>
          </div>
        </div>
      </div>)}
    </>
  );
}
