import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "email already exist" });
    }
    const savedUser = await userData.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ error: "User not found" });
    }

    // Only update the fields that are sent in req.body
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Ensure validation runs during update
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const update = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const userExist = await User.findOne({ _id: id });
//     if (!userExist) {
//       return res.status(404).json({ error: "user not found" });
//     }
//     const updatedUser = await User.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: "internal server error" });
//   }
// };

export const deleted = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ error: "user not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "user mail not found" });
    }

    // Direct password comparison
    if (user.password !== password) {
      return res.status(401).json({ error: "incorrect password" });
    }

    // Send success response (no token or session needed)
    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal error" });
  }
};
