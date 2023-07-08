import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import signupimage from "./utils/utilsignup.gif";

function Signup() {
  const url = "https://door-step.vercel.app";
  const navigate = useNavigate();
  //states:-
  const [type, SetType] = useState("");
  const [name, setName] = useState("");
  const [phone, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  //handelers:-
  const type_handeler = (event) => {
    SetType(event.target.value);
  };
  const name_handeler = (event) => {
    setName(event.target.value);
  };
  const phone_handeler = (event) => {
    setMobile(event.target.value);
  };
  const email_handeler = (event) => {
    setEmail(event.target.value);
  };
  const address_handeler = (event) => {
    setAddress(event.target.value);
  };
  const password_handeler = (event) => {
    setPass(event.target.value);
  };
  //Submit Handler :-
  const signup_handeler = () => {
    const list = {
      type,
      name,
      phone,
      email,
      address,
      password,
    };

    axios.post(url+"/api/signup/", list).then((res) => {
      if (res.data == "noerror") {
        setError("");
        setName("");
        setMobile("");
        setEmail("");
        setPass("");
        setAddress("");
        navigate("/Login");
      } else {
        if (res.data.errors) {
          if (res.data.errors.type) setError(res.data.errors.type.message);
          else if (res.data.errors.name) setError(res.data.errors.name.message);
          else if (res.data.errors.phone)
            setError(res.data.errors.phone.message);
          else if (res.data.errors.email)
            setError(res.data.errors.email.message);
          else if (res.data.errors.address)
            setError(res.data.errors.address.message);
          else if (res.data.errors.password)
            setError(res.data.errors.password.message);
        } else {
          if (res.data.keyValue.email) setError("Email Already Taken");
          else if (res.data.keyValue.phone) setError("Phone No. Already Taken");
        }
      }
    });
  };
  return (
    <div className="signup_container">
      <div className="content">
        <div className="form p-5">
          <center><img src={signupimage} alt="Sign Up" class="h-32" /></center>
          <h1 className="login_head text-[32px] mb-6">
            <center>Sign Up</center>
          </h1>

          
          <form>
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                      <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                      <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="horizontal-list-radio-license" type="radio" value="vendor" name="type" onChange={type_handeler} class="type w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                                <label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vendor </label>
                            </div>
                        </li>
                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="horizontal-list-radio-id" type="radio" value="cutomer" name="type" onChange={type_handeler} class="type w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
                                <label for="horizontal-list-radio-id" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cutomer</label>
                            </div>
                        </li>
                      </ul>
                  </div>
                  <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" value={name} onChange={name_handeler} id="name" class="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required></input>
                  </div>
                  <div class="mb-6">
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                      <input type="email" value={email} onChange={email_handeler}  id="email" class="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required></input>
                  </div>  
                  <div>
                      <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                      <input type="tel" value={phone} onChange={phone_handeler}  id="phone" class="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9120083927" pattern="[0-9]{10}" required></input>
                  </div>
              </div>
              <div class="mb-6">
                  <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <input type="text" value={address} onChange={address_handeler} id="company" class="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Block no x, ABC city" required></input>
              </div>  
              <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" value={password} onChange={password_handeler} id="password" class="input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required></input>
              </div> 
              <div class="flex items-start mb-6">
                  <div class="flex items-center h-5">
                  <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required></input>
                  </div>
                  <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
              </div>
              <button type="button" value="Sign Up" onClick={signup_handeler} class="Button block my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              <NavLink to="/Login" >
                <button class="Button my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue to login</button>
              </NavLink>
              <p>{error}</p>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Signup;
