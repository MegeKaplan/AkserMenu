import React from "react";
import Menu from "../components/Menu";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Admin = () => {
  let isAdmin;
  if (
    process.env.REACT_APP_MENU_ID === JSON.parse(localStorage.userData).menuId
  ) {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  console.log(process.env.REACT_APP_MENU_ID);
  console.log(JSON.parse(localStorage.userData).menuId);

  return (
    <div>
      <Nav />
      <Menu isAdmin={isAdmin} />
      <Footer />
    </div>
  );
};

export default Admin;
