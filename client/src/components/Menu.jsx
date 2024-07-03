import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [menu, setMenu] = useState([]);

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

  // console.log(JSON.parse(localStorage.getItem("userData")));

  return (
    <div>
      {menu.map((category, index) => (
        <div
          id={category.$id}
          key={category.$id}
          className="flex flex-col items-center mb-4"
        >
          <h1 className="w-full h-14 mt-4 flex items-center justify-center font-bold text-3xl">
            {category.name}
          </h1>
          <img
            src={category.imageUrl}
            alt=""
            className="[clip-path:polygon(20%_0%,80%_0%,100%_20%,100%_100%,0%_100%,0%_20%)] w-12/12"
          />
          <ul
            className={`${
              index % 2 === 0 ? "bg-slate-100" : ""
            } w-full flex flex-col items-center`}
          >
            {category.products.map((product) => (
              <li
                key={product.$id}
                className="w-11/12 h-16 flex flex-row items-center justify-between px-4 font-semibold border-b border-gray-200"
              >
                <span>{product.name}</span>
                <span>{product.price}₺</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Menu;
