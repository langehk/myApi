// Importerer package - express.
const express = require("express");
//Execute express i vores app.
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");


// Middleware.
app.use(cors());
/*
Hver gang vi bruger en request, sørger vi for, at body-parser kører!
*/
app.use(bodyParser.json());
// Man kan nu lave routes.

const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");


//Middleware.
app.use("/posts", postsRoute);
app.use("/users", usersRoute);


// Connect to DB.
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to DB!");
});

//How to listen to the server.
// Angiv en port.
app.listen(3000);
