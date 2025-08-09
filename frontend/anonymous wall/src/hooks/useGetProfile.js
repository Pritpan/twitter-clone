import axios from 'axios';
import { useEffect} from 'react';
import { USER_API_END_POINT } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/userSlice.js';

const useGetProfile =  (Id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProfile = async ()=>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/profile/${Id}` , { 
                withCredentials: true,
            });
            console.log(res);
                dispatch(getMyProfile(res.data.user));
                } catch (error) {
            console.error("Error fetching profile:", error);
        }
               
        }
        fetchProfile();
    }, []);
};

export default useGetProfile;