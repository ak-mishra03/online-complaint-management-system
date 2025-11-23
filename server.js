require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/User");
const Complaint = require("./models/Complaint");


const app = express();

// Database connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


const PORT = process.env.PORT || 3000;
// Start server
app.listen(PORT, () =>
    console.log("Server running ")
);
