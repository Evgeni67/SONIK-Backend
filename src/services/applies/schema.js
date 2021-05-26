const express = require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ApplyModel = require("./schema");
const applyRouter = express.Router();
var mongoose = require("mongoose");

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
applyRouter.post("/addApply", async (req, res, next) => {
  try {
    const newApply = new ApplyModel(req.body);
    const { _id } = await newApply.save();
    res.send(_id);
    console.log("-----Apply added------");
  } catch (error) {
    next(error);
  }
});
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
