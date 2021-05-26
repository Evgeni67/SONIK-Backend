const { Schema, model } = require("mongoose");
const ApplySchema = new Schema(
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

const ApplyModel = model("Apply", ApplySchema);

module.exports = ApplyModel;
