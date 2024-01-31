import { StatusCodes } from "http-status-codes";
import User from "../model/UserModel.js";

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
  const { id } = req.params;
  const updateUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ user: updateUser });
};
