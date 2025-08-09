import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';  
import Avatar from 'react-avatar';
import useGetProfile from '../hooks/useGetProfile';
import { useSelector } from 'react-redux';



const Profile = () => {
  const {user, profile} = useSelector(store => store.user);
  const {id} = useParams();

  useGetProfile(id);

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
        <img src = "https://pbs.twimg.com/profile_banners/1800580536609497088/1718127804/1500x500" alt="Profile Banner" />
      <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
      <Avatar src= "https://pbs.twimg.com/profile_images/1949442857783246848/_bBzoqVZ_400x400.jpg " size="120" round={true} />
      </div>
      <div className='text-right m-4'>
        <button className='px-4 py-2 bg-white-200 rounded-full hover:bg-gray-300 font-bold border'>Edit Profile</button>
      </div>
      <div className='m-4' >
        <h1 className='text-xl font-bold'>{profile?.name}</h1>
        <p>{`@${profile?.username}`}</p>
      </div>
      <div className='m-4 text-sm'>
        <p>
        wannabe computer Engineer. 
        wannabe game developer.
        wannabe writer.
        don't know for sure.
        stay around to found out.
        </p>
      </div>
      </div>
    </div>
  )
}

export default Profile
