import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
function Nav() {
  const [shownav, setshownav] = useState("-top-[300px]");
  const [layer1, setlayer1] = useState("");
  const [layer2, setlayer2] = useState("");
  const [layer3, setlayer3] = useState("");
  function menuAnimation() {
    if (shownav === "-top-[300px]") {
      setshownav("top-[50px]");
      setlayer1("rotate-45 translate-x-0 translate-y-[8.5px]");
      setlayer2("-rotate-45");
      setlayer3("-rotate-45 translate-x-0 -translate-y-[8.5px]");
    } else {
      setshownav("-top-[300px]");
      setlayer1("rotate-0 translate-x-0 translate-y-0");
      setlayer2("rotate-0");
      setlayer3("rotate-0 translate-x-0 translate-y-0]");
    }
    // if ($(".menuitems").css("top") != "60px") {
    //   $(".layer1").css("transform", "translate(0px,8.5px) rotate(45deg)");
    //   $(".layer3").css("transform", "translate(0px,-8.5px) rotate(-45deg)");
    //   $(".layer2").css("transform", "rotate(-45deg)");
    //   // $(".menuitems").css("opacity","1")
    //   $(".menuitems").css("top", "60px");
    // } else if ($(".menuitems").css("top") != "-300px") {
    //   $(".layer1").css("transform", "translate(0px,0px) rotate(0deg)");
    //   $(".layer3").css("transform", "translate(0px,0px) rotate(0deg)");
    //   $(".layer2").css("transform", "rotate(0deg)");
    //   // $(".menuitems").css("opacity","0.2")
    //   $(".menuitems").css("top", "-300px");
    // }
  }

  return (
    <div className="NavBar bg-gradient-to-r from-[rgb(70,156,152)] to-[rgb(109,206,201)] w-full flex flex-col md:flex-row z-40 text-[20px]">
      <NavLink to="/" className="Nav_Logo m-3 w-1/2 md:w-auto">
        Door Step
      </NavLink>
      <button class="togglebutton" onClick={menuAnimation}>
        <span class={"layers layer1 " + layer1}></span>
        <span class={"layers layer2 " + layer2}></span>
        <span class={"layers layer3  " + layer3}></span>
      </button>
      <div
        className={
          "menuitems z-10 bg-gradient-to-r from-[rgb(70,156,152)] to-[rgb(109,206,201)] md:bg-none md:flex md:ml-auto ml-0 md:mr-auto mr-0 w-5/6 align-middle absolute md:static " +
          shownav
        }
      >
        <div className="flex flex-col md:flex-row md:m-1 flex-wrap md:ml-auto ml-0 align-middle">
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
                class="searchbar bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                required
              ></input>
            </div>
          </NavLink>
          <NavLink to="/Login" className="Login m-3  ">
            Login
          </NavLink>
          <NavLink to="/Cart" className="Cart m-3  ">
            Cart
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
