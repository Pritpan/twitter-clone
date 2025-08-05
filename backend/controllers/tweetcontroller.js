import Tweet from '../models/tweetSchema.js'


export const createTweet = async (req, res) => {
    try {
        const {  description , id} = req.body;
        if(!description || !id) {
            return res.status(400).json({ message: "Description and ID are required" });
        }

        await Tweet.create({
            description,
            userId:id
        });
        return res.status(200).json({
            message: "tweet is created",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const deleteTweet = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet deleted successfully",
            success: true
        });
        
    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async (req, res) =>{
    try {
        const loggedInUserId = req.body.id;
        const Tweetid = req.params.id;
        const tweet = await Tweet.findById(Tweetid);
        if(tweet.like.includes(loggedInUserId)){
            await Tweet.findByIdAndUpdate(Tweetid, {$pull: {like: loggedInUserId}});
            return res.status(200).json({
                message: "Tweet unliked successfully",
            });}
            else{
                    await Tweet.findByIdAndUpdate(Tweetid, {$push:{like:loggedInUserId}});
                    return res.status(200).json({
                        message: "Tweet liked successfully"
                    });
            }
        }
     catch (error) {
        console.log(error);
        
    }
}
