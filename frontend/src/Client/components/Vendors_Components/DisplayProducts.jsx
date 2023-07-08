import React from "react";
import { useNavigate } from "react-router-dom";

const DisplayProducts = (props) => {
  const navigate = useNavigate();
  const Update_handler = () => {
    props.update(props.item);
    navigate("/update_product");
  };
  return (
    <div className=" inline-block border-2 hover:border-[rgb(66,158,153)] border-[rgb(86,198,193)] dark:bg-[#11183b] rounded-lg w-[200px] m-2 p-2">
      <img
        src={props.item.image}
        alt=""
        className="m-auto w-[125px] h-[125px] rounded-md"
      />
      <div className="item_quantity m-auto">
        <center><h1 className="my-1 font-bold">{props.item.product_name}</h1></center>
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
      <div>Stock : {props.item.stock}</div>
      <button className=" border border-[rgb(70,156,152)] text-[rgb(70,156,152)] hover:bg-gray-100  rounded-md w-full my-1" onClick={Update_handler}>
        Update
      </button>
    </div>
  );
};

export default DisplayProducts;
