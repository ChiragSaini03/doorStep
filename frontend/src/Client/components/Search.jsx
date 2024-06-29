import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Items from "./HomeComponents/Items";

let ALPHABET_SIZE = 26;

class TrieNode {
  constructor() {
    this.productID = new Array();
    this.isEndOfWord = false;
    this.children = new Array(ALPHABET_SIZE);
    for (let i = 0; i < ALPHABET_SIZE; i++) this.children[i] = null;
  }
}

let root;

function insert(key, productid) {
  let level;
  let length = key.length;
  let index;

  let pCrawl = root;

  for (level = 0; level < length; level++) {
    index = key[level].charCodeAt(0) - "a".charCodeAt(0);
    if (pCrawl.children[index] == null) pCrawl.children[index] = new TrieNode();

    pCrawl = pCrawl.children[index];
  }
  pCrawl.isEndOfWord = true;
  pCrawl.productID = productid;
}

let suggestionResult = new Array();

function dfsTrie(node, sug) {
  let dep;
  if (node.isEndOfWord) {
    suggestionResult.push(sug);
  }
  for (dep = 0; dep < 26; dep++) {
    if (node.children[dep])
      dfsTrie(node.children[dep], sug + String.fromCharCode(dep + 97));
  }
}

function trie_search(key) {
  suggestionResult = [];
  let level;
  let length = key.length;
  let index;
  let node = root;
  let sug = "";
  for (level = 0; level < length; level++) {
    index = key[level].charCodeAt(0) - "a".charCodeAt(0);
    sug += key[level];
    if (node.children[index] == null) return suggestionResult;

    node = node.children[index];
  }
  dfsTrie(node, sug);
  return suggestionResult;
}

function trie_retrive_product(key) {
  let level;
  let length = key.length;
  let index;
  let node = root;

  for (level = 0; level < length; level++) {
    index = key[level].charCodeAt(0) - "a".charCodeAt(0);

    if (node.children[index] == null) return [];

    node = node.children[index];
  }
  return node.productID;
}

root = new TrieNode();

const Search = (props) => {
  const url = "https://door-step.vercel.app";
  const [search_str, setSearch_str] = useState("");
  const [result, setResult] = useState([]);
  const [email, set_email] = useState("no_id");
  const [suggestionBox, setsuggestionBox] = useState([]);
  // const [product_id_array, setproductidarray] = useState([]);

  useEffect(() => {
    if (props.cid.email) {
      console.log("email set", props.cid.email);
      set_email((prev) => {
        return props.cid.email;
      });
    }
    axios.post(url + "/api/suggestion", { search_str }).then((res) => {
      console.log(res.data);
      res.data.map((ele) => {
        insert(ele.keyword, ele.product_id);
      });
    });
  }, []);

  useEffect(() => {
    if (search_str.length > 1) {
      setsuggestionBox(() => {
        return trie_search(search_str.toLocaleLowerCase());
      });
      console.log(suggestionBox);
    }
  }, [search_str]);

  // const setSearch = (event) => {
  //   setSearch_str(event.target.value);
  // };

  const sugg_handler = (product_id_array) => {
    console.log(product_id_array);
    axios
      .post(url + "/api/suggestion/getproduct", { product_id_array })
      .then((res) => {
        console.log("got product", res.data);
        setResult((prev) => {
          return res.data;
        });
      });
  };
  const search_handler_sugg = (event) => {
    setSearch_str(event.target.value);
  };

  const res = async (words) => {
    words.map((str) => {
      axios.post(url + "/api/searchproducts", { str }).then((res) => {
        setResult((prev) => {
          return res.data;
        });
      });
    });
  };

  const search_handler = () => {
    setResult([]);
    const words = search_str.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    setResult((n) => n.splice(0, n.length));

    console.log("search_str");
    console.log("words: ", words);
    console.log("results", result);
    res(words);

    setSearch_str("");
  };

  return (
    <div>
      <nav className="Search_Nav p-2 bg-gradient-to-r from-[rgb(70,156,152)] to-[rgb(109,206,201)] border-2 fixed w-full flex flex-row z-40">
        {props.cid.email != "no_id" ? (
          <NavLink to="/Customer_home" className="Nav_Logo m-2 mr-4">
            Door Step
          </NavLink>
        ) : (
          <NavLink to="/" className="Nav_Logo m-2 mr-4">
            Door Step
          </NavLink>
        )}

        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-1/2 ">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            onChange={search_handler_sugg}
            type="text"
            id="simple-search"
            autoFocus="autofocus"
            value={search_str}
            class="searchbar bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            required
          ></input>
        </div>
        <div class="absolute top-[48px] md:left-[96px] h-24 bg-white dark:bg-slate-900 md:w-[49%] w-[97%] rounded-md">
          {suggestionBox.map((ele) => {
            return (
              <button
                onClick={async () => {
                  const pid_array = await trie_retrive_product(ele);
                  // setproductidarray(() => {
                  //   return trie_retrive_product(ele);
                  // });
                  sugg_handler(pid_array);
                }}
                value={ele}
                class="block text-left m-2 my-1 w-[93%] bg-orange-200"
              >
                {ele}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          value="search"
          onClick={search_handler}
          class="inline-flex items-center w-24 py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 mr-2 -ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          Search
        </button>

        <NavLink
          to="/Cart"
          className="Cart inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cart
        </NavLink>
      </nav>
      <div className="search pt-16">
        {result.map((details) => (
          <Items cid={email} item={details}></Items>
        ))}
      </div>
    </div>
  );
};

export default Search;
