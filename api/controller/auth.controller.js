const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utilis/error.js");
// const { maxHeaderSize } = require("http");

module.exports.postSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log("i am here inside", password);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new Users({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await Users.findOne({ email });
    console.log(validUser._id);
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, "klnkjlnkjnkjnk");
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports.postGoogleIn = async (req, res, next) => {
  console.log("google");

  try {
    const user = await Users.findOne({ email: req.body.email });
    console.log("user", user);
    if (user) {
      const token = jwt.sign({ id: user._id }, "klnkjlnkjnkjnk");
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new Users({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      console.log("newUser", newUser);
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "klnkjlnkjnkjnk" );
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.signOut = async (req, res, next) => {
  console.log("signout");
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
