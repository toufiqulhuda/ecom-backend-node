const User = require('../models/UserModel')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const { username, email, password } = req.body;
    if(!username && !email && !password){
      return res.status(400).json({message: 'Please enter all fields'});
    }else{
      const existsUser = await User.findOne({email})
      if(existsUser) return res.status(400).json({message: 'User already exists'});
      const user = await User.create({
        username, email,
        password: bcrypt.hashSync(password)
      });
      if(user){
        const token = jwt.sign({ id: user.id },
          process.env.SECRET || "iac-secret",
          {
             algorithm: 'HS256',
             allowInsecureKeySizes: true,
             expiresIn: 86400, // 24 hours
          });
        return res.status(200).json({user,token})
      }else{
        return res.status(200).json({message: "Unable to registraation"})
      }
    }
  
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.signin = async(req, res)=>{

  try{
	  
    const { email, password } = req.body
    if( !email && !password){
      res.status(400).json({message: 'Please enter all fields'});
    }
    const user = await User.findOne({
        email: email
    });

    if(!user){
      return res.status(404).json({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if(!passwordIsValid){
      return res.status(401).json({
        message: "Username and Password mismatch!",
      });
    }

    const token = jwt.sign({ id: user.id },
                           process.env.SECRET || "iac-secret",
                           {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: 86400, // 24 hours
                           });
    return res.status(200).json({user,token});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).json({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};
