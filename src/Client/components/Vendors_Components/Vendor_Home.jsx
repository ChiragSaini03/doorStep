import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Vendor_Home = (props) => {
  const navigate = useNavigate();
  //States:-
  const [cat, setCat] = useState("");
  const [p_name, setPname] = useState("");
  const [p_image, setPimage] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState(0.0);
  const [stock, setStock] = useState(0);
  const [about, setAbout] = useState("");
  const [discount, setDiscount] = useState(0);
  // const [V_name, setV_name] = useState("Invalid User");
  // console.log(props.vendor_data);
  //checking login is succesfull or not :-
  useEffect(() => {
    if (!props.vendor_data.name) {
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
    const sid = props.vendor_data.email;
    const list = {
      sid,
      cat,
      cap_p_name,
      p_image,
      qty,
      price,
      stock,
      about,
      discount,
    };
    setCat("");
    setAbout("");
    setDiscount(0);
    setPimage("");
    setPname("");
    setQty("");
    setStock(0);
    setPrice(0);
    console.log(list);
    axios.post("http://localhost:3001/api/product", list);
  };
  return (
    <div>
      <nav className="Search_Nav p-2 bg-gray-50 border-2 fixed w-full flex flex-col md:flex-row z-40">
        <NavLink to="/Vendor_Home" className="Nav_Logo m-3">
          Door Step
        </NavLink>
        <div className="flex md:ml-auto ml-0 md:mr-auto mr-0 w-5/6 align-middle">
          <div className="flex flex-col md:flex-row flex-wrap md:ml-auto ml-0 align-middle">
            <div className="info m-3">{props.vendor_data.name}</div>
            <NavLink className="info m-3" to="/view_products">
              {" "}
              View Products{" "}
            </NavLink>
            <NavLink className="info m-3" to="/manage_order">
              {" "}
              Manage Orders{" "}
            </NavLink>
            <NavLink to="/" className="m-3">
              <button
                onClick={() => {
                  props.clear_cust();
                }}
              >
                LogOut
              </button>
            </NavLink>
          </div>
        </div>
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
          <input type="button" value="Upload" onClick={submit_handeler}></input>
        </form>
      </div>
    </div>
  );
};

export default Vendor_Home;
