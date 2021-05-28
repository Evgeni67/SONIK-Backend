const express = require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ApplyModel = require("./schema");
const applyRouter = express.Router();
const multer = require("multer");
var mongoose = require("mongoose");
const cloudinary = require("../utilities/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
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
applyRouter.get("/getApplies", async (req, res, next) => {
  try {
    const applies = await ApplyModel.find();
    res.send(applies);
    console.log("-----Applies sent------");
  } catch (error) {
    next(error);
  }
});
applyRouter.get("/getApply/:id", async (req, res, next) => {
  try {
    const apply = await ApplyModel.findById(
      mongoose.Types.ObjectId(req.params.id)
    );
    res.send(apply);
    console.log("-----Applies sent------");
  } catch (error) {
    next(error);
  }
});
applyRouter.post(
  "/addApply",
  cloudinaryMulter.single("postPic"),
  async (req, res, next) => {
    try {
      console.log(req.body);
      const newApply = new ApplyModel(req.body);
      const { _id } = await newApply.save();
      res.send( _id );
      
      console.log("-----Apply added------");
      console.log(res)
    } catch (error) {
      next(error);
    }
  }
);
applyRouter.post(
  "/addPictureToApply/:id",
  cloudinaryMulter.single("postPic"),
  async (req, res, next) => {
    try {
      console.log(req.file.path);
      const newApply = await ApplyModel.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        {
          $set: { pic: req.file.path },
        },
        { new: true }
      );
      const { _id } = await newApply.save();
      res.send(_id);
      console.log("-----Apply added------");
    } catch (error) {
      next(error);
    }
  }
);
applyRouter.delete("/declineApply/:id", async (req, res, next) => {
  try {
    const appliesArray = await ApplyModel.findByIdAndDelete(
      mongoose.Types.ObjectId(req.params.id)
    );
    appliesArray.save();
    res.send("ok");
    console.log("-----Apply declined------");
  } catch (error) {
    next(error);
  }
});
applyRouter.put("/editApply/:id", async (req, res, next) => {
  try {
    const editApply = await ApplyModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      {
        $set: { name: "nikolay" },
      },
      { new: true }
    );
    editApply.save();
    res.send("ok");
    console.log("-----Apply edited------");
  } catch (error) {
    next(error);
  }
});
module.exports = applyRouter;
