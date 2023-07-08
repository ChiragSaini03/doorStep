import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

const UpdateProduct = (props) => {
  const url = "https://door-step.vercel.app";
  const navigate = useNavigate();
  //States:-
  const [cat, setCat] = useState(props.item.categories);
  const [p_name, setPname] = useState(props.item.product_name);
  const [p_image, setPimage] = useState(props.item.image);
  const [qty, setQty] = useState(props.item.quantity);
  const [price, setPrice] = useState(props.item.price);
  const [stock, setStock] = useState(props.item.stock);
  const [about, setAbout] = useState(props.item.about);
  const [discount, setDiscount] = useState(props.item.discount);
  // const [V_name, setV_name] = useState("Invalid User");
  // console.log(props.vendor_data);
  //checking login is succesfull or not :-
  useEffect(() => {
    if (!props.item._id) {
      navigate("/Login");
      alert("your session has been terminated !!!");
    }
  }, []);
  //  Handelers:-
  const cat_handler = (event) => {
    setCat(event.target.value);
  };
  const pname_handler = (event) => {
    setPname(event.target.value);
  };
  const pimage_handler = (event) => {
    setPimage(event.target.value);
  };
  const quantity_handler = (event) => {
    setQty(event.target.value);
  };
  const price_handler = (event) => {
    setPrice(event.target.value);
  };
  const stock_handler = (event) => {
    setStock(event.target.value);
  };
  const about_handler = (event) => {
    setAbout(event.target.value);
  };
  const discount_handler = (event) => {
    setDiscount(event.target.value);
  };
  const submit_handeler = () => {
    // const str = p_name;

    // p_name.charAt(0).toUpperCase() + p_name.slice(1).toLowerCase();
    // const mySentence = "freeCodeCamp is an awesome resource";

    const words = p_name.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    const cap_p_name = words.join(" ");
    const pid = props.item._id;
    const list = {
      pid,
      cat,
      cap_p_name,
      p_image,
      qty,
      price,
      stock,
      about,
      discount,
    };
    console.log(list);
    axios.post(url + "/update/product", list).then((res) => {
      if (res.data == "false") {
        alert("Unable to update Product Details");
      } else {
        alert("Your Product Details Has Been SuccessFully updated");
        navigate("/view_products");
      }
    });
  };
  return (
    <div>
      <nav className="Search_Nav p-2 bg-gray-50 border-2 fixed w-full flex flex-col md:flex-row z-40">
        <NavLink to="/Vendor_Home" className="Nav_Logo m-3">
          Door Step
        </NavLink>
      </nav>
      <br></br>
      <div className="pt-16 dark:bg-slate-600">
        <form className="m-6">
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="categories"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="categories"
                value={cat}
                onChange={cat_handler}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" selected>
                  -- Select Category --
                </option>
                <option>Dairy</option>
                <option>Vegetable</option>
                <option>Fruits</option>
                <option>Groceries</option>
                <option>Snacks</option>
              </select>
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                value={p_name}
                onChange={pname_handler}
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product"
                required
              ></input>
            </div>
            <div>
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Image Link
              </label>
              <input
                type="url"
                value={p_image}
                onChange={pimage_handler}
                id="image"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://images.com/photo-1503023345310"
                required
              ></input>
            </div>
            <div>
              <label
                for="desc"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="desc"
                value={about}
                onChange={about_handler}
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="About the product..."
              ></textarea>
            </div>
            <div>
              <label
                for="quan"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantity
              </label>
              <input
                type="string"
                value={qty}
                onChange={quantity_handler}
                id="quan"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="100 g,kg,lit"
                required
              ></input>
            </div>
            <div>
              <label
                for="price"
                classc="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price per unit
              </label>
              <input
                type="number"
                step="10"
                value={price}
                onChange={price_handler}
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="100"
                required
              ></input>
            </div>
            <div>
              <label
                for="stock"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock
              </label>
              <input
                type="number"
                step="1"
                id="stock"
                value={stock}
                onChange={stock_handler}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="flowbite.com"
                required
              ></input>
            </div>
            <div>
              <label
                for="discount"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Discont (%){" "}
              </label>
              <input
                type="number"
                step="10"
                value={discount}
                onChange={discount_handler}
                id="discount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="15"
                required
              ></input>
            </div>
          </div>
          <button
            type="button"
            value="Update"
            onClick={submit_handeler}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
