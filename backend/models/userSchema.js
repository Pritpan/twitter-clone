import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {  type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    name: { type: String, required: true },
    followers: {type: Array, default: []},
    following: {type: Array, default: []},
    profilePhoto: { type: String, default: "https://res.cloudinary.com/doasrg6su/image/upload/v1755346925/defaultpfp_rrmjbu.jpg" }, // URL to the profile photo
    bio: { type: String, default: "" }, // User's bio or description  
    bannerPhoto: { type: String, default: "https://res.cloudinary.com/doasrg6su/image/upload/v1755347331/defbanneeer_mogtwg.jpg" }, // URL to the banner photo
    
}, {
  timestamps: true});
const User = mongoose.model("User", userSchema);
export default User;