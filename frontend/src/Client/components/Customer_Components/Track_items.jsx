import React from "react";

const Track_items = (props) => {
  console.log(props.items);
  const utcdate = new Date(props.items.date);
  const istTime = new Date(utcdate.getTime() + 5.5 * 60 * 60 * 1000); // add offset to UTC time
  const date = istTime.toLocaleDateString("en-IN");
  const time = istTime.toLocaleTimeString("en-IN");

  const items = Object.entries(props.items.order);
  console.log(items);
  return (
    <div>
      <div>Order-ID :{props.items._id}</div>
      <div>Booking Date : {date + " - " + time}</div>
      <div>
        <table>
          <tr>
            {/* <th> Product ID </th> */}
            <th>Product name</th> <th>Quantity</th>
            <th>Net Weight</th>
          </tr>
          {items.map((sellers) => {
            return sellers[1].map((products) => {
              return typeof products[0] == "string" ? (
                <tr>
                  {/* <td>{products[0]}</td> */}
                  <td>{products[1]}</td>
                  <td>{products[2]}</td>
                  <td>{products[3]}</td>
                </tr>
              ) : null;
            });
          })}
        </table>
      </div>
      <br></br>
      <div>Sub Total : {props.items.total.subtotal} $</div>
      <div>Toatl : {props.items.total.total} $</div>
      <div>Discount : {props.items.total.discount} %</div>
      <div>Status : {props.items.status}</div>
      <br></br>
    </div>
  );
};

export default Track_items;
