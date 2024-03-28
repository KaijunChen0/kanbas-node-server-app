import Database from "../Database/index.js";

export default function AssignmentRoutes(app){
    app.get("/api/courses/:coursesId/assignments", (req, res) => {
        const {coursesId} = req.params;
        const assignments = Database.assignments.filter((assignment) => assignment.course === coursesId);
        res.send(assignments);
    });
    app.get("/api/assignment/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = Database.assignments.find((a) => a._id === aid);
        res.send(assignment);
    });//can get a specific assignment by its id by testing

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
          ...req.body,
          course: cid,
          _id: new Date().getTime().toString(),
        };
        Database.assignments.push(newAssignment);
        res.send(newAssignment);
    });
    app.delete("/api/assignments/:aid", (req, res) => {
        const {  aid } = req.params;
        Database.assignments = Database.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = Database.assignments.findIndex(
          (a) => a._id === aid);
        Database.assignments[assignmentIndex] = {
          ...Database.assignments[assignmentIndex],
          ...req.body
        };
        res.sendStatus(204);
    });
}