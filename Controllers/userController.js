const userModel = require("../Models/userModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const otp = Math.round(Math.random() * 100000);

const submitdata = async (req, res) => {
  const { username, phone, email, password } = req.body;
  try {
    const data = await userModel.create({
      username,
      phone,
      email,
      password,
      otp,
    });
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Hello ✔", // Subject line
      text: `Your otp is ${otp}`, // plain text body
    });
    console.log(info);
    res
      .status(200)
      .send({ message: "Data has been created successfully", data });
  } catch (error) {
    res.status(404).send({ message: "Error creating the new User", error });
  }
};

const verifyUser = async (req, res) => {
  const { _id } = req.params;
  const { otp } = req.body;
  try {
    const user = await userModel.findOne({ _id });
    console.log(user.verified);
    if (user.otp === otp) {
      user.verified = true;
      user.otp = null;
      res.status(200).send({ message: "User is verified", user });
    } else {
      res.status(404).send({ message: "User not found or OTP doesnot match" });
    }
  } catch (error) {
    res.status(404).send({ message: "Error verifieng user", error });
  }
};

const allusers = async (req, res) => {
  try {
    const allusers = await userModel.find();
    res.status(200).send({ message: "All users found", allusers });
  } catch (error) {
    res
      .status(404)
      .send({ message: "Error reading users", error: error.message });
  }
};
const singleuser = async (req, res) => {
  let { _id } = req.body;
  try {
    const singleuser = await userModel.findOne({ _id });
    if (singleuser) {
      res.status(200).send({ message: "All users found", singleuser });
    } else {
      res.status(200).send({ message: "ID NOT FOUND" });
    }
  } catch (error) {
    res
      .status(404)
      .send({ message: "Error reading users", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  // let { email } = req.body;
  // let { _id } = req.body;
  // let { _id } = req.params;
  let { _id } = req.query;

  try {
    // const data = await userModel.deleteOne({ _id });
    const data = await userModel.findByIdAndDelete({ _id });
    res.status(200).send({ message: "Deleted Successfully", data });
  } catch (error) {
    res
      .status(404)
      .send({ message: "Error reading users", error: error.message });
  }
};

const updateUser = async (req, res) => {
  let { _id } = req.params;
  let { newphone } = req.body;
  console.log(_id);
  try {
    const user = await userModel.findOne({ _id });
    if (user) {
      const updateduser = await userModel.findByIdAndUpdate(
        _id,
        {
          $set: {
            // password: newpassword,
            phone: newphone,
          },
        },
        {
          runValidators: true,
        }
      );
      res.status(200).send({ message: "Updated Successfully", updateduser });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating user", error: error.message });
  }
};
module.exports = { submitdata, allusers, singleuser, deleteUser, updateUser ,verifyUser};
