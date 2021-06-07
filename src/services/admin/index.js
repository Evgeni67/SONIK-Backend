const express = require("express");
const {
    authenticate,
    refreshToken,
    cryptPassword,
  } = require("../auth/tools");
  const ProfileModel = require("./schema");
  const adminRouter = express.Router();

  adminRouter.post("/register", async (req, res, next) => {
    try {
      const password = await cryptPassword(req.body.password);
      req.body["password"] = password;
      const newUser = new ProfileModel(req.body);
      const { _id } = newUser.save();
      res.send(newUser._id);
      console.log("-----Registered user------");
      msg.to = req.body.email
      sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
    } catch (error) {
      next(error);
    }
  });

  adminRouter.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await ProfileModel.findByCredentials(email, password, {
        new: true,
      });
      const tokens = await authenticate(user);
      res.send(tokens);
    } catch (error) {
      next(error);
    }
  });
  module.exports = adminRouter;