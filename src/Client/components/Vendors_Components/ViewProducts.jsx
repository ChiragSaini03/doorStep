import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayProducts from "./DisplayProducts";

const ViewProducts = (props) => {
  const [products, setProducts] = useState([]);

  const update_handler = (item) => {
    props.update_product(item);
  };
  const get_products = async (id) => {
    const res = await axios.post("http://localhost:3001/get/vendors/product", {
      vid: id,
    });
    setProducts((prev) => {
      prev = [...res.data];
      return prev;
    });
  };
  useEffect(() => {
    get_products(props.vid.email);
  }, []);

  if (products.length == 0) {
    return <div>You have not listed any products yet</div>;
  } else {
    console.log(products);
    return products.map((items) => {
      return <DisplayProducts update={update_handler} item={items} />;
    });
  }
};

export default ViewProducts;
