import React from "react";
import Admin from "./Admin";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {
  Navigate
} from "react-router-dom";
import { useContext } from "react";


const AdminRoute = () => {
  const { currentUser } = useContext(AuthContext);

  const isAdmin = currentUser.roleId;
  if (isAdmin == 1) {
    return <Admin />;
  } else {
    // Redirect to a different page if the user is not an admin
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
