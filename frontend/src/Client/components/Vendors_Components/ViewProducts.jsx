import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayProducts from "./DisplayProducts";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../loading";

const ViewProducts = (props) => {
  const url = "https://door-step.vercel.app";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const update_handler = (item) => {
    props.update_product(item);
  };
  const get_products = async (id) => {
    setLoading(true);
    const res = await axios.post(url + "/get/vendors/product", {
      vid: id,
    });
    setProducts((prev) => {
      prev = [...res.data];
      return prev;
    });
    setLoading(false);
  };
  useEffect(() => {
    // setLoading(true);
    get_products(props.vid.email);
  }, []);

  if (loading) {
    return (
      <div className="flex absolute top-0 left-0 justify-center items-center bg-black/50 h-screen w-screen">
        <Loading />
      </div>
    );
  }

  if (products.length == 0) {
    return (
      <div className="flex flex-col">
        <div className="">
          <nav className="Search_Nav p-2 bg-gradient-to-r from-[rgb(70,156,152)] to-[rgb(109,206,201)] border-2 w-full flex flex-col md:flex-row z-40">
            <NavLink to="/Vendor_Home" className="Nav_Logo m-3">
              Door Step
            </NavLink>
          </nav>
        </div>
        <div>You have not listed any products yet</div>
      </div>
    );
  } else {
    // console.log(products);
    return (
      <div className="flex flex-col">
        <div className="">
          <nav className="Search_Nav p-2 bg-gradient-to-r from-[rgb(70,156,152)] to-[rgb(109,206,201)] border-2 w-full flex flex-col md:flex-row z-40">
            <NavLink to="/Vendor_Home" className="Nav_Logo m-3">
              Door Step
            </NavLink>
          </nav>
        </div>
        <div>
          {products.map((items) => {
            return <DisplayProducts update={update_handler} item={items} />;
          })}
        </div>
      </div>
    );
  }
};

export default ViewProducts;
