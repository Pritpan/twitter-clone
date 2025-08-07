import bcryptjs from 'bcryptjs';
import User from './../models/userSchema.js';
import jwt from 'jsonwebtoken';



export const registerUser = async (req, res) => {
  
  try {

    const { username, email, password, name } = req.body;
    if(!username || !email || !password || !name) {
        return res.status(400).json({ message: "All fields are required", success: false });    
    }
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists", success: false
        });}

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({
        username,
        name,
        email,
        password: hashedPassword,
    });
    return res.status(200).json({
      message: "User registered successfully",
      success: true,
    });
}
    catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req, res) => {
  
  try {
    const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    // Compare passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    const tokendata = {
      userID: user._id
    }

    const token = await jwt.sign({tokendata}, process.env.TOKEN_SECRET, {expiresIn:"1d"}  );
    return res.status(201).cookie("token", token , { expiresIn:"1d" , httponly:true}).json({
      message:`welcome back ${user.name}`,
       success: true
    });


  } catch (error) {
    console.log(error);
  }
}

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "User logged out successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
}


