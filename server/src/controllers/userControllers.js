import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/erorr.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName) return sendErrRes(res, "First Name is missing!", 422);
    if (!lastName) return sendErrRes(res, "Last Name is missing!", 422);
    if (!email) return sendErrRes(res, "Email is missing!", 422);
    if (!password) return sendErrRes(res, "Password is missing!", 422);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
    });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return next(createError(400, "User with this email already exist"));

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) return sendErrRes(res, "Email is missing!", 422);
    if (!password) return sendErrRes(res, "Password is missing!", 422);

    const user = await User.findOne({ email: email });
    if (!user) return next(createError(422, "Invalid email or password"));

    const age = 1000 * 60 * 60 * 24 * 7;

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return next(createError(422, "Invalid email or password"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: age,
      }
    );

    const { password: userPassword, ...userDetails } = user._doc;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(userDetails);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({
      message: "Address added successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addAddress = async (req, res) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    country,
    postalCode,
    mobileNo,
    default: isDefault,
  } = req.body;

  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAddress = {
      firstName,
      lastName,
      address1,
      address2,
      city,
      country,
      postalCode,
      mobileNo,
      default: false,
    };

    user.addresses.push(newAddress);

    if (isDefault) {
      await user.setDefaultAddress(
        user.addresses[user.addresses.length - 1]._id
      );
    } else {
      await user.save();
    }
    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAddress = async (req, res) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    country,
    postalCode,
    mobileNo,
    isDefault: isDefault,
  } = req.body;

  const { userId, address } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressIndex = user.addresses.findIndex(
      (addr) => addr._id.toString() === address
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }
    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex],
      firstName,
      lastName,
      address1,
      address2,
      city,
      country,
      postalCode,
      mobileNo,
      default: isDefault || false,
    };

    if (isDefault) {
      user.addresses.forEach((address, index) => {
        user.addresses[index].default = false;
      });
      user.addresses[addressIndex].default = true;
    }

    await user.save();

    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    path: "/",
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({ message: "Logout Successful!" });
};
