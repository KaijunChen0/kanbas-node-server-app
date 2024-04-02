import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        number : String,
        startDate: Date,
        endDate: Date,
        image: String,
        department: String,
        credits: Number,
        description: String,
    },
    {
        collection: "courses"
    }
    // where mongodb will store the data
);

export default courseSchema; // export the courseSchema object to be used in the model.js file