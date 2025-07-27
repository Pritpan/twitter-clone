import React from 'react'
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";

const CreatePost = () => {
  return (
    <div className='w= [100%]'>
        <div>
        <div className='flex items-center justify-evenly border-b border-gray-200'>
        <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'>    
            <h1 classname = ' font-semibold text-grey text-lg'>For you</h1>
        </div>
        <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'>    
            < h1 classname = ' font-semibold bold text-grey text-lg'>Following</h1>
        </div>
      </div>
        </div>
      
      <div className='m-4'>
        <div className='flex items-center p-4'>
            <div>
            <Avatar src= "https://pbs.twimg.com/profile_images/1949442857783246848/_bBzoqVZ_400x400.jpg " size="40" round={true} />

            </div>
            <input type="text" placeholder='What is happening?' className='w-full outline-none border-none text-lg ml-2' />
        </div>
        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
            <div>
                <CiImageOn/>
            </div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-full mt-4 text-right hover:bg-blue-600 font-bold'>
              Post  
              </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
