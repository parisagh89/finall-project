import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Address from "./pages/Address";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import Setting from "./pages/Setting";
import ChangePassword from "./pages/ChangePassword";
import UploadAvatar from "./pages/UploadAvatar";
import ChangeProfile from "./pages/ChangeProfile";
import Notfound from "./pages/Notfound";
import { useSelector } from "react-redux";
import Permission from "./pages/Permission";
import PrivateRoute from "./component/PrivateRoute";
import { useEffect } from "react";
function Router() {
  const state = useSelector((state) => state.islogin);
  const islogin=  localStorage.getItem("islogin");
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="product/:ProductId" element={<Product />} />
      <Route path="*" element={<Notfound />} />
      <Route path="/Login" element={islogin ==="true"? <Permission /> : <Login />} />
      <Route path="/Signup" element={islogin ==="true"?  <Permission /> : <Signup />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Address" element={<PrivateRoute> <Address /> </PrivateRoute>}
      />

      <Route path="/Checkout" element={ <PrivateRoute><Checkout /></PrivateRoute>} />
      <Route path="/Permission" element={<Permission />} />
      <Route path="/Profile" element={  <PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/Order" element={  <PrivateRoute><Order /></PrivateRoute>} />
      <Route path="/Order/:orderId" element={  <PrivateRoute><OrderDetail /></PrivateRoute>} />
      <Route path="/setting" element={  <PrivateRoute><Setting /></PrivateRoute>}>
        <Route path="changePassword" element={ <PrivateRoute><ChangePassword /></PrivateRoute>} />
        <Route path="uploadAvatar" element={ <PrivateRoute><UploadAvatar /></PrivateRoute>} />
        <Route path="ChangeProfile" element={ <PrivateRoute><ChangeProfile /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}

export default Router;
