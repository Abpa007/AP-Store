import userModel from "../../model/userModel/userSchema.js";
import bcrypt from "bcryptjs";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10); // salt + hash in one line
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
