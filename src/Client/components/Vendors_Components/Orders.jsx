import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = (props) => {
  const [c_data, setCData] = useState({});
  const [disp, setDisp] = useState(props.order.status);
  const utcdate = new Date(props.order.date);
  const istTime = new Date(utcdate.getTime() + 5.5 * 60 * 60 * 1000); // add offset to UTC time
  const date = istTime.toLocaleDateString("en-IN");
  const time = istTime.toLocaleTimeString("en-IN");

  const dispatch_handler = async () => {
    const res = await axios.post("http://localhost:3001/dispatch/product", {
      sid: props.order.seller_id,
      oid: props.order.order_id,
    });
    console.log(res.data);
    setDisp((prev) => {
      prev = 1;
      return prev;
    });

    alert("Item has been dispatched");
  };

  const get_customer_details = async (id) => {
    const res = await axios.post("http://localhost:3001/get/customer/details", {
      cid: id,
    });
    setCData((prev) => {
      prev = { ...res.data };
      return prev;
    });
  };

  useEffect(() => {
    get_customer_details(props.order.customer_id);
  }, []);
  return (
    <div>
      <br></br>
      <div>Order ID : {props.order.order_id}</div>
      <div>Booking date : {date + " - " + time}</div>
      <div>
        Customer Details : -
        <div style={{ paddingLeft: 15 }}>
          <div>Name : {c_data.name}</div>
          <div>Phone : {c_data.phone}</div>
          <div>E-Mail : {c_data.email}</div>
          <div>Address : {c_data.address}</div>
        </div>
      </div>
      <div>
        {" "}
        <br></br>
        Order Details :-
        <div style={{ paddingLeft: 15 }}>
          <table>
            <tr>
              {/* <th> Product ID </th> */}
              <th>Product name</th> <th>Quantity</th>
              <th>Net Weight</th>
            </tr>

            {props.order.order.map((products) => {
              return typeof products[0] == "string" ? (
                <tr>
                  {/* <td>{products[0]}</td> */}
                  <td>{products[1]}</td>
                  <td>{products[2]}</td>
                  <td>{products[3]}</td>
                </tr>
              ) : null;
            })}
          </table>
        </div>
        <br></br>
        {disp ? (
          <div>Status : Dispached</div>
        ) : (
          <div>
            <div>Status : Not Dispatched</div>

            <div>
              <button onClick={dispatch_handler}>Mark As Dispached </button>
            </div>
          </div>
        )}
        <br></br>
      </div>
    </div>
  );
};

export default Orders;
