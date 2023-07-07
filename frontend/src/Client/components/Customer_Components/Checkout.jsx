import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const url = "https://door-step.vercel.app";
  const [items, setItems] = useState([]);
  const [seller, setSeller] = useState({});
  const [product, setProduct] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const display_cart = async (id) => {
    setTotal((prev) => 0);
    const response = await axios.post(url+"/api/displaycart", {
      id,
    });
    console.log(response.data);
    const items_list = Object.entries(response.data);
    let count = 0;
    if (items_list.length <= 0) {
      alert("Your Cart is Empty");
      navigate("/Customer_Home");
    } else {
      items_list.map((i) => {
        count += i[1];
      });
      if (count == 0) {
        alert("Your Cart is Empty");
        navigate("/Customer_Home");
      }
    }
    setItems((prev) => (prev = [...items_list]));
    console.log(items_list);
  };

  const get_product = async (id, qty) => {
    const list = { pid: id };
    await axios
      .post(url+"/api/get_product_info_cart", list)
      .then((res) => {
        const seller_id = res.data.seller_id;
        const price = res.data.price;
        const discount = res.data.discount;
        const name = res.data.product_name;
        const amount = res.data.quantity;
        const stock = res.data.stock;
        const cur = (qty * price * (100 - discount)) / 100;
        setTotal((prev) => prev + cur);
        setSubTotal((prev) => prev + qty * price);
        setSeller((prev) => {
          if (prev[seller_id]) {
            prev[seller_id].push([id, name, qty, amount, stock]);
          } else {
            prev[seller_id] = [[0], [id, name, qty, amount, stock]];
          }
          return prev;
        });
        setProduct((prev) => {
          prev.push([
            name,
            qty,
            amount,
            (qty * price * (100 - discount)) / 100,
          ]);
          return prev;
        });
      });
  };

  useEffect(() => {
    console.log(props.data);
    display_cart(props.data.email);
  }, []);

  useEffect(() => {
    items.map(async (products) => {
      const qty = products[1];
      const pid = products[0];
      if (qty > 0) {
        await get_product(pid, qty);
      }
    });
  }, [items]);
  //   useEffect(() => {
  //     console.log(seller);
  //   }, [seller]);

  //   console.log(items);
  //   console.log(seller);
  //   console.log(total);

  const buy_handler = async () => {
    const res = await axios.post(url+"/add/orders", {
      cid: props.data.email,
      order: seller,
      total: {
        subtotal: Math.round(subtotal * 100) / 100,
        total: Math.round(total * 100) / 100,
        discount: Math.round(((subtotal - total) / total) * 100 * 100) / 100,
      },
    });
    alert("Your Order has Been placed Success fully");
    navigate("/Customer_home");
  };

  return (
    <div className="p-4">
      <NavLink to="/Cart">
      <button class="text-gray-900 bg-gradient-to-r from-[rgb(133,245,239)] via-[rgb(93,209,203)] to-[rgb(76,226,219)] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-8 mb-8">Cart</button>
      </NavLink>
      <h1 class="font-bold p-2">Bill</h1>
      <br></br>
      <table>
        <tr class="border border-white border-b-[rgb(133,245,239)]">
          <th class="p-2">Product name</th> 
          <th class="p-2">Quantity</th>
          <th class="p-2">Net Weight</th>
          <th class="p-2">Price</th>
        </tr>
        {product.map((items) => (
          <tr>
            <td class="p-2">{items[0]}</td>
            <td class="p-2">{items[1]}</td>
            <td class="p-2">{items[2]}</td>
            <td class="p-2">{items[3]}</td>
          </tr>
        ))}
      </table>
      <br></br>
      <div>
        <p>Sub Total : <p class="inline font-bold"> {Math.round(subtotal * 100) / 100}  $</p></p>
        <p>Total : <p class="inline font-bold"> {Math.round(total * 100) / 100} $ </p></p>
        <p>
          Total Discount :{" "}
          <p class="inline font-bold">{Math.round(((subtotal - total) / total) * 100 * 100) / 100}% </p>
        </p>
      </div>
      <br></br>
      <button onClick={buy_handler} className="text-gray-900 bg-gradient-to-r from-[rgb(133,245,239)] via-[rgb(93,209,203)] to-[rgb(76,226,219)] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-8 mb-8">Buy Now</button>
    </div>
  );
};

export default Checkout;
