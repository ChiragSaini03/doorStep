import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cart_Item from "./Cart_Item";

const Cart = (props) => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const display_cart = async (id) => {
    const response = await axios.post("http://localhost:3001/api/displaycart", {
      id,
    });
    console.log(response.data);
    if (response.data.empty) {
      alert("Please login First to place order");
      navigate("/");
    } else {
      const items_list = Object.entries(response.data);
      setItems((prev) => (prev = [...items_list]));
      console.log(items_list);
    }

    // set_cart(prev => prev={...response.data})
  };

  useEffect(() => {
    if (!props.cid.email) {
      alert("first Login to place ordes");
      navigate("/login");
    } else {
      display_cart(props.cid.email);
    }
  }, []);

  return (
    <div className="cart p-4">
      <NavLink to="/Customer_Home" >
      <button class="text-gray-900 bg-gradient-to-r from-[rgb(133,245,239)] via-[rgb(93,209,203)] to-[rgb(76,226,219)] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-8 mb-8">Back to Home</button>
      </NavLink>
      {items.map(
        (data) =>
          data[1] > 0 && (
            <div class="">
              <Cart_Item
                detail={data}
                cust_id={props.cid.email}
                // total={price_handler}
              ></Cart_Item>
            </div>
          )
      )}
      <div>
        <NavLink to="/checkout" className="">
          <button class="text-gray-900 bg-gradient-to-r from-[rgb(133,245,239)] via-[rgb(93,209,203)] to-[rgb(76,226,219)] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-8 mb-8">Checkout</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;