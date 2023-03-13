import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Orders from "./Orders";

const ManageOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const get_orders = async (id) => {
    const res = await axios.post("http://localhost:3001/get/seller/orders", {
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
    <div>
      <NavLink to="/Vendor_Home">Home</NavLink>
      {orders.map((items) => {
        return <Orders order={items} />;
      })}
    </div>
  );
};

export default ManageOrders;
