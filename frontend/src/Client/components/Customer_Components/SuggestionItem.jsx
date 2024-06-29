import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading";
import SuggsItem_Usage from "./SuggsItem_Usage";

const SuggestionItem = (props) => {
  const url = "https://door-step.vercel.app";
  const navigate = useNavigate();
  const [itemdetail, setitemdetail] = useState([]);
  const [final_items, setFinal_Items] = useState([]);
  const [loading, setLoading] = useState(true);

  const cart_handler = async () => {
    // props.cart_item(itemdetail._id);
    if (props.cid == "no_id") {
      const confirmed = window.confirm(
        "First LogIn / Signup for placing order"
      );
      if (confirmed) navigate("/Login");
    } else {
      setLoading(true);
      // final_product item id
      const list = { cust_id: props.cid, pid: final_items._id };
      const res = await axios.post(url + "/api/insertcart", list);
      setLoading(false);
    }
  };

  const filldetail = async (id) => {
    // console.log(id);
    const list = { pid: id };
    const res = await axios.post(url + "/api/get_product_info_cart", list);
    setitemdetail((prev) => [...prev, res.data]);
    // console.log(itemdetail);
  };
  const MLBackend = async () => {
    // axios.post("http://127.0.0.1:5000/members", props.item);
    // console.log(itemdetail);
    let itemnames = [];
    itemdetail.map((data) => itemnames.push(data.product_name));
    const res = await axios.post("http://127.0.0.1:5000/fpgrowth", {
      data: itemnames,
    });
    let names = res["data"].data;
    // console.log(names.data);
    names.map(async (data) => {
      const str = data.toLowerCase();
      const word = str[0].toUpperCase() + str.slice(1);
      // console.log(str);
      const res = await axios.post(url + "/api/searchproducts", {
        str: word,
      });
      console.log(res.data);
      if (res.data.length > 0) setFinal_Items((prev) => [...prev, res.data[0]]);
    });
    setLoading(false);
    // "/api/searchproducts"
    // return Promise.resolve("Hello");
  };
  const get_item = async () => {
    const items = props.item;
    // console.log(items);
    items.map((data) => {
      // console.log(data);
      data[1] > 0 && filldetail(data[0]);
    });
    // setFinal_Items(itemdetail);
    // console.log(itemdetail);
    // return Promise.resolve("resolved");
  };
  // const gothere = async () => {
  //   await get_item();
  // await MLBackend();
  // return Promise.resolve("Hello");
  // filldetail(props.item);
  // };
  useEffect(() => {
    // ML backendcall
    if (!props.cid) {
    } else {
      get_item();
      // MLBackend();
    }
  }, []);

  useEffect(() => {
    let itemp = 0;
    props.item.map((data) => data[1] > 0 && itemp++);
    if (itemdetail.length == itemp) MLBackend();
  }, [itemdetail]);

  useEffect(() => {
    console.log(final_items);
  }, [final_items]);

  if (loading) {
    return (
      <div className="flex  justify-center items-center bg-black/50 h-40 w-full z-20">
        <Loading />
      </div>
    );
  }

  return (
    <div class="flex flex-row overflow-x-auto overflow-y-hidden">
      {final_items.map((idetail) => (
        <SuggsItem_Usage idetail={idetail} cid={props.cid} />
      ))}
    </div>
  );
};

export default SuggestionItem;
