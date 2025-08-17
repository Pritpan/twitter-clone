import axios from 'axios';
import { useEffect} from 'react';
import { USER_API } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../redux/userSlice.js';

const useGetProfile =  (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProfile = async ()=>{
        try {
            const res = await axios.get(`${USER_API}/profile/${id}` , { 
                withCredentials: true,
            });
            

                dispatch(getMyProfile(res?.data?.user));
                

                } catch (error) {
            console.error("Error fetching profile:", error);
        }
               
        }
        fetchProfile();
    }, [id]);
};

export default useGetProfile;