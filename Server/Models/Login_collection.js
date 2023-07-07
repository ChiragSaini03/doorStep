const mongo_conn = require("mongoose");
const validator = require("validator");
const login_schema = new mongo_conn.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter A Valid Email");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: [true, "Phone no already exist"],
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Login = new mongo_conn.model("doorstep_api", login_schema);
module.exports = Login;
