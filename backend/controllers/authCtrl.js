const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = async (req, res) => {
  const { name, email, password,role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    if (password.length < 6)
      return res.status(400).json({ msg: "Password is at least 6 character" });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      role
    });

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ==> TO DO FOR SECURE
    // res.cookie("token", token, {
    //     httpOnly: true, // Cannot be accessed by JavaScript
    //     secure: process.env.NODE_ENV === "production", // Only sent over HTTPS in production
    //     sameSite: "Strict", // Mitigate CSRF attacks
    //     maxAge: 13600000, // Cookie expiration time (1 hour)
    //   });

    res.status(200).json({
      msg: "User Created Successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(400).json({ msg: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ msg: "Login Successfull", token });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

// verify token

const verifyToken = async (req,res)=>{
  res.json({msg:"user authenticated"})
}



module.exports = { register,login,verifyToken };
