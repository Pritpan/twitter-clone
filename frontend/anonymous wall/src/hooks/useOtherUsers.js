import axios from 'axios';
import { useEffect} from 'react';
import { USER_API_END_POINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { getOtherUser } from '../redux/userSlice.js';

const useOtherUsers =  (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUser= async ()=>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}` , { 
                withCredentials: true,
            });
            console.log(res);
                dispatch(getOtherUser(res?.data?.otherUsers));
                } catch (error) {
            console.error("Error fetching profile:", error);
        }
               
        }
        fetchOtherUser();
    }, [id]);
};

export default useOtherUsers;