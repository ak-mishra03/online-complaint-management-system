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

// Display user dashboard
app.get("/dashboard/:id", async (req, res) => {
    const userId = req.params.id;

    // Invalid ObjectId check
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.render("error", { message: "Invalid dashboard URL!" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.render("error", { message: "User account not found!" });
    }

    const complaints = await Complaint.find({ user: userId });
    res.render("userDashboard", { user, complaints });
});

// Submit a new complaint
app.post("/complaint", async (req, res) => {
    const { title, category, description, userId } = req.body;

    // Required fields check
    if (!title || !category || !description) {
        return res.render("error", { message: "All fields are required!" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.render("error", { message: "Invalid user account!" });
    }

    // Create complaint
    await new Complaint({
        title,
        category,
        description,
        user: userId,
        status: "Pending"
    }).save();

    res.redirect(`/dashboard/${userId}`);
});

// Update complaint status (Admin only)
app.post("/complaint/status/:id", async (req, res) => {
    const id = req.params.id;

    // Validate complaint ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.render("error", { message: "Invalid complaint ID!" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
        return res.render("error", { message: "Complaint not found!" });
    }

    await Complaint.findByIdAndUpdate(id, {
        status: req.body.status,
        updatedAt: new Date()
    });

    const complaints = await Complaint.find().populate("user");
    const users = await User.find();

    res.render("adminDashboard", { complaints, users });
});

// Logout user
app.get("/logout", (req, res) => {
    res.redirect("/");
});

// Start server
app.listen(PORT, () =>
    console.log("Server running ")
);





