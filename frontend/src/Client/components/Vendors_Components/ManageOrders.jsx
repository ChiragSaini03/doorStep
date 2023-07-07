import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Orders from "./Orders";

const ManageOrders = (props) => {
  const url = "https://door-step.vercel.app";
  const [orders, setOrders] = useState([]);
  const get_orders = async (id) => {
    const res = await axios.post(url+"/get/seller/orders", {
      vid: id,
    });
    setOrders((prev) => {
      prev = [...res.data];
      return prev;
    });
  };
  useEffect(() => {
    get_orders(props.vid.email);
  }, []);
  return (
    <div className="p-4">
      <NavLink to="/Vendor_Home" className="text-gray-900 bg-gradient-to-r from-[rgb(133,245,239)] via-[rgb(93,209,203)] to-[rgb(76,226,219)] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-8 mb-8">Home</NavLink>
      {orders.map((items) => {
        return <Orders order={items} />;
      })}
    </div>
  );
};

export default ManageOrders;
