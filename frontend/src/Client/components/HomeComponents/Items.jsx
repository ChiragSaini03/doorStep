import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Items = (props) => {
  const url = "https://door-step.vercel.app";
  const navigate = useNavigate();

  const cart_handler = async () => {
    // props.cart_item(props.item._id);
    if (props.cid == "no_id") {
      const confirmed = window.confirm("First LogIn / Sgnup for placing order");
      if (confirmed) navigate("/Login");
    } else {
      const list = { cust_id: props.cid, pid: props.item._id };
      axios.post(url + "/api/insertcart", list);
    }
  };
  return (
    <div className=" border-2 hover:border-[rgb(66,158,153)] border-[rgb(86,198,193)] dark:bg-[#11183b] rounded-lg flex flex-col flex-none w-[215px] m-2 p-2">
      <img
        src={props.item.image}
        alt=""
        className="m-auto w-[154px] h-[154px] rounded-md"
      />
      <div className="item_quantity m-auto font-bold">
        <h1 className="m-auto">{props.item.product_name}</h1>
      </div>
      <div className="item_quantity ">
        <p>{props.item.quantity}</p>
      </div>
      <div className="item_price ">
        <p>
          <strike>{props.item.price}$</strike>
          {"   " + props.item.discount}%
        </p>
        <p>{((100 - props.item.discount) * props.item.price) / 100}$</p>
      </div>
      <button
        className=" border border-[rgb(70,156,152)] text-[rgb(70,156,152)] hover:bg-gray-100  rounded-md w-full "
        onClick={cart_handler}
      >
        Add to cart
      </button>
    </div>
  );
};

export default Items;
