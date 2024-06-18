const Router = require("express").Router();
const User = require("../models/User");
const { generateJwtToken } = require("../config/jwtProvider");

const handleSignin = async (req, resp) => {
  try {
    const username = req.body?.username;
    const email = req.body?.email;
    const password = req.body?.password;
    let user;
    if (username) {
      user = await User.find({ username: username });
    } else {
      user = await User.find({ email: email });
    }
    if (!user) resp.send({ error: "User doesn't exist!" });

    if (password != user[0].password) resp.send({ error: "Wrong password!" });
    const token = await generateJwtToken({ id: user[0]._id });
    resp.send({ token: token, message: "Signin successful!" });
  } catch (error) {
    console.log(error);
    resp.send({ error: "Internal server error!" });
  }
};

const handleSignup = async (req, resp) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      resp.send({ error: "Fill all the fields!" });
    let isExist = await User.find({ username });
    if (isExist.length) resp.send({ error: "username already exists" });
    isExist = User.find({ email });
    if (isExist.length) resp.send({ error: "email already exists" });
    const _user = new User({ username, email, password });
    const savedUser = await _user.save();
    resp.send({ message: "Signup Successful", status: "user created" });
  } catch (error) {
    console.log(error);
    resp.send({ error: "server error!" });
  }
};

Router.get("/signin", handleSignin);
Router.get("/signup", handleSignup);

module.exports = Router;
