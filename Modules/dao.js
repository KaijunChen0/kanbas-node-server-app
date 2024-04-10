import moduleModel from "./model.js";

// export const findAllModules = () => moduleModel.find();//cannot display other modules that are not associated with a course
export const findModuleById = (id) => moduleModel.findOne({id: id});//this id is not the primary key _id in mongodb actually
export const findModulesByCourse = (course) => moduleModel.find({course: course});
export const createModule = (module) => moduleModel.create(module);
export const updateModule = (id, module) => moduleModel.updateOne({ id: id },  {$set:module});
export const deleteModule = (id) => moduleModel.deleteOne({ id: id });