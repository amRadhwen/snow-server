const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();

//middlewares


//routes


//catch
app.use("*", (req, res)=> {
	res.send("<pre>API is running :)</pre>")
})

//listen to port
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
	console.log(`Server is listening on port ${port}`)
})