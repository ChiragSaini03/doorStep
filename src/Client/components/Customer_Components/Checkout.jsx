import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const [items, setItems] = useState([]);
  const [seller, setSeller] = useState({});
  const [product, setProduct] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const display_cart = async (id) => {
    setTotal((prev) => 0);
    const response = await axios.post("http://localhost:3001/api/displaycart", {
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
      .post("http://localhost:3001/api/get_product_info_cart", list)
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
    const res = await axios.post("http://localhost:3001/add/orders", {
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
    <div>
      <NavLink to="/Cart">Cart</NavLink>
      Checkout
      <br></br>
      <table>
        <tr>
          <th>Product name</th> <th>Quantity</th>
          <th>Net Weight</th>
          <th>Price</th>
        </tr>
        {product.map((items) => (
          <tr>
            <td>{items[0]}</td>
            <td>{items[1]}</td>
            <td>{items[2]}</td>
            <td>{items[3]}</td>
          </tr>
        ))}
      </table>
      <br></br>
      <div>
        <p>Sub Total : {Math.round(subtotal * 100) / 100} $</p>
        <p>Total : {Math.round(total * 100) / 100} $</p>
        <p>
          Total Discount :{" "}
          {Math.round(((subtotal - total) / total) * 100 * 100) / 100}%
        </p>
      </div>
      <br></br>
      <button onClick={buy_handler}>Buy Now</button>
    </div>
  );
};

export default Checkout;
