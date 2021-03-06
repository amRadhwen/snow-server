const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

//import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// configure env variables
require("dotenv").config();

// connect to databse
require("./config/db").connectDB();

//express app
const app = express();

//middlewares
const { protectUser } = require("./middlewares/authMiddleware");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/products", express.static(path.join(__dirname, "/public/upload/products")));


//routes
app.use("/api/upload", uploadRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);


// catch any other request
app.use("*", (req, res)=> {
	res.send("<pre>API is running :)</pre>")
})

//listen to port
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
	console.log(`Server is listening on port ${port}`)
})
