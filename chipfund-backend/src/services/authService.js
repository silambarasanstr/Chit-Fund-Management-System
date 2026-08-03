import User from "../models/User.js";

// ===============================
// Register User
// ===============================
export const registerUser = async ({ name, email, password, phone, role }) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Create User (password will be hashed by pre("save"))
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || "member",
  });

  // Generate JWT Token
  const token = user.generateAccessToken();

  return {
    user: {
      id: user._id,
      member: user.member,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isActive: user.isActive,
    },
    token,
  };
};

// ===============================
// Login User
// ===============================
export const loginUser = async ({ email, password }) => {
  // Find user with password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password using model method
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT Token
  const token = user.generateAccessToken();

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isActive: user.isActive,
    },
    token,
  };
};

// ===============================
// Get Current User
// ===============================
export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId)
    .populate("member")
    .select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


export const getUsers = async (role) => {
  const filter = {};

  if (role) {
    filter.role = role;
  }

  return await User.find(filter)
    .select("name email member")
    .sort({ name: 1 });
};
