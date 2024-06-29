import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading";

const SuggsItem_Usage = (props) => {
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
      const list = { cust_id: props.cid, pid: props.idetail._id };
      const res = await axios.post(url + "/api/insertcart", list);
      setLoading(false);
    }
  };

  //   if (loading) {
  //     return (
  //       <div className="flex  justify-center items-center bg-black/50 h-40 w-full z-20">
  //         <Loading />
  //       </div>
  //     );
  //   }

  return (
    <div class="">
      <div class="">
        <div className=" border-2 hover:border-[rgb(66,158,153)] border-[rgb(86,198,193)] dark:bg-[#11183b] rounded-lg flex flex-col flex-none  w-[215px] m-2 p-2">
          <img
            src={props.idetail?.image}
            alt=""
            className="m-auto w-[154px] h-[154px] rounded-md"
          />
          <div className="item_quantity m-auto font-bold">
            <h1 className="m-auto">{props.idetail?.product_name}</h1>
          </div>
          <div className="item_quantity ">
            <p>{props.idetail?.quantity}</p>
          </div>
          <div className="item_price ">
            <p>
              <strike>{props.idetail.price}$</strike>
              {"   " + props.idetail.discount}%
            </p>
            <p>
              {((100 - props.idetail.discount) * props.idetail.price) / 100}$
            </p>
          </div>
          <button
            className=" border border-[rgb(70,156,152)] text-[rgb(70,156,152)] hover:bg-gray-100 rounded-md w-full "
            onClick={cart_handler}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggsItem_Usage;
