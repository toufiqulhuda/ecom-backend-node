const express = require("express")
const cors = require("cors")
// const cookieSession = require("cookie-session")
const auth_router = require("./routes/auth.routes");
const product_router = require('./routes/products.routes')
const cart_router = require('./routes/cart.routes')
const order_router = require('./routes/order.routes')
const contact_router = require('./routes/contact.routes')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(
//     cookieSession({
//       name: "session",
//       keys: [process.env.COOKIE_SECRET || "COOKIE_SECRET"], // should use as secret environment variable
//       httpOnly: true,
//       sameSite: 'strict'
//     })
//   );
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
// routes

app.use("/api/auth",auth_router)
app.use("/api/product",product_router)
app.use("/api/cart",cart_router)
app.use("/api/order",order_router)
app.use("/api/contact",contact_router)


const db = require("./db");
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

 


