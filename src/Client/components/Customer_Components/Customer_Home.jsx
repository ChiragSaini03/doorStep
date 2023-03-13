import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Adds from "../HomeComponents/Adds";
import Category_container from "../HomeComponents/Category_container";

const Customer_Home = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(props.customer_data);
    if (props.customer_data.email) {
      if (props.customer_data.email == "no_id") {
        alert(" Please Login With your account to Place Orders");
        navigate("/Login");
      }
    } else {
      alert(" Please Login With your account to Place Orders");
      navigate("/Login");
    }
  }, []);
  // const cart_handler = (data) => {
  //   props.cart_data(data);
  //   console.log(data);
  // };
  // console.log(props.customer_data);
  return (
    <div>
      <nav className="Search_Nav p-2 bg-gray-50 border-2 fixed w-full flex flex-col md:flex-row z-40">
        <NavLink to="/Customer_Home" className="Nav_Logo m-3">
          Door Step
        </NavLink>
        <div className="flex md:ml-auto ml-0 md:mr-auto mr-0 w-5/6 align-middle">
          <div className="flex flex-col md:flex-row flex-wrap md:ml-auto ml-0 align-middle">
            <NavLink to="/Search" className="searchbar m-3">
              <input type="text" placeholder="Search" />
            </NavLink>
            <div className="info m-3">{props.customer_data.name}</div>
            <NavLink to="/Cart" className="Cart m-3  ">
              Cart
            </NavLink>
            <NavLink className="track_order m-3" to="/TrackOrder">
              Track Order
            </NavLink>
            <NavLink className="logout m-3" to="/">
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
        <Adds />
        <Category_container cid={props.customer_data.email} />
      </div>
    </div>
  );
};

export default Customer_Home;
