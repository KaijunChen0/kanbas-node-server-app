export default function SecurityController(app){
    // try google browser and safari browser to see the difference, use the same key but different values, see that server can use the session and individual cookies to store the data
    app.get("/api/session/set/:key/:value", (req, res) => {
        const { key, value } = req.params;
        req.session[key] = value; // set the value of the key in a session for the user, different users will have different sessions
        res.send(`Key: '${key}' and Value: '${value}' are set`);
    });
    app.get("/api/session/get/:key", (req, res) => {
        const { key } = req.params;
        const value = req.session[key];// get the value of the key in a session for the user who came with the key
        res.send(`Value of '${key}' is '${value}'`);
    });
}