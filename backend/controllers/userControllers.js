const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ✅ Generate JWT Token
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

// ✅ @desc    Register new user
// ✅ @route   POST /api/users/signup
// ✅ @access  Public
const signupUser = async (req, res) => {
  const {
    name,
    username,
    password,
    phone_number,
    gender,
    date_of_birth,
    role, // ✅ Fixed (was membership_status)
    bio,
    address,
    profilePicture, // ✅ Fixed (was profile_picture)
  } = req.body;

  try {
    // ✅ Validate required fields
    if (
      !name ||
      !username ||
      !password ||
      !phone_number ||
      !gender ||
      !date_of_birth ||
      !role ||
      !address ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode
    ) {
      return res.status(400).json({ error: "Please add all required fields." });
    }

    // ✅ Validate role
    if (!["admin", "user", "moderator"].includes(role)) {
      return res.status(400).json({ error: "Invalid role. Choose admin, user, or moderator." });
    }

    // ✅ Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      phone_number,
      gender,
      date_of_birth,
      role, // ✅ Correct field name
      bio: bio || "", // Default empty bio
      address, // ✅ Address object
      profilePicture: profilePicture || "https://example.com/default-profile.png", // ✅ Default profile pic
    });

    if (user) {
      const token = generateToken(user._id);
      return res.status(201).json({ username, token });
    } else {
      throw new Error("User creation failed.");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ @desc    Authenticate a user
// ✅ @route   POST /api/users/login
// ✅ @access  Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // ✅ Check if user exists
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      return res.status(200).json({ username, token });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ @desc    Get user data
// ✅ @route   GET /api/users/me
// ✅ @access  Private
const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getMe,
};
