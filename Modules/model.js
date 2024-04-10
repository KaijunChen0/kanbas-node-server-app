import mongoose from "mongoose";
import moduleSchema from "./moduleSchema.js";

const moduleModel = mongoose.model("Modules", moduleSchema);
export default moduleModel;