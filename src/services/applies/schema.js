const { Schema, model } = require("mongoose");
const ApplySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    drivingLicense: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      
    },
    location: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },pic: {
      type: String,
      required: true,
    }
    ,cscsCard: {
      type: String,
      required: true,
    },
    workInTheUk: {
      type: String,
      required: true,
    }
    
  },
  { timestamps: true }
);

const ApplyModel = model("Apply", ApplySchema);

module.exports = ApplyModel;
