import express from "express";
import { userRegister } from "../../controller/userController/userRegister.js";
import { userLogin } from "../../controller/userController/userLogin.js";
import { getUser } from "../../controller/userController/getUser.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.get("/profile", verifyToken, getUser);

export default userRoute;
