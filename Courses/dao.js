import courseModel from "./model.js";

export const findAllCourses = () => courseModel.find();
export const findCourseById = (id) => courseModel.findOne({id: id});//this id is not the primary key _id in mongodb actually
// export const findCourseById = (id) => courseModel.findById( id );//find by primary key _id in mongodb
export const createCourse = (course) => courseModel.create(course);
export const updateCourse = (id, course) => courseModel.updateOne({ id: id },  {$set:course});
export const deleteCourse = (id) => courseModel.deleteOne({ id: id });
