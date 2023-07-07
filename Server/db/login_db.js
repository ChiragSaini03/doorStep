const mongo_conn = require("mongoose");
mongo_conn.set("strictQuery", true);
mongo_conn
  .connect(
    "mongodb+srv://doorstep_db_rohit:DoorStep123@cluster0.chgewfl.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conn is succcessfull");
  })
  .catch((err) => {
    console.log(err);
  });
