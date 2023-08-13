const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("../db/connection.js");
const bcrypt = require("bcryptjs");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
const faceapi = require("face-api.js");
const userAuthenticate = require("../middlewares/userAuthenticate.js");
const adminAuthenticate = require("../middlewares/adminAuthenticate.js");

const User = require("../models/userSchema.js");
const Admin = require("../models/adminSchema.js");
const Criminal = require("../models/criminalSchema.js");

faceapi.env.monkeyPatch({ Canvas, Image });

async function LoadModels() {
  await faceapi.nets.faceRecognitionNet.loadFromDisk(
    process.cwd() + "/face_models"
  );
  await faceapi.nets.faceLandmark68Net.loadFromDisk(
    process.cwd() + "/face_models"
  );
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(
    process.cwd() + "/face_models"
  );
}

LoadModels();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.PASS,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

// FACE PROCESSING
async function processImages(images) {
  try {
    let counter = 0;
    const descriptions = [];
    // Loop through the images
    for (let i = 0; i < images.length; i++) {
      const img = await canvas.loadImage(images[i]);
      counter = (i / images.length) * 100;
      console.log(`Progress = ${counter}%`);
      // Read each face and save the face descriptions in the descriptions array
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections);
      console.log(detections)
    }

    return descriptions;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// FACE SEARCH
async function getDescriptorsFromDB(image) {
  // Get all the face data from mongodb and loop through each of them to read the data
  let faces = await Criminal.find();
  for (i = 0; i < faces.length; i++) {
    // Change the face data descriptors from Objects to Float32Array type
    for (j = 0; j < faces[i].descriptions.length; j++) {
      faces[i].descriptions[j] = new Float32Array(
        Object.values(faces[i].descriptions[j])
      );
    }
    // Turn the DB face docs to
    faces[i] = new faceapi.LabeledFaceDescriptors(
      faces[i].label,
      faces[i].descriptions
    );
  }

  // Load face matcher to find the matching face
  const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);

  // Read the image using canvas or other method
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  // Process the image for the model
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);

  // Find matching faces
  const detections = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const results = resizedDetections.map((d) =>
    faceMatcher.findBestMatch(d.descriptor)
  );
  return results;
}

// USER REGISTRATION
router.post("/register/user", async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);

  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ message: "Please fill the details properly." });
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ message: "User Already Exists" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      // Hashing password before storing using bcryptjs
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      const userRegister = await newUser.save();

      if (userRegister) {
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// ADMIN REGISTRATION
router.post("/register/admin", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res
      .status(422)
      .json({ message: "Please fill the details properly." });
  }

  try {
    const userExists = await Admin.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ message: "User Already Exists" });
    } else {
      const newAdmin = new Admin({
        firstname,
        lastname,
        email,
        password,
      });

      // Hashing password before storing using bcryptjs

      const salt = await bcrypt.genSalt(10);

      newAdmin.password = await bcrypt.hash(password, salt);

      const adminRegister = await newAdmin.save();

      if (adminRegister) {
        return res
          .status(201)
          .json({ message: "Admin registered successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// USER LOGIN
router.post("/login/user", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill the details properly" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const matchPassword = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Credentials" });
      } else {
        return res.status(200).json({ message: "Login Successful" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// ADMIN LOGIN
router.post("/login/admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill the details properly" });
    }

    const adminLogin = await admin.findOne({ email: email });

    if (adminLogin) {
      const matchPassword = await bcrypt.compare(password, adminLogin.password);

      const token = await adminLogin.generateAuthToken();

      // setting up cookies
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!matchPassword) {
        res.status(400).json({ message: "Invalid Credentials" });
      } else {
        res.status(200).json({ message: "Login Successful" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// GET USER PROFILE PAGE
router.get("/profile/user", userAuthenticate, (req, res) => {
  res.send(req.rootuser);
});

// GET admin PROFILE PAGE
router.get("/profile/admin", adminAuthenticate, (req, res) => {
  res.send(req.rootadmin);
});

// user LOGOUT PAGE
router.get("/logout/user", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("Logout successfull");
});

// admin LOGOUT PAGE
router.get("/logout/admin", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("Logout successfull");
});

// Email through nodemailer : sending subject and class code to all users of the department
router.post("/sendEmail", async (req, res) => {
  const { adminDepartment, adminEmail, subject, code, adminName } = req.body;

  const userData = await user.find({ department: adminDepartment });

  userData.forEach((user) => {
    const receiverEmail = user.email;

    let mailOptions = {
      from: `${adminName} <${adminEmail}>`,
      to: receiverEmail,
      subject: `${subject} - CLASS DETAILS`,
      html: `<div>
      <h3>Dear user, use the following details to mark your attendance.</h3>
      <br>
      <div><h2>Subject : ${subject}</h2></div>
      <div><h2>Class Code : ${code}</h2></div>
      </div>`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
  });

  res.send({ status: "Email sent" });
});

// update admin profile
router.post("/updateadmin", async (req, res) => {
  const { f_email, user } = req.body;

  const previous_data = await admin.findOne({ email: f_email });

  previous_data.firstname = user.firstname;
  previous_data.lastname = user.lastname;
  previous_data.department = user.department;
  previous_data.email = user.email;
  previous_data.gender = user.gender;
  previous_data.phone_number = user.phone_number;
  previous_data.password = user.password;
  previous_data.confirm_password = user.confirm_password;

  const updated_data = await previous_data.save();

  if (updated_data) {
    res.status(201).send({ message: "data updated" });
  } else {
    res.status(400).send({ message: "Failed to update data" });
  }
});

// update user profile
router.post("/updateuser", async (req, res) => {
  const { s_email, user } = req.body;

  const previous_data = await user.findOne({ email: s_email });

  previous_data.name = user.name;
  previous_data.enrollment_no = user.enrollment_no;
  previous_data.birth_date = user.birth_date;
  previous_data.email = user.email;
  previous_data.department = user.department;
  previous_data.semester = user.semester;
  previous_data.gender = user.gender;
  previous_data.phone_number = user.phone_number;
  previous_data.password = user.password;
  previous_data.confirm_password = user.confirm_password;
  previous_data.image = user.image;

  const updated_data = await previous_data.save();

  if (updated_data) {
    res.status(201).send({ message: "data updated" });
  } else {
    res.status(400).send({ message: "Failed to update data" });
  }
});

// ADD CRIMINAL
router.post("/criminal/add", async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    nationality,
    gender,
    criminalRecord,
    mugshot,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !nationality ||
    !gender ||
    !criminalRecord
  ) {
    return res
      .status(422)
      .json({ message: "Please fill the details properly." });
  }

  const File1 = req.files.File1.tempFilePath;
  const File2 = req.files.File2.tempFilePath;
  const File3 = req.files.File3.tempFilePath;

  console.log(req.body);

  let result = await processImages([File1, File2, File3]);
  console.log(result);
  try {
    const newCriminal = new Criminal({
      firstName,
      lastName,
      dateOfBirth,
      nationality,
      gender,
      criminalRecord,
      mugshot,
      descriptions: result,
    });

    const criminalSaved = await newCriminal.save();

    if (criminalSaved) {
      return res.status(201).json({ message: "Criminal Saved successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// FIND CRIMINAL
router.post("/criminal/find", async (req, res) => {
  const File1 = req.files.File1.tempFilePath;
  let result = await getDescriptorsFromDB(File1);
  res.json({ result });
});

// GET CRIMINALS
router.get("/criminals", async(req, res) => {
  const allCriminals = await Criminal.find();
  res.send(allCriminals);
});

module.exports = router;