import userModel from "./model.js";

export const createUser = (user) => {
    delete user._id;// delete the _id field from the user object in case client sends it, database will create _id for us instead
    return userModel.create(user);
}
export const findAllUsers = () => userModel.find();
export const findUserById = (userId) => userModel.findOne({ id: userId });
export const findUserByUsername = (username) =>  userModel.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  userModel.findOne({ username: username, password: password });
export const updateUser = (userId, user) =>  userModel.updateOne({ id: userId }, { $set: user });
export const deleteUser = (userId) => userModel.deleteOne({ id: userId });
export const findUserByEmail = (email) => userModel.findOne({ email: email});
export const findUsersByRole = (role) => userModel.find({ role: role}); //findOne({ role: role}); is to find only one user, find({ role: role}); is to find all users with the same role
