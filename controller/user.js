const User = require("../model/user");

const toggleTheme = async (req, res) => {
  try {
    const { theme } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { theme },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.user.userId;
    if (!id) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { toggleTheme, updateUser, deleteUser };
