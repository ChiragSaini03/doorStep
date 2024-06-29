import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cart_Item from "./Cart_Item";
import SuggestionItem from "./SuggestionItem"; // this is for the display of suggested items
import Loading from "../loading";
import SuggsCNN from "./SuggsCNN";

const Cart = (props) => {
  const navigate = useNavigate();
  const url = "https://door-step.vercel.app";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const display_cart = async (id) => {
    setLoading(true);
    const response = await axios.post(url + "/api/displaycart", {
      id,
    });
    setLoading(false);
    // console.log(response.data);
    if (response.data.empty) {
      alert("Please login First to place order");
      navigate("/");
    } else {
      const items_list = Object.entries(response.data);
      setItems((prev) => (prev = [...items_list]));
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

  if (loading) {
    return (
      <div className="flex absolute top-0 left-0 justify-center items-center bg-black/50 h-screen w-screen z-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="cart p-4">
      <NavLink to="/Customer_Home">
        <button class="text-gray-900 bg-gradient-to-r from-[rgb(133,245,239)] via-[rgb(93,209,203)] to-[rgb(76,226,219)] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-8 mb-8">
          Back to Home
        </button>
      </NavLink>
      <div>
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
      </div>

      <div class="border-solid border-2 rounded-md border-white my-4 px-3 pb-3">
        <h1 class="text-lg dark:text-white my-2">
          Suggestions from your Cart items
        </h1>
        <div class="">
          {items.length > 0 && (
            <SuggestionItem item={items} cid={props.cid.email} />
          )}
          {/* {items.map(
            (data) =>
              data[1] > 0 && (
                <SuggestionItem item={data[0]} cid={props.cid.email} />
              )
          )} */}
        </div>
      </div>

      <div class="border-solid border-2 rounded-md border-white my-4 px-3 pb-3">
        <h1 class="text-lg dark:text-white my-2">
          Suggestions from your Cart items using CNN
        </h1>
        <div class="">
          {items.length > 0 && <SuggsCNN item={items} cid={props.cid.email} />}
          {/* {items.map(
            (data) =>
              data[1] > 0 && (
                <SuggestionItem item={data[0]} cid={props.cid.email} />
              )
          )} */}
        </div>
      </div>

      <div>
        <NavLink to="/checkout" className="">
          <button class="text-gray-900 bg-gradient-to-r from-[rgb(133,245,239)] via-[rgb(93,209,203)] to-[rgb(76,226,219)] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-8 mb-8">
            Checkout
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;
