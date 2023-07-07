const mongo_conn = require("mongoose");
const Cart_schema = new mongo_conn.Schema({
  cust_id: {
    type: String,
    require: true,
  },
  cart_detail: {
    type: Object,
  },
});
const Cart = new mongo_conn.model("cart_api", Cart_schema);
module.exports = Cart;
