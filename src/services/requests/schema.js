const { Schema, model } = require("mongoose");
const RequestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const RequestModel = model("Requests", RequestSchema);

module.exports = RequestModel;
