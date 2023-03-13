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
    <div className="cart">
      <NavLink to="/Customer_Home">Home</NavLink>
      {items.map(
        (data) =>
          data[1] > 0 && (
            <div>
              <Cart_Item
                detail={data}
                cust_id={props.cid.email}
                // total={price_handler}
              ></Cart_Item>
            </div>
          )
      )}
      <div>
        <NavLink to="/checkout">
          <button>Checkout</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;