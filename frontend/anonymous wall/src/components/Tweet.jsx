import React from 'react'
import Avatar from 'react-avatar';
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
const Tweet = () => {
  return (
    <div className='border-b border-gray-200'>
      <div>
      <div className='flex p-4'>
        <Avatar src= "https://pbs.twimg.com/profile_images/1949442857783246848/_bBzoqVZ_400x400.jpg " size="40" round={true} />
     <div className='ml-2'>
     <div className='flex items-center'>
        <h1 className='font-bold '>User Name</h1>
        <p className='text-gray-500 text-sm ml-1'>@username</p>   
     </div>
     <div>
        <p className='text-gray-700 text-sm'>This is a sample tweet content. It can be a bit longer to demonstrate how it looks in the feed.</p>
     </div>
     <div className='flex items-center justify-between my-3'>
        <div className='flex items-center'>
            <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
               < FaRegComment size={'20px'}/>
            </div>
            <p>0</p>
        </div>
        <div className='flex items-center'>
            <div className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>
               < CiHeart size={'20px'}/>
            </div>
            <p>0</p>
        </div>
        <div className='flex items-center'>
            <div className='p-2 hover:bg-blue-200 rounded-full cursor-pointer'>
               <CiBookmark size={'20px'}/>
            </div>
            <p>0</p>
        </div>
     </div>
     </div>
     </div>
      </div>
    </div>
  )
}

export default Tweet
