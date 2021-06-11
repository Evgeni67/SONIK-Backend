const express = require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const WorkerModel = require("./schema");
const workersRouter = express.Router();
var mongoose = require("mongoose");
const cloudinary = require("../utilities/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { authorize } = require("../auth/middleware");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "samples",
  },
});
const cloudinaryMulter = multer({ storage: storage });
var msg = {
  to: "lolskinsspothlight@gmail.com", // Change to your recipient
  from: "evgeni776@abv.bg", // Change to your verified sender
  subject: "New Order",
  text: "Shop online at http://localhost:3000",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
workersRouter.get("/getWorkers", async (req, res, next) => {
  try {
    const workers = await WorkerModel.find();
    res.send(workers);
    console.log("-----Workers sent------");
  } catch (error) {
    next(error);
  }
});
workersRouter.post("/addWorker", authorize, async (req, res, next) => {
  try {
    console.log(req.body)
    const newWorker = new WorkerModel(req.body);
    const { _id } = await newWorker.save();
    res.send(WorkerModel.find());
    console.log("-----Worker added------");
  } catch (error) {
    next(error);
  }
});
workersRouter.post(
  "/addPictureToWorker/:id",
  authorize,
  cloudinaryMulter.single("postPic"),
  async (req, res, next) => {
    try {
      console.log(req.file.path);
      const newWorker = await WorkerModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        {
          $set: { profileImg: req.file.path },
        },
        { new: true }
      );
      const { _id } = await newWorker.save();
      res.send(await WorkerModel.find());
      console.log("-----newWorker picture added------");
    } catch (error) {
      next(error);
    }
  }
);
workersRouter.delete("/removeWorker/:id",authorize, async (req, res, next) => {
  try {
    const workersArray = await WorkerModel.findByIdAndDelete(
      mongoose.Types.ObjectId(req.params.id)
    );
    workersArray.save();
    res.send(WorkerModel.find());
    console.log("-----Worker removed------");
  } catch (error) {
    next(error);
  }
});
workersRouter.put("/editWorker/:id",authorize, async (req, res, next) => {
  try {
    const editWorker = await WorkerModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    editWorker.save();
    res.send(await WorkerModel.find());
    console.log(req.body);
    console.log("-----Worker edited------");
  } catch (error) {
    next(error);
  }
});
module.exports = workersRouter;
