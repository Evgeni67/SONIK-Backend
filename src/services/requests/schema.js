const { Schema, model } = require("mongoose");
const RequestSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    question: {
      type: String
    },
    workerId: {
      type: String
    },
  },
  { timestamps: true }
);

const RequestModel = model("Requests", RequestSchema);

module.exports = RequestModel;
