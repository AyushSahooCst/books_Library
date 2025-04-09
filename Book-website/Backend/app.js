const express = require("express");
const app = express();

require("dotenv").config();
require("./Conn/conn");
require("./config/cloudinaryConfig");  // <-- Import Cloudinary config

const cors = require("cors");
const user = require("./router/user");
const Book = require("./router/book");
const Fevourite = require("./router/fevourite");
const Cart = require("./router/cart");
const Order = require("./router/order");
// const paymentRoutes = require("./router/paymentRoutes");


app.use(cors(["http://localhost:5173"]));
app.use(express.json());
//routes
app.use("/api/v1", user);
app.use("/api/v1", Book);
app.use("/api/v1", Fevourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
// app.use("/api/v1", paymentRoutes);

// creating prot

app.listen(process.env.PORT, () => {
  console.log(`server started at port  ${process.env.PORT}`);
});
