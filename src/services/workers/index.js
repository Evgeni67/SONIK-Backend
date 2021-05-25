const express = require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const WorkerModel = require("./schema");
const workersRouter = express.Router();
var mongoose = require("mongoose");

var msg = {
  to: "lolskinsspothlight@gmail.com", // Change to your recipient
  from: "evgeni776@abv.bg", // Change to your verified sender
  subject: "New Order",
  text: "Shop online at http://localhost:3000",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
workersRouter.get("/getWorkers", async (req, res, next) => {
    try {
      const workers = await WorkerModel.find()
      res.send(workers);
      console.log("-----Workers sent------");
    } catch (error) {
      next(error);
    }
  });
workersRouter.post("/addWorker", async (req, res, next) => {
  try {
    const newWorker = new WorkerModel(req.body);
    const { _id } = await newWorker.save();
    res.send(_id);
    console.log("-----Worker added------");
  } catch (error) {
    next(error);
  }
});
workersRouter.delete("/removeWorker/:id", async (req, res, next) => {
  try {
    const workersArray = await WorkerModel.findByIdAndDelete(
      mongoose.Types.ObjectId(req.params.id)
    );
    workersArray.save();
    res.send("ok");
    console.log("-----Worker removed------");
  } catch (error) {
    next(error);
  }
});
workersRouter.put("/editWorker/:id", async (req, res, next) => {
  try {
    const editWorker = await WorkerModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      {
        $set: { "name":"nikolay" }
      },{ new: true }
    );
    editWorker.save();
    res.send("ok");
    console.log("-----Worker edited------");
  } catch (error) {
    next(error);
  }
});
module.exports = workersRouter;
