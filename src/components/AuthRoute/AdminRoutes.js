import React from "react";

const AdminRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.foundUser?.isAdmin ? true : false;
  if (!isAdmin) return <h1>Access Denied, Admin Only</h1>
  return <>{children}</>;
};
export default AdminRoutes;
