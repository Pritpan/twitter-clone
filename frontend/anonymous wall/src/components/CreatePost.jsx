import React from 'react'
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";
import { useState } from 'react';
import axios from 'axios';
import { useSelector , useDispatch} from 'react-redux';
import { TWEET_API_END_POINT } from '../utils/constant.js';
import toast from 'react-hot-toast';
import { getRefresh , getIsActive } from '../redux/tweetSlice.js';



const CreatePost = () => {
const {isActive} = useSelector(store => store.tweet);
  const {user} = useSelector(store => store.user);
const [description, setDescription] = useState('');
const dispatch = useDispatch();

const {profile} = useSelector(store => store.user);

const submithandeler =  async () => {
try {
const res = await axios.post(`${TWEET_API_END_POINT}/create`, {description, id:user?._id}, {
  headers: {
    'Content-Type': 'application/json' },
  withCredentials: true
});
dispatch(getRefresh());
if(res.data.success) {
  toast.success("Tweet created successfully");
}
} catch (error) {
  toast.error("Failed to create tweet");
  console.error("Error creating tweet:", error);
}
setDescription('');
}


const forYouhandler = () => {
  dispatch(getIsActive(true));}

const followingHandler = () => {
  dispatch(getIsActive(false));}

  return (
    <div className='w= [100%]'>
        <div>
        <div className='flex items-center justify-evenly border-b border-gray-200'>
    <div onClick={forYouhandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>    
            <h1 className = 'font-semibold text-grey text-lg'>For you</h1>
        </div>
        <div onClick= {followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>    
            < h1 className = ' font-semibold bold text-grey text-lg'>Following</h1>
        </div>
      </div>
        </div>
      
      <div className='m-4'>
        <div className='flex items-center '>
            <div>
            <Avatar src= {user?.profilePhoto} size="40" round={true} />

            </div>
            <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder='What is happening?' className='w-full outline-none border-none text-lg ml-2' />
        </div>
        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
            <div>
                <CiImageOn size={25} className='text-gray-500 cursor-pointer hover:text-blue-500' />
            </div>
            <button onClick={submithandeler} className='bg-blue-500 text-white px-4 py-2 rounded-full mt-4 text-right hover:bg-blue-600 font-bold'>
              Post  
              </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
