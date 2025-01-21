const dotenv = require("dotenv");
const cors = require("cors");
const express = require('express');
const userRoutes = require('./api/user.js');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);

//comment this out if using npm start and uncomment app.list below
module.exports = app;


//
// app.listen(3000, () => {
//     console.log("Server started at port 3000");
// });

