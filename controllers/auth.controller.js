import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 🔒 Validate Input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // 🔍 Check if User Already Exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // 🔐 Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧑 Create New User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // 💾 Save User
    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: savedUser,
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Input validation with trimming
  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  try {
    // ✅ Normalize email and fetch password explicitly
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ✅ Securely compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ✅ Generate tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    // ✅ Remove password before sending user data
    const { password: _, ...userData } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  // ✅ Check if refresh token is provided
  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token is required",
    });
  }

  try {
    // ✅ Verify the refresh token using JWT
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // ✅ Find user by decoded.userId
    const user = await User.findById(decoded.id || decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Generate a new access token
    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Optionally generate a new refresh token
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};
