const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
        },
        refreshToken: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

ProfileSchema.statics.findByCredentials = async function (email, plainPW) {
  const user = await this.findOne({ email });
 
  if (user) {
    console.log("USER ---------------------->", this.email);
    console.log("USER PASSWORD ------------>", user.password, plainPW);
    const isMatch = await bcrypt.compare(plainPW, user.password);
    console.log(isMatch);
    if (isMatch) return user;
    else return null;
  } else {
    return null;
  }
};

const ProfileModel = model("Profiles", ProfileSchema);

module.exports = ProfileModel;
