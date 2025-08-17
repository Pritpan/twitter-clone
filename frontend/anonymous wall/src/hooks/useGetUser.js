
import axios from 'axios';
import { useEffect} from 'react';
import { USER_API } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice.js';

const useGetUser =  (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async ()=>{
        try {
            const res = await axios.get(`${USER_API}/profile/${id}` , { 
                withCredentials: true,
            });
            
                dispatch(getUser(res?.data?.user));
    
                } catch (error) {
            console.error("Error fetching profile:", error);
        }
               
        }
        fetchUser();
    }, [id]);
};

export default useGetUser;