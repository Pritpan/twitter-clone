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
      user,
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

export const bookmark = async (req, res) => {
  try {
      const loggedInUserId = req.body.id;
      const tweetId = req.params.id;
      const user = await User.findById(loggedInUserId);
      if (user.bookmarks.includes(tweetId)) {
          // remove
          await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
          return res.status(200).json({
              message: "Removed from bookmarks."
          });
      } else {
          // bookmark
          await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
          return res.status(200).json({
              message: "Saved to bookmarks."
          });
      }
  } catch (error) {
      console.log(error);
  }
};
export const getMyProfile = async (req, res) => {
  try {
      const id = req.params.id;
      const user = await User.findById(id).select("-password");
      return res.status(200).json({
          user,
          message: "User profile fetched successfully",
          success: true
      })
  } catch (error) {
      console.log(error);
  }
};

export const getOtherUsers = async (req,res) =>{ 
  try {
       const {id} = req.params;
       const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
       if(!otherUsers){
          return res.status(401).json({
              message:"Currently do not have any users."
          })
       };
       return res.status(200).json({
          otherUsers
      })
  } catch (error) {
      console.log(error);
  }
}

export const follow = async(req,res)=>{
  try {
      const loggedInUserId = req.body.id; 
      const userId = req.params.id; 
      const loggedInUser = await User.findById(loggedInUserId);
      const user = await User.findById(userId);
      if(!user.followers.includes(loggedInUserId)){
          await user.updateOne({$push:{followers:loggedInUserId}});
          await loggedInUser.updateOne({$push:{following:userId}});
      }else{
          return res.status(400).json({
              message:`User already followed to ${user.name}`
          })
      };
      return res.status(200).json({
          message:`${loggedInUser.name} just follow to ${user.name}`,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}
export const unfollow = async (req,res) => {
  try {
      const loggedInUserId = req.body.id; 
      const userId = req.params.id; 
      const loggedInUser = await User.findById(loggedInUserId);//patel
      const user = await User.findById(userId);//keshav
      if(loggedInUser.following.includes(userId)){
          await user.updateOne({$pull:{followers:loggedInUserId}});
          await loggedInUser.updateOne({$pull:{following:userId}});
      }else{
          return res.status(400).json({
              message:`User has not followed yet`
          })
      };
      return res.status(200).json({
          message:`${loggedInUser.name} unfollow to ${user.name}`,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}

export const updateProfile = async (req, res) => {
  try {
    const {id} = req.params;
    const { name, profilePhoto, bio, bannerPhoto } = req.body;
    const updateUser = await User.findByIdAndUpdate(id, 
      { name, profilePhoto, bio, bannerPhoto},
    {new: true});
    if(!updateUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updateUser,
      success: true
    });
  } catch (error) {
    console.log(error);
    
    
  }
}


