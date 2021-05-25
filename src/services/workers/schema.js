const { Schema, model } = require("mongoose");
const WorkersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    drivingLicense: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    }
   
  },
  { timestamps: true }
);

const WorkersModel = model("Workers", WorkersSchema);

module.exports = WorkersModel;
