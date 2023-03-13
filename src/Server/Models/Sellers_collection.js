const mongo_conn = require("mongoose");
const seller_schema = new mongo_conn.Schema({
  order_id: {
    type: String,
    require: true,
  },
  seller_id: {
    type: String,
    require: true,
  },
  customer_id: {
    type: String,
    require: true,
  },
  order: {
    type: Array,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

const seller_model = new mongo_conn.model("sellers_orders", seller_schema);
module.exports = seller_model;
