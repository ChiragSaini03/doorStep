import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = (props) => {
  const url = "https://door-step.vercel.app";
  const [c_data, setCData] = useState({});
  const [disp, setDisp] = useState(props.order.status);
  const utcdate = new Date(props.order.date);
  const istTime = new Date(utcdate.getTime() + 5.5 * 60 * 60 * 1000); // add offset to UTC time
  const date = istTime.toLocaleDateString("en-IN");
  const time = istTime.toLocaleTimeString("en-IN");

  const dispatch_handler = async () => {
    const res = await axios.post(url+"/dispatch/product", {
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
    const res = await axios.post(url+"/get/customer/details", {
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
    <div className="border-2 ">
      <br></br>
      <div>Order ID : {props.order.order_id}</div>
      <div>Booking date : {date + " - " + time}</div>
      <br />
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
            <tr className="border-2 border-white border-b-[rgb(133,245,239)]">
              {/* <th> Product ID </th> */}
              <th className="m-2 px-2">Product name</th> 
              <th className="m-2 px-2">Quantity</th>
              <th className="m-2 px-2">Net Weight</th>
            </tr>

            {props.order.order.map((products) => {
              return typeof products[0] == "string" ? (
                <tr>
                  {/* <td>{products[0]}</td> */}
                  <td className="px-2 m-2">{products[1]}</td>
                  <td className="px-2 m-2">{products[2]}</td>
                  <td className="px-2 m-2">{products[3]}</td>
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
