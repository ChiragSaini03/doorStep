import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loading";

const Cart_Item = (props) => {
  const url = "https://door-step.vercel.app";
  const item_qty = props.detail[1];
  const [qty, setQty] = useState(item_qty);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const [total,setTotal] = useState(0);
  // const [discounted_price,setDisc]=useState(0)

  const remove_product = async () => {
    try {
      setLoading(true);
      const list = { cust_id: props.cust_id, pid: props.detail[0] };
      await axios
        .post(url + "/api/update_delete_cart", list)
        .then(async (res) => {
          // console.log(res.data);
          await setQty((prev) => (prev = res.data[props.detail[0]]));
          setLoading(false);
        });
      // console.log(res);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const add_product = async () => {
    try {
      setLoading(true);
      if (qty + 1 <= product.stock) {
        const list = { cust_id: props.cust_id, pid: props.detail[0] };
        await axios
          .post(url + "/api/update_add_cart", list)
          .then(async (res) => {
            // console.log(res.data);
            setQty((prev) => (prev = res.data[props.detail[0]]));
            setLoading(false);
          });
      } else alert("No more Stock available");
      // console.log(res);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const get_product = async (id) => {
    setLoading(true);
    const list = { pid: id };
    const res = await axios.post(url + "/api/get_product_info_cart", list);
    setProduct((prev) => ({ ...res.data }));
    // console.log(qty, res.data.stock);
    if (qty > res.data.stock) {
      const list = { cust_id: props.cust_id, pid: props.detail[0] };
      await axios.post(url + "/api/empty_cart", list).then(async (result) => {
        // console.log(res.data);
        setLoading(false);
        setQty((prev) => (prev = result.data[props.detail[0]]));
        alert(
          "only " +
            res.data.stock +
            " pices of " +
            res.data.product_name +
            " are available "
        );
      });
    } else {
      setLoading(false);
    }
    // console.log(res.data);
  };

  useEffect(() => {
    // console.log(props.detail[0]);
    get_product(props.detail[0]);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-black/50 h-40  w-full z-20 py-2 border border-[rgb(70,156,152)] rounded-lg">
        <Loading />
      </div>
    );
  }

  return (
    <div class="border border-3 border-[rgb(70,156,152)] rounded-lg my-2 p-2">
      <table>
        <tr>
          <td>
            <img
              src={product.image}
              alt=""
              class="img w-[250px] rounded-lg "
            ></img>
          </td>
          <td class="p-4">
            <div className="prod_name font-bold py-2">
              {product.product_name}
            </div>
            <div>
              <strike>{product.price}$ </strike>
            </div>
            <div>{((100 - product.discount) * product.price) / 100}$ </div>
            <div> {product.quantity} </div>
            <input
              type="button"
              value="-"
              onClick={remove_product}
              class="font-semibold text-[rgb(70,156,152)] inline-block m-2 rounded-full  border border-[rgb(70,156,152)]  hover:bg-gray-100  w-[25px] h-[25px] cursor-pointer"
            ></input>
            <div
              className="prod_qty"
              class="inline-block text-[rgb(70,156,152)] font-bold"
            >
              {qty}
            </div>
            <input
              type="button"
              value="+"
              onClick={add_product}
              class="font-semibold text-[rgb(70,156,152)] inline-block m-2 rounded-full  border border-[rgb(70,156,152)]  hover:bg-gray-100  w-[25px] h-[25px] cursor-pointer"
            ></input>
            <div>{(qty * product.price * (100 - product.discount)) / 100}</div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Cart_Item;
