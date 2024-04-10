// import Database from "../Database/index.js";
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";

export default function ModuleRoutes(app){
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const {courseId} = req.params;
        // const modules = Database.modules.filter((module) => module.course === courseId);
        const modules = await dao.findModulesByCourse(courseId);
        res.send(modules);
    }); //testing passed

    app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        // const newModule = {
        //   ...req.body,
        //   course: cid,
        //   _id: new Date().getTime().toString(),
        // };
        // Database.modules.push(newModule);
        // res.send(newModule);
        try {
            const course = await courseDao.findCourseById(cid);
            if (!course) {
                res.status(404).send("Course not found");
                return;
            }
            const createdModule = await dao.createModule({module: req.body, course: cid});
            res.send(createdModule);
        }catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    });
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        // Database.modules = Database.modules.filter((m) => m._id !== mid);
        try{
            dao.deleteModule(mid);
            res.sendStatus(204);
        }catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    });
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        // const moduleIndex = Database.modules.findIndex(
        //   (m) => m._id === mid);
        // Database.modules[moduleIndex] = {
        //   ...Database.modules[moduleIndex],
        //   ...req.body
        // };
        // res.sendStatus(204);
        const module = req.body;
        try{
            dao.updateModule(mid, module);
            res.sendStatus(204);
        }catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    });
};