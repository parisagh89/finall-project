import { Type } from "react-bootstrap-icons";

export const cart = (state = [], { type, payload }) => {
  switch (type) {
    case "ADDTOCART":
      return payload;
    case "REMOVEITEM":
      return payload;
    case "REMOVEALLITEM":
      return payload;
    case "EMPTYCART":
      return payload;
    default:
      return state;
  }
};
export const token = (state = "", { type, payload }) => {
  switch (type) {
    case "GETTOKEN":
      return payload;
    case "REMOVEtOKEN":
      return payload;
    default:
      return state;
  }
};
export const islogin = (state = false, { type, payload }) => {
  switch (type) {
    case "ISLOGIN":
      return payload;

    default:
      return state;
  }
};
