// import db from "../Kanbas/Database/index.js";

export default function UserRoutes(app){
    app.get("/api/users", (req, res) => {
        const users = db.users;
        res.send(users);
    });
    app.post("/api/users/register", (req, res) => {
        const { username, password } = req.body;
        if (db.users.find(user => user.username === username)){
            res.status(400).send("Username already exists");
            return;
        }
        const newUser = { username, password, _id:Date.now().toString()};
        db.users.push(newUser);
        // req.session.currentUser = newUser;
        req.session["currentUser"] = newUser; // same as req.session.currentUser = newUser;
        res.send(newUser);
    });
    app.get("/api/users/profile", (req, res) => {
        if(!req.session.currentUser){
            res.status(401).send("Not logged in"); //switch different browser, the same user need to register again
            return;
        }
        res.send(req.session.currentUser);
    });
    app.post("/api/users/logout", (req, res) => {
        req.session.destroy();
        res.send("logged out");
    });
    app.post("/api/users/login", (req, res) => {
        const { username, password } = req.body;
        const user = db.users.find(user => user.username === username && user.password === password);
        if(user){
            req.session.currentUser = user;
            res.send(user);
        } else {
            res.status(401).send("Invalid username or password");
        }
    });
}