import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import loginimage from "./utils/utillogin.gif";
import Loading from "./loading";

function Login(props) {
  const url = "https://door-step.vercel.app";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPass] = useState("");

  const username_handeler = (event) => {
    setUsername(event.target.value);
  };
  const password_handeler = (event) => {
    setPass(event.target.value);
  };

  const [err, setErr] = useState("");

  const checkAPI = () => {
    setLoading(true);
    const list = { username, password };
    console.log(list);
    axios.post("https://door-step.vercel.app/api/login", list).then((res) => {
      const user = res.data;
      console.log(res.data);
      if (user.found) {
        if (user.pass) {
          console.log(user);
          setErr("");
          props.get_data(user);
          if (user.type == "vendor") navigate("/Vendor_Home");
          else navigate("/Customer_Home");
          setLoading(false);
        } else {
          setErr(" * Credential is incorrect!");
          setLoading(false);
        }
      } else {
        setErr(" * Credential is incorrect!");
        setLoading(false);
        // navigate("/Signup");
      }
    });
  };

  const login_handeler = () => {
    checkAPI();
    setUsername("");
    setPass("");
  };

  if (loading) {
    return (
      <>
        <Nav></Nav>
        <div className="flex absolute top-0 left-0 justify-center items-center bg-black/50 h-screen w-screen">
          <Loading />
        </div>
      </>
    );
  }

  return (
    <div>
      <Nav></Nav>
      <div className="p-5">
        <center>
          <img src={loginimage} alt="Login" class=" h-28 " />
        </center>
        <h1 className="login_head text-[30px]">
          <center>LOGIN</center>
        </h1>

        <center>
          <form class="m-4">
            <div class="mb-6 display:inline md:w-1/2 w-4/5">
              <label
                for="email"
                class="block m-1 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
              >
                UserName/Email
              </label>
              <input
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                value={username}
                onChange={username_handeler}
                required
              ></input>
            </div>
            <div class="mb-6 display:inline md:w-1/2 w-4/5">
              <label
                for="password"
                class="block m-1 mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                value={password}
                onChange={password_handeler}
                required
              ></input>
            </div>
            <button
              onClick={login_handeler}
              value="Login"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>

            <p className="error m-4">{err}</p>

            <Link
              to="/Signup"
              className="text-white bg-[rgb(51,168,162)] hover:bg-[rgb(39,132,127)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create New Account
            </Link>
          </form>
        </center>
      </div>
    </div>
  );
}

export default Login;
