import db from "../Database/index.js";

export default function UserRoutes(app){
    app.get("/api/users", (req, res) => {
        const users = db.users;
        res.send(users);
    });
    app.get("/api/users/register/:username/:password", (req, res) => {
        const { username, password } = req.params;
        const newUser = { username, password };
        db.users.push(newUser);
        req.session.currentUser = newUser;
        res.send(newUser);
    });
    app.get("/api/users/profile", (req, res) => {
        if(!req.session.currentUser){
            res.status(401).send("Not logged in"); //switch different browser, the same user need to register again
            return;
        }
        res.send(req.session.currentUser);
    });
    app.get("/api/users/logout", (req, res) => {
        req.session.destroy();
        res.send("logged out");
    });
    app.get("/api/users/login/:username/:password", (req, res) => {
        const { username, password } = req.params;
        const user = db.users.find(user => user.username === username && user.password === password);
        if(user){
            req.session.currentUser = user;
            res.send(user);
        } else {
            res.status(401).send("Invalid username or password");
        }
    });
}