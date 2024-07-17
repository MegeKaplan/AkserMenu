import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateModal from "./UpdateModal";

const toastifyConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const Menu = (props) => {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    type: "",
    name: "",
    price: 0,
    category: "",
    file: "",
  });
  const [updateModalData, setUpdateModalData] = useState({
    state: false,
    category: {},
    product: {},
  });
  const [newFile, setNewFile] = useState("no file selected!");

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

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const addItem = async (categoryId = "") => {
    setNewItem({
      type: "",
      name: "",
      price: 0,
      category: "",
      file: "",
    });
    try {
      if (categoryId !== "") {
        // setNewItem({
        //   type: "product",
        //   name: newItem.name,
        //   price: newItem.price,
        //   category: categoryId,
        // });
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/menu`,
          {
            type: "product",
            name: newItem.name,
            price: newItem.price,
            category: categoryId,
          }
        );
        toast.success(response.data.msg, toastifyConfig);
      } else {
        console.log(newFile);
        // setNewItem({
        //   type: "category",
        //   name: newItem.name,
        //   file: newFile,
        //   category: categoryId,
        // });

        const formData = new FormData();
        formData.append("type", "category");
        formData.append("name", newItem.name);
        formData.append("file", newFile);

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/menu`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        toast.success(response.data.msg, toastifyConfig);
      }
      await getMenu();
    } catch (error) {
      toast.warning(error.response.data.msg, toastifyConfig);
    }
  };

  const deleteItem = async (itemId = "") => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/menu/${itemId}`
      );
      toast.success(response.data.msg, toastifyConfig);
      await getMenu();
    } catch (error) {
      console.log(error);
      toast.warning(error.response.data.msg, toastifyConfig);
    }
  };

  // const isAdmin = localStorage.userData ? true : false;

  // const isAdmin = props.isAdmin;

  return (
    <div>
      <UpdateModal
        data={updateModalData}
        setUpdateModalData={setUpdateModalData}
        getMenu={getMenu}
      />
      {menu.map((category, index) => (
        <div
          id={category.$id}
          key={category.$id}
          className="flex flex-col items-center mb-4"
        >
          <div className="w-full flex flex-row items-center justify-center">
            <h1 className="text-center h-14 mt-4 flex items-center justify-center font-bold text-3xl">
              {category.name}
            </h1>
            {props.isAdmin && (
              <button
                onClick={() => deleteItem(category.$id)}
                className="button_style px-4 ml-4 mt-4"
              >
                Sil
              </button>
            )}
          </div>

          <img
            src={category.imageUrl}
            alt=""
            className="[clip-path:polygon(20%_0%,80%_0%,100%_20%,100%_100%,0%_100%,0%_20%)] w-12/12"
          />
          <ul
            className={`${
              index % 2 === 0 ? "bg-slate-100" : "bg-slate-100"
            } w-full flex flex-col items-center`}
          >
            {category.products.map((product) => (
              <li
                key={product.$id}
                className="w-11/12 h-16 flex flex-row items-center justify-between px-4 font-semibold border-b border-gray-200"
              >
                <span>{product.name}</span>
                {/* <input
                  type="text"
                  name="name"
                  onChange={handleUpdateInputChange}
                  value={updatedProduct.name}
                  placeholder={product.name}
                  className="input_style w-24"
                /> */}
                <div>
                  <span>{product.price}₺</span>
                  {/* <input
                    type="text"
                    name="price"
                    onChange={handleUpdateInputChange}
                    value={updatedProduct.price}
                    placeholder={product.price + "₺"}
                    className="input_style w-20"
                  /> */}
                  {props.isAdmin && (
                    <>
                      <button
                        onClick={() =>
                          setUpdateModalData({ state: true, category, product })
                        }
                        className="button_style px-4 ml-4 bg-emerald-400 hover:bg-emerald-500"
                      >
                        Güncelle
                      </button>
                      <button
                        onClick={() => deleteItem(product.$id)}
                        className="button_style px-4 ml-4"
                      >
                        Sil
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
            {props.isAdmin && (
              <li className="w-11/12 h-16 grid grid-cols-7 py-2 space-x-2 font-semibold border-b border-gray-200">
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Ürün Adı"
                  className="input_style col-span-4"
                />
                <input
                  type="text"
                  name="price"
                  onChange={handleInputChange}
                  placeholder="Ürün Fiyatı"
                  className="input_style col-span-2"
                />
                <button
                  onClick={() => addItem(category.$id)}
                  className="button_style col-span-1"
                >
                  Ekle
                </button>
              </li>
            )}
          </ul>
        </div>
      ))}
      {props.isAdmin && (
        <div className="w-full flex flex-col items-center my-10">
          <h1 className="text-2xl font-bold">Yeni Kategori Ekle</h1>
          <li className="w-11/12 h-16 grid grid-cols-7 py-2 space-x-2 font-semibold border-b border-gray-200">
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              placeholder="Kategori Adı"
              className="input_style col-span-4"
            />
            <input
              type="file"
              name="file"
              className="input_style col-span-2"
              // onChange={handleInputChange}
              onChange={handleFileChange}
              required
            />
            <button
              // type="submit"
              className="button_style col-span-1"
              onClick={() => addItem()}
            >
              Ekle
            </button>
          </li>
        </div>
      )}
    </div>
  );
};

export default Menu;
