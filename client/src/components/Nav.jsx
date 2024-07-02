import React from "react";
import { FaBars } from "react-icons/fa6";

const Nav = () => {
  const openMenuList = () => {};

  return (
    <nav className="w-full h-16 bg-slate-300 flex flex-row items-center justify-between px-4 sticky">
      <h1 className="text-2xl text-red-800 font-bold">AkserMenu</h1>
      <FaBars size={25} onClick={()=>openMenuList}/>
    </nav>
  );
};

export default Nav;
