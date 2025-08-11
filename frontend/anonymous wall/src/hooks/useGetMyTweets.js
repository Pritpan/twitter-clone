import axios from 'axios';
import { useEffect} from 'react';
import { TWEET_API_END_POINT } from '../utils/constant.js';
import { useDispatch , useSelector } from 'react-redux';
import { getAllTweet } from '../redux/tweetSlice.js';

const useGetMyTweets =  (id) => {
    const dispatch = useDispatch();
    const {refresh} = useSelector(store => store.tweet);
    const {isActive} = useSelector(store => store.tweet);


    const followingTweet = async () => {
        try {
          const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`, {
            withCredentials: true,
          });
          dispatch(getAllTweet(res?.data?.tweets));
          console.log(res.data.tweets);
          
          
        } catch (error) {
          console.error("Error fetching following tweets:", error);
        }
        
        }
        const fetchMyTweets = async ()=>{
            try {
                const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}` , { 
                    withCredentials: true,
                });
                console.log(res);
                    dispatch(getAllTweet(res?.data?.tweets));
                    } catch (error) {
                console.error("Error fetching profile:", error);
            }
                   
            }


    useEffect(() => {
        if(isActive)
        fetchMyTweets();
        else
        followingTweet();
    }, [ isActive,refresh]);
};

export default useGetMyTweets;