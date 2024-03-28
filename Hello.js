export default function Hello(app){

    // create a function to handle requests and send response with `Hello World`
    function sayHello(req, res){
        res.send("Hello world!");
    }

    function lifeIsGood(req, res){
        res.send("Life is good!!!");
    }

    function rootResponse(req, res){
        res.send("Welcome to Node.js HTTP Restful Server");
    }

    // configure app to listen for requests
    app.get("/hello", sayHello);
    app.get("/", rootResponse);
    app.get("/good", lifeIsGood);

}