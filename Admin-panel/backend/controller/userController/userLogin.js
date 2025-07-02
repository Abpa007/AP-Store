import userModel from "../../model/userModel/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Enter a valid email or email not found",
      });
    }

    const user = await userModel.findOne({ email }).lean();

    if (!user) {
      return res.status(400).json({
        message: "Enter a valid email or password",
      });
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        message: "Enter a valid password or password not found",
      });
    }

    delete user.password;

    // Make sure your .env uses the correct variable name: JWT_SECRET_KEY
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      user,
      token,
      message: "User logged in successfully",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
