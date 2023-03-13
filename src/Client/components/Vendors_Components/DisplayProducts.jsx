import React from "react";
import { useNavigate } from "react-router-dom";

const DisplayProducts = (props) => {
  const navigate = useNavigate();
  const Update_handler = () => {
    props.update(props.item);
    navigate("/update_product");
  };
  return (
    <div className=" border-2 hover:border-cyan-500 rounded-lg flex flex-col flex-none w-[215px] m-2 p-2">
      <img
        src={props.item.image}
        alt=""
        className="m-auto w-[154px] h-[154px]"
      />
      <div className="item_quantity m-auto">
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
      <div>Stock : {props.item.stock}</div>
      <button
        className="bg-gray-100 rounded-full w-1/2"
        onClick={Update_handler}
      >
        Update
      </button>
    </div>
  );
};

export default DisplayProducts;
