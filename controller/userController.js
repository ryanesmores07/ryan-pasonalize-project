import { StatusCodes } from "http-status-codes";
import User from "../model/UserModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const deleteMe = async (req, res) => {
  await User.findByIdAndUpdate(req.user.userId, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({ users });
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
