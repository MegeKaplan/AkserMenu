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

  console.log(JSON.parse(localStorage.getItem("userData")));

  return (
    <div>
      {menu.map((category, index) => (
        <div
          key={category.$id}
          className={`${
            index % 2 === 0 ? "bg-red-50" : "bg-red-100"
          } flex flex-col items-center`}
        >
          <h1 className="w-full h-20 flex items-center justify-center font-bold text-3xl">
            {category.name}
          </h1>
          <img src={category.imageUrl} alt="" />
          <ul className="w-full">
            {category.products.map((product) => (
              <li
                key={product.$id}
                className="w-full h-16 flex flex-row items-center justify-between px-4 font-semibold border-b border-red-200"
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
