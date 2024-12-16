const User = require("../models/User.js");

exports.register = async (userInfo) => {
  const userExists = await User.findOne({ email: userInfo.email });
  if (userExists) {
    throw new Error("User already registered !");
  }

  const user = await User.create(userInfo);

  return user;
};
