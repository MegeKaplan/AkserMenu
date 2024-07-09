import React from "react";
import Menu from "../components/Menu";
import Nav from "../components/Nav";

const Admin = () => {
  return (
    <div>
      <Nav />
      <Menu isAdmin={true} />
    </div>
  );
};

export default Admin;
