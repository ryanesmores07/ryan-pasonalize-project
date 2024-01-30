import User from "../model/UserModel.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ user });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateUser) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ user: updateUser });
};
