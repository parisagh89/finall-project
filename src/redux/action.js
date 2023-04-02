import { useState } from "react";

export const addingTocart = (payload) => (dispatch, getstate) => {
  const { cart } = getstate();

  const y = cart.filter((item) => item._id == payload._id);

  if (y[0]) {
    y[0].qty++;

    const help = JSON.parse(JSON.stringify(cart));
    dispatch({ type: "ADDTOCART", payload: [...help] });

    localStorage.setItem("cart", JSON.stringify([...help]));
  } else {
    const help = JSON.parse(JSON.stringify(cart));

    dispatch({ type: "ADDTOCART", payload: [...help, { ...payload, qty: 1 }] });
    localStorage.setItem(
      "cart",
      JSON.stringify([...help, { ...payload, qty: 1 }])
    );
  }
};
export const decrementqty = (payload) => (dispatch, getstate) => {
  const { cart } = getstate();
  const findObj = cart.filter((item) => item._id == payload._id);
  if (findObj[0].qty != 1) {
    findObj[0].qty--;
    const help = JSON.parse(JSON.stringify(cart));
    dispatch({ type: "REMOVEITEM", payload: [...help] });
    localStorage.setItem("cart", JSON.stringify([...help]));
  } else {
    const cartitem = cart.filter((item) => item._id !== payload._id);
    const help = JSON.parse(JSON.stringify(cartitem));
    dispatch({ type: "REMOVEITEM", payload: [...help] });
    localStorage.setItem("cart", JSON.stringify([...help]));
  }
};
export const removeAllItem = (payload) => (dispatch, getstate) => {
  const { cart } = getstate();
  const cartitem = cart.filter((item) => item._id !== payload._id);
  const help = JSON.parse(JSON.stringify(cartitem));
  dispatch({ type: "REMOVEALLITEM", payload: [...help] });
  localStorage.setItem("cart", JSON.stringify([...help]));
};
export const emptyCart = () => (dispatch, getstate) => {
  dispatch({ type: "EMPTYCART", payload: [] });
  localStorage.removeItem("cart");
};
export const gettoken = (payload) => (dispatch, getstate) => {
  const { token } = getstate();
  dispatch({ type: "GETTOKEN", payload });
  localStorage.setItem("token", payload);
};
export const removeToken = () => (dispatch, getstate) => {
  dispatch({ type: "REMOVEtOKEN", payload: "" });
  localStorage.removeItem("token");
};
export const Islogin = (payload) => (dispatch, getstate) => {
  dispatch({ type: "ISLOGIN", payload });
  localStorage.setItem("islogin", payload);

};

