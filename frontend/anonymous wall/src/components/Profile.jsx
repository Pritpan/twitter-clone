import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';  
import Avatar from 'react-avatar';
import { useSelector , useDispatch } from 'react-redux';
import axios from 'axios';
import { TWEET_API_END_POINT, USER_API_END_POINT } from '../utils/constant.js';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice.js';
import toast from 'react-hot-toast';
import useGetUser from '../hooks/useGetUser';
import useGetProfile from './../hooks/useGetProfile';


const Profile = () => {
  const {user, profile} = useSelector(store => store.user);
  const {id} = useParams();
  const dispatch = useDispatch();
  
  useGetProfile(id);

const followAndUnfollowHandler = async () => {
    if(user.following.includes(id)){
      try {
        const res = await axios.put(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id}, {
          withCredentials: true,
        });
        
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success("Unfollowed successfully");
        
      } catch (error) {
        toast.error("Failed to unfollow user");
        console.error("Error unfollowing user:", error);
      }
}else{
  try {
    const res = await axios.put(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id}, {
      withCredentials: true,
    });
  
    dispatch(followingUpdate(id));
    dispatch(getRefresh());
    toast.success("Unfollowed successfully");
    
  } catch (error) {
    toast.error("Failed to follow user");
    console.error("Error unfollowing user:", error);
  }
}
}


  return (

    <div className='w-[50%] border-l border-r border-gray-200 '>
      <div>
        <div className='flex items-center py-2'>
          <Link to = "/"  className='  cursor-pointer hover:bg-gray-100 p-2 rounded-full'>
            <IoMdArrowBack size={24} />
          </Link>
          <div className='ml-6'>
            <h1 className='text-xl font-bold'>{profile?.name}</h1>
            <p className='text-gray-500 text-sm'>Post 10</p>
          </div>
        </div>
        <img src = {profile?.bannerPhoto} alt="Profile Banner" />
      <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
      <Avatar src= {profile?.profilePhoto} size="120" round={true} />
      </div>
      <div className='text-right m-4'>
        {
          profile?._id === user?._id ?
           (<Link to = {`/profile/${profile?.id}/edit`}><button className='px-4 py-2 bg-white-200 rounded-full hover:bg-gray-300 font-bold border'>Edit Profile</button></Link>) :
          (<button onClick={followAndUnfollowHandler} className='px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 font-bold'>{user?.following.includes(profile?._id) ? "Unfollow" : "Follow"}</button>)

        }
      </div>
      <div className='m-4' >
        <h1 className='text-xl font-bold'>{profile?.name}</h1>
        <p>{`@${profile?.username}`}</p>
      </div>
      <div className='m-4 text-sm'>
        <p>
        {profile?.bio || "No bio available"}
        </p>
      </div>
      </div>
    </div>
  )
}

export default Profile
