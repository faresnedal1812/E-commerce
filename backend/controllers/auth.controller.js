import validator from "validator";
import User from "./../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true, // to prevent XSS attack => cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // to prevent CSRF attack => cross site request forgery attack
    maxAge: 15 * 60 * 1000, // 15m
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true, // to prevent XSS attack => cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // to prevent CSRF attack => cross site request forgery attack
    maxAge: 7 * 24 * 60 * 60 * 1000, // 15m
  });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (name.length < 6) {
    return res
      .status(400)
      .json({ message: "Name must be at least 6 characters long" });
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return res.status(400).json({
      message:
        "Name must contain only letters, spaces, hyphens, and apostrophes",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    return res.status(400).json({
      message:
        "Password must be at least 6 characters, include 1 lowercase, 1 uppercase letter and 1 number",
    });
  }
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({ name, email, password });

    // authenticate

    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json(user);
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All feilds are required" });
  }
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(200).json(user);
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  try {
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await redis.del(`refresh_token:${decoded.userId}`);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token)
      return res.status(400).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (refresh_token !== storedToken)
      return res.status(400).json({ message: "Invalid refresh token" });

    const access_token = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ messages: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refreshToken controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
