const express = require("express");
const mongo_conn = require("mongoose");
// require("./db/login_db");
const Login_collec = require("./Models/Login_collection");
const Product_collec = require("./Models/product_collection");
const Cart_collec = require("./Models/Cart_collection");
const Seller_collec = require("./Models/Sellers_collection");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const { default: axios } = require("axios");
const Orders_collec = require("./Models/Orders_collec");
const suggestion_collec = require("./Models/Suggestion_collec");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: ["https://door-step-frontend.vercel.app", "http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// mongo_conn.set("strictQuery", true);
mongo_conn
  .connect(
    "mongodb+srv://doorstep_db_rohit:DoorStep123@cluster0.chgewfl.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conn is succcessfull");
  })
  .catch((err) => {
    console.log(err);
  });

// LOGIN :-
app.get("/", (req, res) => {
  res.json("Welcome To DoorStep");
});
app.post("/api/login", (req, res) => {
  const read = async () => {
    try {
      const user = req.body;
      const result = await Login_collec.find({ email: user.username });
      if (result.length == 0) {
        res.send({ found: false, pass: false });
      } else if (result[0].password == user.password) {
        res.send({
          found: true,
          pass: true,
          type: result[0].type,
          name: result[0].name,
          email: result[0].email,
          phone: result[0].phone,
          address: result[0].address,
        });
      } else {
        res.send({ found: true, pass: false });
      }
    } catch (err) {
      console.log(err);
    }
  };
  read();
});

// SIGNUP :-

app.post("/api/signup", (req, res) => {
  // console.log(req.body);
  const insert = async () => {
    try {
      const rec1 = new Login_collec({
        type: req.body.type,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
      });
      const record = await rec1.save();
      console.log(record);
      res.send("noerror");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };
  insert();
});

// PRODUCTS:-

app.post("/api/product", (req, res) => {
  const insert = async () => {
    try {
      const rec = new Product_collec({
        seller_id: req.body.sid,
        categories: req.body.cat,
        product_name: req.body.cap_p_name,
        stock: req.body.stock,
        price: req.body.price,
        quantity: req.body.qty,
        image: req.body.p_image,
        about: req.body.about,
        discount: req.body.discount,
      });

      const record = await rec.save();
      req.body.keywords_array.map(async (keys) => {
        const upd = await suggestion_collec.findOneAndUpdate(
          { keyword: keys },
          { $push: { product_id: record._id } },
          { new: true }
        );
        if (!upd) {
          sugg_rec = new suggestion_collec({
            keyword: keys,
            product_id: [record._id],
          });
          const rec = await sugg_rec.save();
        }
      });
      res.send("noerror");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };
  insert();
});
app.get("/api/getproducts", (req, res) => {
  const read = async () => {
    try {
      const result = await Product_collec.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };
  read();
});

// SEARCH :-

app.post("/api/searchproducts", (req, res) => {
  const req_str = req.body;
  console.log(req_str);
  const read = async () => {
    try {
      const result = await Product_collec.find({
        product_name: { $regex: req_str.str },
      });
      console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };
  read();
});

// CART :-

app.post("/api/insertcart", (req, res) => {
  const new_cart_insert = async (data) => {
    try {
      const obj = {};
      obj[data.pid] = 1;
      const rec = new Cart_collec({
        cust_id: data.cust_id,
        cart_detail: { ...obj },
      });
      const record = await rec.save();
      // console.log(record);
    } catch (err) {
      console.log(err);
      process.exit();
    }
  };
  const cart_insert = async (obj) => {
    const cart = { ...obj.cart_detail };
    if (cart[obj.data.pid]) {
      cart[obj.data.pid]++;
    } else {
      cart[obj.data.pid] = 1;
    }
    console.log(cart);
    try {
      const result = await Cart_collec.findOneAndUpdate(
        { cust_id: obj.data.cust_id },
        { $set: { cart_detail: { ...cart } } },
        { new: true }
      );
      res.send(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  const find_cid = async (data) => {
    try {
      const record = await Cart_collec.find({
        cust_id: data.cust_id,
      });

      if (record.length > 0) {
        console.log("1");
        const obj = { data: data, cart_detail: record[0].cart_detail };
        cart_insert(obj);
      } else {
        console.log("0");
        new_cart_insert(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(req.body);
  const data = req.body;
  if (req.body.cust_id) {
    find_cid(req.body);
  }
});

app.post("/api/displaycart", (req, res) => {
  const find_cust = async (data) => {
    try {
      const record = await Cart_collec.find({
        cust_id: data,
      });

      if (record.length > 0) {
        console.log("1");
        res.send(record[0].cart_detail);
      } else {
        console.log("0");
        // new_cart_insert(data);
        res.send({ empty: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const cust_id = req.body.id;
  find_cust(cust_id);
});

app.post("/api/get_product_info_cart", (req, res) => {
  const get_product = async (data) => {
    try {
      const record = await Product_collec.find({
        _id: data,
      });
      res.send(record[0]);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(req.body);
  get_product(req.body.pid);
});

app.post("/api/update_add_cart", (req, res) => {
  const cart_insert = async (obj) => {
    const cart = { ...obj.cart_detail };
    if (cart[obj.data.pid]) {
      cart[obj.data.pid]++;
    } else {
      cart[obj.data.pid] = 1;
    }
    try {
      const result = await Cart_collec.findOneAndUpdate(
        { cust_id: obj.data.cust_id },
        { $set: { cart_detail: { ...cart } } },
        { new: true }
      );
      res.send(result.cart_detail);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const find_cid = async (data) => {
    try {
      const record = await Cart_collec.find({
        cust_id: data.cust_id,
      });

      if (record.length > 0) {
        const obj = { data: data, cart_detail: record[0].cart_detail };
        cart_insert(obj);
      }
    } catch (err) {
      console.log(err);
      process.exit();
    }
  };

  console.log(req.body);
  const data = req.body;
  find_cid(req.body);
});

app.post("/api/empty_cart", (req, res) => {
  const cart_delete = async (obj) => {
    const cart = { ...obj.cart_detail };
    if (cart[obj.data.pid]) {
      cart[obj.data.pid] = 0;
    } else {
      cart[obj.data.pid] = 0;
    }
    try {
      const result = await Cart_collec.findOneAndUpdate(
        { cust_id: obj.data.cust_id },
        { $set: { cart_detail: { ...cart } } },
        { new: true }
      );
      res.send(result.cart_detail);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const find_cid = async (data) => {
    try {
      const record = await Cart_collec.find({
        cust_id: data.cust_id,
      });

      if (record.length > 0) {
        const obj = { data: data, cart_detail: record[0].cart_detail };
        cart_delete(obj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(req.body);
  const data = req.body;
  find_cid(req.body);
});

app.post("/api/update_delete_cart", (req, res) => {
  const cart_insert = async (obj) => {
    const cart = { ...obj.cart_detail };
    if (cart[obj.data.pid] > 0) {
      cart[obj.data.pid]--;
    }
    try {
      const result = await Cart_collec.findOneAndUpdate(
        { cust_id: obj.data.cust_id },
        { $set: { cart_detail: { ...cart } } },
        { new: true }
      );
      res.send(result.cart_detail);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  const find_cid = async (data) => {
    try {
      const record = await Cart_collec.find({
        cust_id: data.cust_id,
      });

      if (record.length > 0) {
        const obj = { data: data, cart_detail: record[0].cart_detail };
        cart_insert(obj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(req.body);
  const data = req.body;
  find_cid(req.body);
});

// ORDERS :-

app.post("/add/orders", (req, res) => {
  const d = req.body;
  console.log(d);

  const update_seller_order = async (data) => {
    try {
      const date = new Date();
      const sellers = Object.entries(data.order);
      console.log(sellers);
      sellers.map(async (i) => {
        console.log(i);
        const rec = new Seller_collec({
          order_id: data._id,
          seller_id: i[0],
          customer_id: data.cust_id,
          order: i[1],
          status: 0,
          date: date,
        });
        const result = await rec.save();
        console.log(result);
      });
      res.send({ seller: true });
    } catch (err) {
      console.log(err);
    }
  };
  const clear_cart = async (data) => {
    try {
      const result = await Cart_collec.findOneAndUpdate(
        { cust_id: data.cid },
        { $set: { cart_detail: {} } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const insert = async (data) => {
    try {
      const date = new Date();
      const rec = new Orders_collec({
        cust_id: data.cid,
        order: data.order,
        status: "Not Delivered",
        date: date,
        total: data.total,
      });
      const record = await rec.save();
      update_seller_order(record);
      clear_cart(d);
      console.log(record);
    } catch (err) {
      console.log(err);
    }
  };
  const update_stock = async (data) => {
    try {
      const arr = Object.entries(data.order);
      console.log(arr);
      arr.map(async (rec) => {
        rec[1].map(async (products) => {
          const id = products[0];
          if (typeof id == "string") {
            // console.log(products, id);
            const result = await Product_collec.findOneAndUpdate(
              { _id: id },
              { $set: { stock: products[4] - products[2] } },
              { new: true }
            );
            console.log(result);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  update_stock(d);
  insert(d);
});

// TRACK ORDERS :-

app.post("/track/order", (req, res) => {
  const d = req.body;
  const get_order = async (data) => {
    try {
      const result = await Orders_collec.find({
        cust_id: data.id,
      });
      console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(d);
  get_order(d);
});

// VENDORS INFO :-

app.post("/get/vendors/product", (req, res) => {
  const get_products = async (id) => {
    try {
      console.log(id);
      const result = await Product_collec.find({
        seller_id: id,
      });
      console.log(result);
      if (result) {
        res.send(result);
      } else {
        console.log("no data");
        res.send([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(req.body);
  get_products(req.body.vid);
});

app.post("/update/product", (req, res) => {
  const update_product = async (id) => {
    try {
      const result = await Product_collec.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            categories: req.body.cat,
            product_name: req.body.cap_p_name,
            stock: req.body.stock,
            price: req.body.price,
            quantity: req.body.qty,
            image: req.body.p_image,
            about: req.body.about,
            discount: req.body.discount,
          },
        },
        { new: true }
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send("false");
    }
  };
  update_product(req.body.pid);
});

app.post("/get/seller/orders", (req, res) => {
  const get_orders = async (id) => {
    try {
      const result = await Seller_collec.find({ seller_id: id });
      console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };
  get_orders(req.body.vid);
});

app.post("/get/customer/details", (req, res) => {
  const get_customer = async (id) => {
    try {
      const result = await Login_collec.find({ email: id });
      console.log(result);
      res.send({
        email: result[0].email,
        name: result[0].name,
        phone: result[0].phone,
        address: result[0].address,
      });
    } catch (err) {
      console.log(err);
    }
  };
  get_customer(req.body.cid);
});

app.post("/dispatch/product", (req, res) => {
  const update_order_status = async (data) => {
    try {
      let result = await Orders_collec.find({ _id: data.oid });
      // let temp =
      result[0].order[data.sid][0][0] = 1;
      const arr = Object.entries(result[0].order);
      console.log(arr);
      const utcdate = new Date();
      const istTime = new Date(utcdate.getTime()); // add offset to UTC time
      const date = istTime.toLocaleDateString("en-IN");
      const time = istTime.toLocaleTimeString("en-IN");
      let all_dispached = "Delivered on " + date + " at " + time;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][1][0][0] == 0) {
          all_dispached = "Not Delivered";
          break;
        }
      }
      const result2 = await Orders_collec.findOneAndUpdate(
        { _id: data.oid },
        { $set: { order: result[0].order, status: all_dispached } }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const update_seller_info = async (data) => {
    try {
      const result = await Seller_collec.findOneAndUpdate(
        { order_id: data.oid, seller_id: data.sid },
        { $set: { status: 1 } },
        { new: true }
      );
      console.log(result);
      update_order_status(data);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  };
  update_seller_info(req.body);
});

// SUGGESTIONS :-
app.post("/api/suggestion", (req, res) => {
  const read_data = async () => {
    try {
      const result = await suggestion_collec.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };
  read_data();
});

app.post("/api/suggestion/getproduct", (req, res) => {
  const find_prod = async (data) => {
    try {
      let result = await Product_collec.find({ _id: { $in: data } });
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send([]);
    }
  };
  console.log(req.body);
  find_prod(req.body.product_id_array);
});

app.listen(port);
