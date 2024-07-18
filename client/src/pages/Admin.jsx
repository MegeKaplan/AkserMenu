import React from "react";
import Menu from "../components/Menu";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Admin = () => {
  return (
    <div>
      <Nav />
      <Menu isAdmin={true} />
      <Footer />
    </div>
  );
};

export default Admin;
