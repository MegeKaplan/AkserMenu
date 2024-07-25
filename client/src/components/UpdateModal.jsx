import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

let menuId;
try {
  if (
    process.env.REACT_APP_MENU_ID.toString() ===
    JSON.parse(localStorage.userData).menuId.toString()
  ) {
    menuId = JSON.parse(localStorage.userData).menuId;
  } else {
    menuId = "testsubdomain";
  }
} catch (error) {
  console.log(error);
}

const UpdateModal = (props) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    type: "product",
    name: "",
    price: "",
    category: props.data.category.$id,
  });

  const handleUpdateInputChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const updateProduct = async (categoryId, itemId = "") => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/menu/${menuId}/${itemId}`,
        {
          type: "product",
          name: updatedProduct.name,
          price: updatedProduct.price,
          category: categoryId,
        }
      );
      setUpdatedProduct({ type: "product", name: "", price: "", category: "" });
      toast.success(response.data.msg, toastifyConfig);
      props.setUpdateModalData({ state: false, category: {}, product: {} });
      await props.getMenu();
    } catch (error) {
      toast.warning(error.response.data.msg, toastifyConfig);
    }
  };

  return (
    <>
      {props.data.state && (
        <div className="bg-black bg-opacity-50 size-full z-50 fixed top-0 left-0 flex justify-center">
          <div className="w-11/12 fixed bg-opacity-50 bg-gray-100 backdrop-blur-sm rounded-md p-3 flex flex-col items-center justify-center mt-16 last:border-b-0 space-y-6 py-10">
            <div>
              <label htmlFor="name">Ürün İsmi</label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleUpdateInputChange}
                value={updatedProduct.name}
                placeholder={props.data.product.name}
                className="input_style w-full opacity-60"
              />
            </div>
            <div>
              <label htmlFor="name">Ürün Fiyatı</label>
              <input
                id="price"
                type="text"
                name="price"
                onChange={handleUpdateInputChange}
                value={updatedProduct.price}
                placeholder={props.data.product.price + "₺"}
                className="input_style w-full opacity-60"
              />
            </div>
            <button
              onClick={() =>
                updateProduct(props.data.category.$id, props.data.product.$id)
              }
              className="button_style px-4 ml-4 bg-emerald-400 hover:bg-emerald-500"
            >
              Güncelle
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModal;
