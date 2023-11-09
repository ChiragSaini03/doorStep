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
      <nav className="Search_Nav p-2 bg-gradient-to-r from-[rgb(70,156,152)] to-[rgb(109,206,201)] border-2 fixed w-full flex flex-col md:flex-row z-40">
        <NavLink to="/Customer_Home" className="Nav_Logo m-3">
          Door Step
        </NavLink>
        <div className="flex md:ml-auto ml-0 md:mr-auto mr-0 w-5/6 align-middle">
          <div className="flex flex-col md:flex-row flex-wrap md:ml-auto ml-0 align-middle">
            <NavLink to="/Search" className="searchbar m-2">
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  autoFocus="autofocus"
                  class="searchbar bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for items"
                  required
                ></input>
              </div>
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
