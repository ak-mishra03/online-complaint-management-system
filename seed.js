require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Complaint = require("./models/Complaint");

const demoUsers = [
  {
    _id: new mongoose.Types.ObjectId("673f1aa12abf8c0012321001"),
    username: "user123",
    password: "pass123",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    complaints: [],
    createdAt: new Date("2024-01-15")
  },
  {
    _id: new mongoose.Types.ObjectId("673f1aa12abf8c0012321002"),
    username: "user456",
    password: "pass456",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    complaints: [],
    createdAt: new Date("2024-02-20")
  },
  {
    _id: new mongoose.Types.ObjectId("673f1aa12abf8c0012321003"),
    username: "user789",
    password: "pass789",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    complaints: [],
    createdAt: new Date("2024-03-10")
  },
  {
    _id: new mongoose.Types.ObjectId("673f1aa12abf8c0012321004"),
    username: "user101",
    password: "pass101",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "user",
    complaints: [],
    createdAt: new Date("2024-04-05")
  },
  {
    _id: new mongoose.Types.ObjectId("673f1aa12abf8c0012321005"),
    username: "admin",
    password: "admin123",
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
    complaints: [],
    createdAt: new Date("2024-01-01")
  }
];

const demoComplaints = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Broken Street Light",
    category: "Infrastructure",
    description: "The street light on Main Street has been non-functional for a week.",
    status: "Processing",
    user: new mongoose.Types.ObjectId("673f1aa12abf8c0012321001"),
    createdAt: new Date("2024-11-01")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Water Supply Issue",
    category: "Service",
    description: "No water supply in Block A for the past 2 days.",
    status: "Accepted",
    user: new mongoose.Types.ObjectId("673f1aa12abf8c0012321001"),
    createdAt: new Date("2024-11-03")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Garbage Collection Delay",
    category: "Service",
    description: "Garbage has not been collected for 4 days in Sector 5.",
    status: "Completed",
    user: new mongoose.Types.ObjectId("673f1aa12abf8c0012321002"),
    createdAt: new Date("2024-10-28"),
    updatedAt: new Date("2024-11-02")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Parking Space Misuse",
    category: "Facilities",
    description: "Unauthorized vehicles are using designated parking spaces.",
    status: "Processing",
    user: new mongoose.Types.ObjectId("673f1aa12abf8c0012321003"),
    createdAt: new Date("2024-11-02")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Damaged Road Surface",
    category: "Infrastructure",
    description: "Large potholes on Oak Avenue causing damage risk.",
    status: "Accepted",
    user: new mongoose.Types.ObjectId("673f1aa12abf8c0012321002"),
    createdAt: new Date("2024-11-04")
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Noise Complaint",
    category: "Other",
    description: "Excessive noise from construction site after 10 PM.",
    status: "Processing",
    user: new mongoose.Types.ObjectId("673f1aa12abf8c0012321004"),
    createdAt: new Date("2024-11-05")
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected. Starting seeding...");

    await User.deleteMany({});
    await Complaint.deleteMany({});

    await User.insertMany(demoUsers);
    await Complaint.insertMany(demoComplaints);

    for (const complaint of demoComplaints) {
      await User.findByIdAndUpdate(complaint.user, { $push: { complaints: complaint._id } });
    }

    console.log("🎉 DATABASE SEEDED SUCCESSFULLY!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seedDatabase();

