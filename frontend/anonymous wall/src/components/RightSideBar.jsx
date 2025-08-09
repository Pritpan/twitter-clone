import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';


const RightSideBar = ({ otherUsers }) => {
  return (
    <div className='w-[25%]'>
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none py-2 px-4 my-4'>
        <CiSearch size={'24px'} />
        <input type="text" placeholder='Search' className='bg-transparent outline-none px-2' />
      </div>
      <div className='p-4 rounded-2xl bg-gray-200 my-4'>
        <h1 className='font-bold text-lg'>Who to follow</h1>
        {otherUsers?.map((user) => (
          <div key={user?._id} className='flex items-center justify-between my-3'>
            <div className='flex'>
              <div>
                <Avatar
                  src="https://pbs.twimg.com/profile_images/1949442857783246848/_bBzoqVZ_400x400.jpg"
                  size="40"
                  round={true}
                />
              </div>
              <div className='ml-2'>
                <h1 className='font-bold'>{user?.name}</h1>
                <p className='text-sm'>@{user?.username}</p>
              </div>
            </div>
            <div>
            <Link to ={`profile/${user?._id}`}> <button className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 font-bold'>
                Profile
              </button>
              </Link> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;