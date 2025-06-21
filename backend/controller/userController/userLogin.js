import userModel from "../../model/userModel/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.staus(400).json({
        message: "enter valid email orr email not found",
      });
    }
    const user = await userModel.findOne({ email }).lean();

    if (!user) {
      return res.status(400).json({
        message: "enter valid email or password",
      });
    }

    const isMatched = bcrypt.compareSync(password, user.password); // true
    if (!isMatched) {
      return res.staus(400).json({
        message: "enter valid password orr password not found",
      });
    }
    delete user.password;

    let token = jwt.sign(user, process.env.JWT_SECRETE_KEY, {
      expiresIn: "30d",
    });
    return res.status(200).json({
      user,
      token,
      message: "User logged in successfully",
    });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
};
// Get user (example placeholder)
