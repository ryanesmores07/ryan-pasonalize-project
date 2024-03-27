import { StatusCodes } from "http-status-codes";
import User from "../model/UserModel.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";

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
  const { search, jobBranch, bloodType, jobDepartment, sort } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { nickname: { $regex: search, $options: "i" } },
    ];
  }

  if (jobBranch && jobBranch !== "all") {
    queryObject.jobBranch = jobBranch;
  }
  if (jobDepartment && jobDepartment !== "all") {
    queryObject.jobDepartment = jobDepartment;
  }
  if (bloodType && bloodType !== "all") {
    queryObject.bloodType = bloodType;
  }

  queryObject.active = true;

  const sortOptions = {
    newest: "-yearEmployed",
    oldest: "yearEmployed",
    "a-z": "firstName",
    "z-a": "-firstName",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  const users = await User.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalUsers = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalUsers / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalUsers, numOfPages, currentPage: page, users });
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
    const file = await formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "update user" });
};

// export const updateUser = async (req, res) => {
//   try {
//     const newUser = { ...req.body };
//     delete newUser.password;

//     if (req.file) {
//       // Resize and compress the image
//       const compressedImagePath = `${req.file.path}_compressed`;

//       await sharp(req.file.path)
//         .resize(500, 500) // Resize to 500x500 dimensions
//         .jpeg({ quality: 70 }) // Adjust quality as needed
//         .toFile(compressedImagePath);

//       // Upload the compressed image to Cloudinary
//       const response = await cloudinary.v2.uploader.upload(compressedImagePath);

//       // Delete the compressed image from the server
//       await fs.unlink(compressedImagePath);

//       newUser.avatar = response.secure_url;
//       newUser.avatarPublicId = response.public_id;
//     }

//     const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

//     if (req.file && updatedUser.avatarPublicId) {
//       await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
//     }

//     return res.status(StatusCodes.OK).json({ msg: "User updated" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: "Internal server error" });
//   }
// };

export const showStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      // Exclude documents with active: false
      { $match: { active: { $ne: false } } },
      // Group by jobDepartment and calculate count
      { $group: { _id: "$jobDepartment", count: { $sum: 1 } } },
    ]);

    const formattedStats = stats.reduce((acc, curr) => {
      const { _id: department, count } = curr;
      acc[department] = count;
      return acc;
    }, {});

    res.status(StatusCodes.OK).json({ stats: formattedStats });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
