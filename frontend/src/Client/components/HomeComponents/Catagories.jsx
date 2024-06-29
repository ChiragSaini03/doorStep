import React, { useState } from "react";
import Items from "./Items";

const Categories = (props) => {
  // const cart_handler = (data) => {
  //   props.cart(data);
  // };
  const all_cat = Object.keys(props.categories);
  return (
    <div>
      {all_cat.map((data) => (
        <div className="category m-5">
          <div className="ml-5">
            <h2 className="text-2xl">{data}</h2>
          </div>
          <div className="flex flex-col relative">
            <div className="flex flex-row overflow-x-auto overflow-y-hidden max-w-full ">
              {props.categories[data].map((detail) => (
                <Items item={detail} cid={props.cid} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
