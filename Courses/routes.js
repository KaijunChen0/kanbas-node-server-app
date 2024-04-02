// import Database from "../Kanbas/Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
    app.put("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        const course = req.body;
        // Database.courses = Database.courses.map((c) =>
        //   c._id === id ? { ...c, ...course } : c
        // );
        try {
          await dao.updateCourse(id, course);
          res.sendStatus(204);
        } catch (error) {
          console.error(error);
          res.sendStatus(500);
        }
      });
    app.delete("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        // Database.courses = Database.courses
        //   .filter((c) => c._id !== id);
        try {
          await dao.deleteCourse(id);
          res.sendStatus(204);
        } catch (error) {
          console.error(error);
          res.sendStatus(500);
        }
      });    
    app.post("/api/courses", async (req, res) => {
        // const course = { ...req.body,
        //     _id: new Date().getTime().toString() };
        // Database.courses.push(course);
        // res.send(course);
        const course = req.body;
        try {
            const createdCourse = await dao.createCourse(course);
            res.send(createdCourse);
        } catch (error) {
            console.error(error);
            res.sendStatus(500); // Internal Server Error
        }
    });
  app.get("/api/courses", async (req, res) => {
    // const courses = Database.courses;
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  app.get("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    // const courses = Database.courses;
    // const course = courses.find((course) => course._id === courseId);
    const course = await dao.findCourseById(courseId);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });
  
}

  