import React from 'react'
import Avatar from 'react-avatar';
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { TWEET_API_END_POINT } from '../utils/constant.js';
import { getRefresh } from '../redux/tweetSlice.js';
import { MdDeleteOutline } from "react-icons/md";
import {timeSince} from '../utils/constant.js';
 
const Tweet = ({tweet}) => {
   const {user} = useSelector(store => store.user);
   const dispatch = useDispatch();

   const likeOrDislikehandeler = async (id) => {
      try {
         const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, {id:user?._id},{
            withCredentials: true,
         });
            dispatch(getRefresh());
                  toast.success(res.data.message);
      } catch (error) {
         toast.error("Failed to like or dislike tweet"); 
         console.error("Error liking or disliking tweet:", error);
         
      }

   }

   const deleteHandler = async (id) => {
      try {
         axios.defaults.withCredentials = true;
         const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`)
         dispatch(getRefresh());
         toast.success(res.data.message);
         console.log('res');
         
      } catch (error) {
         console.error("Error deleting tweet:", error);
         toast.error("Failed to delete tweet");
      }
   }



  return (
    <div className='border-b border-gray-200'>
      <div>
      <div className='flex p-4'>
        <Avatar src= {tweet?.userId?.profilePhoto} size="40" round={true} />
     <div className='ml-2 w-full'>
     <div className='flex items-center'>
        <h1 className='font-bold '>{ tweet?.userId?.name}</h1>
        <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userId?.username} . ${timeSince(tweet?.createdAt)}`}</p>   
     </div>
     <div>
        <p className='text-gray-700 text-sm'>{ tweet?.description}</p>
     </div>
     <div className='flex items-center justify-between my-3'>
        <div className='flex items-center '>
            <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
               < FaRegComment size={'20px'}/>
            </div>
            <p>0</p>
        </div>
        <div className='flex items-center'>
            <div onClick={() => likeOrDislikehandeler(tweet?._id)} className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>
               < CiHeart size={'20px'}/>
            </div>
            <p>{tweet?.like?.length}</p>
        </div>
        <div className='flex items-center'>
            <div className='p-2 hover:bg-blue-200 rounded-full cursor-pointer'>
               <CiBookmark size={'20px'}/>
            </div>
      
        </div>
        {
         user?._id === tweet?.userId && ( <div onClick={()=>deleteHandler(tweet?._id)} className='flex items-center'>
            <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
               <MdDeleteOutline className='opacity-60' size={'20px'}/>
            </div>
        </div>)
        }
       
     </div>
     </div>
     </div>
      </div>
    </div>
  )
}

export default Tweet
