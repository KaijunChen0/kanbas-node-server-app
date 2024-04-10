// import db from "../Kanbas/Database/index.js";
import * as dao from "./dao.js";

// let currentUser = null;

export default function UserRoutes(app){
    app.get("/api/users", async (req, res) => {
        const { role } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        };
        // const users = db.users;
        const users = await dao.findAllUsers();
        res.send(users);
    });
    app.get("/api/users/:userId", async (req, res) => {
        const userId = req.params.userId;
        // const user = db.users.find(user => user._id === userId);
        const user = await dao.findUserById(userId);
        if(user){
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
    });
    app.put("/api/users/:userId", async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        currentUser = await dao.findUserById(userId);
        res.json(status);
    });
    app.post("/api/users/register", async (req, res) => {
        const { username, password } = req.body;
        const existingUser = await dao.findUserByCredentials(username, password);
        if (existingUser){
            res.status(400).json({ message: "Username already taken" });
            return;
        }
        // const newUser = { username, password, _id:Date.now().toString()};
        // db.users.push(newUser);
        // req.session.currentUser = newUser;
        const newUser = await dao.createUser({ username, password });
        req.session["currentUser"] = newUser; // same as req.session.currentUser = newUser;
        res.send(newUser);
    });
    app.post("/api/users/profile", async (req, res) => {
        const currentUser = req.session.currentUser;
        if(!currentUser){
            res.status(401).send("Not logged in"); //switch different browser, the same user need to register again
            return;
        }
        res.send(currentUser);
    });
    app.post("/api/users/logout", async (req, res) => {
        req.session.destroy();
        res.send("logged out");
    });
    app.post("/api/users/login", async (req, res) => {
        const { username, password } = req.body;
        const user = 
        // db.users.find(user => user.username === username && user.password === password);
        await dao.findUserByCredentials(username, password);
        if(user){
            req.session.currentUser = user;
            res.send(user);
        } else {
            res.status(401).send("Invalid username or password");
        }
    });
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    app.delete("/api/users/:userId", deleteUser);

}