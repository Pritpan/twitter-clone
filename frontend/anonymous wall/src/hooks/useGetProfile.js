import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { USER_API } from "../utils/constant.js";
import { getProfile } from "../redux/userSlice.js";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = id 
          ? `${USER_API}/profile/${id}`   // visiting someone else’s profile
          : `${USER_API}/profile`;        // own profile (from cookie/session)

        const res = await axios.get(url, { withCredentials: true });
        dispatch(getProfile(res.data.user));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id, dispatch]);
};

export default useGetProfile;
