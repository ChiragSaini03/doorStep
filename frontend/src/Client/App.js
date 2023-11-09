import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./components/Home";
import Cart from "./components/Customer_Components/Cart";
import Login from "./components/Login";
import Search from "./components/Search";
import Signup from "./components/Signup";
import Customer_Home from "./components/Customer_Components/Customer_Home";
import Vendor_Home from "./components/Vendors_Components/Vendor_Home";
import TrackOrders from "./components/Customer_Components/TrackOrders";
import Footer from "./components/Footer";
import Checkout from "./components/Customer_Components/Checkout";
import ViewProducts from "./components/Vendors_Components/ViewProducts";
import UpdateProduct from "./components/Vendors_Components/UpdateProduct";
import ManageOrders from "./components/Vendors_Components/ManageOrders";

function App() {
  const [v_data, setVData] = useState({});
  const [c_data, setCData] = useState({});
  const [product, setProduct] = useState({});
  // const [cart_data, setCart_data] = useState("");
  const info = (info) => {
    if (info.type == "vendor") setVData(info);
    else
      setCData((prev) => {
        return info;
      });
  };
  const logout = () => {
    console.log("cleared");
    setCData({
      email: "no_id",
    });
    setVData({
      email: "no_id",
    });
  };
  const update_handler = (item) => {
    setProduct((prev) => {
      prev = { ...item };
      return prev;
    });
  };
  // const cart_handler = (data) => {
  //   if (data) {
  //     setCart_data(data);
  //   }
  // };
  // const reset = (data) => {
  //   if (data == "reset") {
  //     setCart_data("");
  //   }
  // };
  return (
    <div className="App flex flex-col dark:bg-slate-900 dark:text-white min-h-[100vh] min-w-[100vw]">
      <BrowserRouter>
        <div className="w-full h-full min-h-[100vh] min-w-[100vw]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login get_data={info} />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route
              path="/Customer_Home"
              element={
                <Customer_Home clear_cust={logout} customer_data={c_data} />
              }
            ></Route>
            <Route path="/Search" element={<Search cid={c_data} />}></Route>

            <Route path="/Cart" element={<Cart cid={c_data} />}></Route>
            <Route
              path="/Checkout"
              element={<Checkout data={c_data} />}
            ></Route>
            <Route
              path="/TrackOrder"
              element={<TrackOrders cid={c_data} />}
            ></Route>
            <Route
              path="/Vendor_Home"
              element={<Vendor_Home clear_vend={logout} vendor_data={v_data} />}
            ></Route>
            <Route
              path="/view_products"
              element={
                <ViewProducts update_product={update_handler} vid={v_data} />
              }
            ></Route>
            <Route
              path="/update_product"
              element={<UpdateProduct item={product} />}
            ></Route>
            <Route
              path="/manage_order"
              element={<ManageOrders vid={v_data} />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
