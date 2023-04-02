import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';




function PrivateRoute({ children }) {
    // const isLogin = useSelector((state) => state.islogin);
  const isLogin=  localStorage.getItem("islogin");
   if(isLogin==="true"){
return children
   }else{
    return  <Navigate to="*"  />
   }
 


}
 export default PrivateRoute