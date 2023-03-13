import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

const UpdateProduct = (props) => {
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
    axios.post("http://localhost:3001/update/product", list).then((res) => {
      alert("Your Product Details Has Been SuccessFully updated");
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
      <div className="pt-16">
        <form className="Vendorsform">
          <label>Categories</label>
          <select value={cat} onChange={cat_handler}>
            <option value="">--Select Category--</option>
            <option>Dairy</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Groceries</option>
            <option>Snacks</option>
          </select>
          <label>Product Name</label>
          <input type="text" value={p_name} onChange={pname_handler}></input>
          <label>Product Image Link</label>
          <input type="text" value={p_image} onChange={pimage_handler}></input>
          <label>Quantity</label>
          <input type="text" value={qty} onChange={quantity_handler}></input>
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={price_handler}
          ></input>
          <label>Stock</label>
          <input
            type="number"
            step="1"
            value={stock}
            onChange={stock_handler}
          ></input>
          <label>About</label>
          <textarea value={about} onChange={about_handler}></textarea>
          <label>Discount</label>
          <input
            type="number"
            step="1"
            value={discount}
            onChange={discount_handler}
          ></input>
          <input type="button" value="Update" onClick={submit_handeler}></input>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
