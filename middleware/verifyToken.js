const jwt = require("jsonwebtoken");
const User = require('../models/UserModel')

function extractToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
      return req.query.token;
  }
  return null;
}

verifyToken = (req, res, next) => {
  try {
    let token = extractToken(req)
  // console.log(req.session.token)

  if (!token) {
    return res.status(403).json({
      message: "Token not provided!",
    });
  }

  jwt.verify(token,
             process.env.SECRET || "iac-secret",
             async(err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: err.message,
                });
              }
              const user = await User.findById(decoded.id)

              if(user){
                next();
              }else{
                return res.status(401).json({
                  message: "Token is not valid or expire!",
                });
              }
              
             });
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
  
};

// isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);

//     if (user.role != "admin") {
//       return res.status(403).send({
//         message: "Require Admin Role!"
//       });
//     }
//     next();
//   } catch (error) {
//     return res.status(500).send({
//       message: "Unable to validate User role!",
//     });
//   }
// };

// isModerator = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);

//     if (user.role != "moderator") {
//       return res.status(403).send({
//         message: "Require moderator Role!"
//       });
//     }
//     next();
//   } catch (error) {
//     return res.status(500).send({
//       message: "Unable to validate User role!",
//     });
//   }
// };

// isModeratorOrAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
//     if (user.role == "moderator" || user.role == "admin") {
//       next()
//     }
//     else {
//       return res.status(403).send({
//         message: "Require Moderator or Admin Role!",
//       });
//     }
//   } catch (error) {
//     return res.status(500).send({
//       message: "Unable to validate Moderator or Admin role!",
//     });
//   }
// };

const authJwt = {
  verifyToken
  
};
module.exports = authJwt;
