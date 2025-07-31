import bcryptjs from 'bcryptjs';
import User from './../models/userSchema.js';



export const registerUser = async (req, res) => {
  const { username, email, password, name } = req.body;
    if(!username || !email || !password || !name) {
        return res.status(400).json({ message: "All fields are required", success: false });    
    }
  try {
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


