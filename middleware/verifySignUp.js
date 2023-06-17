const User = require("../models/UserModel")

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
        username: req.body.username
    });
    // console.log(user)

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    // Email
    user = await User.findOne({
        email: req.body.email
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// const check_allowed_role = async (req, res, next) => {
//   try {
//     if(req.body.role === 'admin' || req.body.role == 'moderator' || req.body.role == 'user'){
//       next()
//     } else {
//       return res.status(400).send("Not allowed role");
//     }
//   } catch(error) {
//     return res.status(500).send({
//       message: error.message
//     });
//   }
// };


const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
