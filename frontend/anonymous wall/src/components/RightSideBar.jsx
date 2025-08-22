import React from 'react';
import { CiSearch } from "react-icons/ci";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const RightSideBar = ({ otherUsers }) => {
  return (
    <div className='w-[25%] h-screen flex flex-col'>
      {/* Search Section */}
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none py-2 px-4 my-4'>
        <CiSearch size={'24px'} />
        <input type="text" placeholder='Search' className='bg-transparent outline-none px-2' />
      </div>

      {/* Who to Follow Section */}
      <div className='p-4 rounded-2xl bg-gray-200'>
        <h1 className='font-bold text-lg'>Who to follow</h1>
      </div>

      {/* Scrollable Profile Section */}
      <div className='flex-1 overflow-y-auto p-4'>
        {otherUsers?.map((user) => (
          <div
            key={user?._id}
            className='flex items-center justify-between my-3'
          >
            <div className='flex items-center'>
              <Avatar
                src={user?.profilePhoto}
                size="40"
                round={true}
              />
              <div className='ml-2'>
                <h1
                  className='font-bold truncate max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap'
                  title={user?.name} // Tooltip to show the full name on hover
                >
                  {user?.name}
                </h1>
                <p
                  className='text-sm truncate max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap'
                  title={`@${user?.username}`} // Tooltip to show the full username on hover
                >
                  @{user?.username}
                </p>
              </div>
            </div>
            <div>
              <Link to={`profile/${user?._id}`}>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 font-bold'>
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