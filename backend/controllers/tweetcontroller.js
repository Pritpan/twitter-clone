import Tweet from '../models/tweetSchema.js'
import User from "../models/userSchema.js";


export const createTweet = async (req, res) => {
    try {
        const loggedInUserId = req.user;
        const id = loggedInUserId;
        const {  description } = req.body;
        if(!description) {
            return res.status(400).json({ message: "Description and ID are required" });
        }
        const user = await User.findById(id).select("-password ");
        await Tweet.create({
            description,
            userId:id,
        });
        return res.status(200).json({
            message: "tweet is created",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const deleteTweet = async (req,res) => {
    try {
        const loggedInUserId = req.user;
        const {id: tweetId}  = req.params;
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({
              message: "Tweet not found",
              success: false,
            });
          }

          if (tweet.userId.toString() !== loggedInUserId) {
            return res.status(403).json({
              message: "You are not authorized to delete this tweet",
              success: false,
            });
          }

          await Tweet.findByIdAndDelete(tweetId);

        return res.status(200).json({
            message:"Tweet deleted successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.user;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            // dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet."
            })
        }else{
            // like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your tweet."
            })
        }
    } catch (error) {
        console.log(error);
    }
};
export const getAllTweets = async (req,res) => {
    // loggedInUser ka tweet + following user tweet
    try {
        const loggedInUserId = req.user;
        const loggedInUser = await User.findById(loggedInUserId);
        const loggedInUserTweets = await Tweet.find({userId:loggedInUserId}).populate('userId', 'name username profilePhoto bannerPhoto').sort({createdAt: -1});
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId}).populate('userId', 'name username profilePhoto bannerPhoto').sort({createdAt: -1});
        }));

        const allTweets = loggedInUserTweets.concat(...followingUserTweet);

        // Sort the combined tweets by `createdAt` in descending order
        const sortedTweets = allTweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return res.status(200).json({
            tweets:sortedTweets,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}
export const getFollowingTweets = async (req,res) =>{
    try {
        const loggedInUserId = req.user;
        const loggedInUser = await User.findById(loggedInUserId); 
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId}).populate('userId', 'name username profilePhoto bannerPhoto');
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        });
    } catch (error) {
        console.log(error);
    }
}
