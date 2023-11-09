import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Categories from "./Catagories";
import Loading from "../loading";

const url = "https://door-step.vercel.app";

const Category_container = (props) => {
  // const cart_handler = (data) => {
  //   props.item(data);
  // };
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(url + "/api/getproducts").then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  const obj = {};
  items.map((detail) => {
    if (obj[detail.categories]) {
      obj[detail.categories].push(detail);
    } else {
      obj[detail.categories] = [detail];
    }
  });

  if (loading) {
    return (
      <div className="flex absolute top-0 left-0 justify-center items-center bg-black/50 h-screen w-screen z-20">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Categories categories={obj} cid={props.cid} />
    </div>
  );
};

export default Category_container;
