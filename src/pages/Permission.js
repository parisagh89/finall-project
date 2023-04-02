import React from "react";
import { useSelector } from "react-redux";

export default function Permission() {
  const islogin = useSelector((state) => state.islogin);
  return (
    <div>
      <div className="section d-flex justify-content-center align-items-center">
        <div className=" permition fs-4">
          {" "}
          "You do not have permission to access this page"{" "}
        </div>{" "}
      </div>
    </div>
  );
}
