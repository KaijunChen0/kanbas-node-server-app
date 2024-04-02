import mongoose from "mongoose";
import courseSchema from "./courseSchema.js";

const courseModel = mongoose.model("Courses", courseSchema);
export default courseModel;