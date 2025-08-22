import axios from 'axios';
import { useEffect} from 'react';
import { TWEET_API} from '../utils/constant.js';
import { useDispatch , useSelector } from 'react-redux';
import { getAllTweet } from '../redux/tweetSlice.js';

const useGetMyTweets =  () => {
    const dispatch = useDispatch();
    const {refresh} = useSelector(store => store.tweet);
    const {isActive} = useSelector(store => store.tweet);


    const followingTweet = async () => {
        try {
          const res = await axios.get(`${TWEET_API}/followingtweets`, {
            withCredentials: true,
          });
          dispatch(getAllTweet(res?.data?.tweets));
        
          
          
        } catch (error) {
          console.error("Error fetching following tweets:", error);
        }
        
        }
        const fetchMyTweets = async ()=>{
            try {
                const res = await axios.get(`${TWEET_API}/alltweets` , { 
                    withCredentials: true,
                });
                
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