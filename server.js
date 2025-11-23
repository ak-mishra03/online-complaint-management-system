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


// ---------------------- ROUTES ---------------------- //
// Login page
app.get("/", (req, res) => {
    res.render("login");
});

// Handle login (Admin / User)
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
        return res.render("error", { message: "Invalid username or password!" });
    }

    // Admin goes directly to admin dashboard
    if (user.role === "admin") {
        const complaints = await Complaint.find().populate("user");
        const users = await User.find();
        return res.render("adminDashboard", { complaints, users });
    }

    // User gets redirected to their dashboard
    res.redirect(`/dashboard/${user._id}`);
});
// Start server
app.listen(PORT, () =>
    console.log("Server running ")
);

