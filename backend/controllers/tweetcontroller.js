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
