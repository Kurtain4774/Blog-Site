const dotenv = require("dotenv");
const cors = require("cors");
const express = require('express');
const userRoutes = require('./api/user.js');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);

app.listen(3001, () => {
    console.log("Server started at port 3001");
});



