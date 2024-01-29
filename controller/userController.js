export const getAllUsers = async (req, res) => {
  res.status(200).json({ msg: "get all users" });
};

export const getSingleUser = async (req, res) => {
  res.status(200).json({ msg: "get single user" });
};
