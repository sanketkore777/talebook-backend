const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("./config/dbConfig");
const User = require("./models/User");
const authRoute = require("./routes/authRoute");
const homeRoute = require("./routes/homeRoute");
dbConnection();
const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use("/auth", authRoute);
app.use("", homeRoute);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
