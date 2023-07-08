import React, { useEffect } from "react";
import Adds from "./HomeComponents/Adds";
import Nav from "./Nav";
import Category_container from "./HomeComponents/Category_container";
// import { useNavigate } from "react-router-dom";
const Home = () => {
  return (
    <div className="Home">
      <Nav> </Nav>
      <br></br>
      <div className="card">
        <Adds />
        <Category_container cid={"no_id"} />
      </div>
    </div>
  );
};

export default Home;
