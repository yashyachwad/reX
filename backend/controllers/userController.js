// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // generate jwt token  ( for register )
// const generateToken = (userId) => {
//     return jwt.sign({ id:userId }, process.env.JWT_SECRET , {expiresIn : '7d' }) 
// }

// // register User
// const registerUser = async (req, res)=>{
//     try{
//         const {name, email, password} = req.body;

//         // if already user exists , ( same email )
//         const userExists = await User.findOne({email});
//         if(userExists){
//            return res.status(400).json({message:"User Already Exists"})
//         }

//         if(password.length < 8){ 
//             return res.status(400).json({ success:false, message: "Password Must Be Strong"})
//         }

//         // hashing password
//         const salt = await bcrypt.genSalt(10);
//         const hashedpassword = await bcrypt.hash(password, salt);


//         // create a user
//         const user = await User.create({
//             name,
//             email,
//             password: hashedpassword
//         })
//         return res.status(201).json({
//             _id: user._id,
//             name : user.name,
//             email : user.email,
//             token : generateToken(user._id)
//         })
//     }
//     catch(error){
//         res.status(500).json({
//             message: "Server Error",
//             error : error.message
//         })
//     }
 
// }




// // Login USer

// const loginUser = async (req,res)=>{
//     try{
//         const {email, password} = req.body;
//         const user  = await User.findOne({email});
//         if(!user){
//             return res.status(500).json({ message: "Invalid Email or Password !"})
//         }

//         // compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch){
//             return res.status(500).json({ message: "Incorrect Password "})
//         }
//         return res.status(201).json({
//             _id: user._id,
//             name : user.name,
//             email : user.email,
//             token : generateToken(user._id)
//         })
//     }
//    catch(error){
//         res.status(500).json({
//             message: "Server Error",
//             error : error.message
//         })
//     }
// }




// // Get User Profile function 

// const getUserProfile = async (req, res)=>{
//     try{
//         const user = await User.findById(req.user.id).select("-password")
//         if(!user){ 
//             return res.status(404).json({ message: "User Not Found !!"})
//         }
//         res.json(user)
//     }
//     catch(error){
//         res.status(500).json({
//             message: "Server Error",
//             error : error.message
//         })
//     }
// }

// module.exports = { registerUser, loginUser, getUserProfile };



////////////////////////////////////////////////////////////////////
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User Already Exists' });
    if (password.length < 8) return res.status(400).json({ message: 'Password Must Be Strong' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Email or Password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect Password' });

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User Not Found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
