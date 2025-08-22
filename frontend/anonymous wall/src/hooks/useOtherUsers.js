import axios from 'axios';
import { useEffect} from 'react';
import { USER_API } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { getOtherUser } from '../redux/userSlice.js';

const useOtherUsers =  () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUser= async ()=>{
        try {
            const res = await axios.get(`${USER_API}/otheruser` , { 
                withCredentials: true,
            });
        
                dispatch(getOtherUser(res?.data?.otherUsers));
                } catch (error) {
            console.error("Error fetching profile:", error);
        }
               
        }
        fetchOtherUser();
    }, [dispatch]);
};

export default useOtherUsers;