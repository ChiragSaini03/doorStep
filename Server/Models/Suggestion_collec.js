const mongo_conn = require("mongoose");
const sugg_schema = new mongo_conn.Schema({
  keyword: {
    type: String,
  },
  product_id: {
    type: Array,
  },
});

const suggestion_model = new mongo_conn.model("suggestions", sugg_schema);
module.exports = suggestion_model;
