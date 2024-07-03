import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import axios from "axios";

const Nav = () => {
  const [menuListState, setMenuListState] = useState(false);
  const [menu, setMenu] = useState([]);

  const menuListToggle = () => {
    menuListState ? setMenuListState(false) : setMenuListState(true);
  };

  const getMenu = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
      setMenu(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <nav className="w-full h-16 flex flex-row items-center justify-between px-4 sticky z-50">
        <h1 className="text-2xl text-red-800 font-bold">AkserMenu</h1>
        <FaBars size={25} onClick={menuListToggle} className="cursor-pointer" />
      </nav>
      <div
        onClick={menuListToggle}
        className={`${
          menuListState ? "bg-black bg-opacity-50 size-full" : "size-0"
        } fixed top-0 left-0 z-40 flex justify-center`}
      >
        {menuListState && (
          <ul className="w-11/12 fixed bg-opacity-50 bg-gray-100 backdrop-blur-sm rounded-md p-3 flex flex-col items-center justify-center mt-16 last:border-b-0">
            {menu.map((category) => (
              <li key={category.$id} className="w-full h-16 border-b border-gray-800 first:border-t text-xl hover:bg-gray-800 hover:bg-opacity-25 transition">
                <a className="w-full h-full flex items-center justify-center" href={"#" + category.$id}>
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Nav;
