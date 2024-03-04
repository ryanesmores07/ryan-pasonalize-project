import { StatusCodes } from "http-status-codes";
import User from "../model/UserModel.js";

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
  const updateUser = await User.findByIdAndUpdate(req.user.userId, req.body);
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
