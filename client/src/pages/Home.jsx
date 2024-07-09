import React from "react";
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Nav />
      <Menu isAdmin={false}/>
      <Footer/>
    </div>
  );
};

export default Home;
