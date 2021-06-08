const express = require("express");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const requestModel = require("./schema");
const requestRouter = express.Router();
var mongoose = require("mongoose");
const { authorize } = require("../auth/middleware")
var msg = {
  to: "lolskinsspothlight@gmail.com", // Change to your recipient
  from: "evgeni776@abv.bg", // Change to your verified sender
  subject: "New Order",
  text: "Shop online at http://localhost:3000",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

requestRouter.get("/getRequests",authorize, async (req, res, next) => {
  try {
    console.log("newRequest")
    const requests = await requestModel.find()
    res.send(requests);
    console.log("-----Requests sent------");
  } catch (error) {
    next(error);
  }
});
requestRouter.post("/addRequest", async (req, res, next) => {
  try {
    const newRequest = new requestModel(req.body);
    const { _id } = await newRequest.save();
    res.send(_id);
    console.log("-----Request added------");
  } catch (error) {
    next(error);
  }
});
requestRouter.delete("/deleteRequest/:id",authorize, async (req, res, next) => {
  console.log("123132")
  try {
    const requestArray = await requestModel.findByIdAndDelete(
      mongoose.Types.ObjectId(req.params.id)
    );
    requestArray.save();
    res.send("ok");
    console.log("-----Request removed------");
  } catch (error) {
    next(error);
  }
});
requestRouter.put("/editRequest/:id",authorize, async (req, res, next) => {
  try {
    const editRequest = await requestModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      {
        $set: { ...req.body }
      },{ new: true }
    );
    editRequest.save();
    res.send("ok");
    console.log("-----Request edited------");
  } catch (error) {
    next(error);
  }
});
module.exports = requestRouter;
