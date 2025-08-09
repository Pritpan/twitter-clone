import React from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useOtherUsers from '../hooks/useOtherUsers';

const Home = () => {

  const {user, otherUsers} = useSelector(store => store.user);
  useOtherUsers(user?._id);

  return (
    <div className = ' flex justify-between w-[80%] mx-auto'>
      <LeftSideBar />
      <Outlet/>
      <RightSideBar otherUsers = {otherUsers} />
    </div>
  )
}

export default Home


