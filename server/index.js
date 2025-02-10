require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(bodyParser.json());

const url = process.env.MONGO_URI;

mongoose.connect(url)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  dateRegistered: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.use(cors())

app.post('/api', (req,res)=>{
    console.log("req body", req.body);

    return res.status(200).json({message : "Sucessfull"})
})

app.get("/getUser", async (req, res) => {
    const user = await User.find();
    return res.status(200).json({userDetails : user})
})
// Registration route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const newUser = new User({ name, email, password, age });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
