//require
const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config();
const usersRoute = require("./routes/users.routers");
const authRoute = require("./routes/auth.routes");
const productsRoute = require("./routes/products.routes");
const orderRoute = require("./routes/order.routes");
const cartRoute = require("./routes/cart.routes");
const stripeRoute = require("./routes/stripe.routes");
const cors = require("cors");

//mongodb connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

//Initialize
const app = express();

(async () => {
    try {
        //cors
        app.use(cors());

        //To convert the request body into json
        app.use(express.json());


        //Port
        const port = process.env.PORT || 3001;

        //Routes
        app.use("/api/users", usersRoute);
        app.use("/api/auth", authRoute);
        app.use("/api/products", productsRoute);
        app.use("/api/orders", orderRoute);
        app.use("/api/carts", cartRoute);
        app.use("/api/checkout", stripeRoute);


        //server starting
        app.listen(port, () => console.log(`Server is running at port ${port}`));
    } catch (error) {
        console.log(error);
    }
})();