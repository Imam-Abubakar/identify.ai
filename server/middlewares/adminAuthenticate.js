const jwt = require("jsonwebtoken");
const Admin = require("../models/adminSchema.js");

const AdminAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootAdmin = await Admin.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootAdmin) {
      throw new Error("Admin not found");
    }

    req.token = token;
    req.rootAdmin = rootAdmin;
    req.AdminID = rootAdmin._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized : No token provided");
    console.log(error);
  }
};

module.exports = AdminAuthenticate;
