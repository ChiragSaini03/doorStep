import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Track_items from "./Track_items";

const TrackOrders = (props) => {
  const url = "https://door-step.vercel.app";
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const get_products = async () => {
    const res = await axios.post(url+"/track/order", {
      id: props.cid.email,
    });
    console.log(res.data);
    setOrder((prev) => {
      prev = [...res.data];
      return prev;
    });
  };

  useEffect(() => {
    // console.log(props.customer_data);
    if (props.cid.email) {
      if (props.cid.email == "no_id") {
        alert(" Please Login With your account to Place Orders");
        navigate("/Login");
      }
    } else {
      alert(" Please Login With your account to Place Orders");
      navigate("/Login");
    }
    get_products();
  }, []);
  return (
    <div>
      <NavLink to="/Customer_home">Home</NavLink>
      {order.map((items) => (
        <Track_items items={items} />
      ))}
    </div>
  );
};

export default TrackOrders;
