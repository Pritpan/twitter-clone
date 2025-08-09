import axios from 'axios';
import { useEffect} from 'react';
import { Tweet_API_END_POINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { getAlltweet } from '../redux/tweetSlice.js';

const useGetMyTweets =  (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMyTweets = async ()=>{
        try {
            const res = await axios.get(`${Tweet_API_END_POINT}/alltweets/${id}` , { 
                withCredentials: true,
            });
            console.log(res);
                dispatch(getAlltweet(res?.data?.tweets));
                } catch (error) {
            console.error("Error fetching profile:", error);
        }
               
        }
        fetchMyTweets();
    }, [id]);
};

export default useGetMyTweets;