import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  description: {  type: String, required: true },
        like: { type: Array , default: [] }, 
    bookmark: { type: Array, default: [] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userDetails: { type: Array, default: [] } // This can store user details like name, username, etc.
}, {
  timestamps: true});
const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;