import React from "react";
import Manager from "./Manager";
import { AuthContext } from "../../context/authContext";
import {
  Navigate
} from "react-router-dom";
import { useContext } from "react";


const ManagerRoute = () => {
  const { currentUser } = useContext(AuthContext);

  const isAdmin = currentUser.roleId;
  if (isAdmin == 2) {
    return <Manager />;
  } else {
    // Redirect to a different page if the user is not an admin
    return <Navigate to="/" />;
  }
};

export default ManagerRoute;
