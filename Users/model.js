import mongoose from "mongoose";
import userSchema from "./userSchema.js";

const userModel = mongoose.model("Users", userSchema);
export default userModel;