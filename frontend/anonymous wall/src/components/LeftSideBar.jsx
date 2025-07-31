import React from 'react'
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';


const LeftSideBar = () => {
  return (
    <div className='w-[20%]'>
      <div>
        <div className=' flex items-center hover:bg-gray-100 w-16 h-16 rounded-full hover:cursor-pointer'>
        <img className= 'ml-5' width = {"26px"} src="https://imgs.search.brave.com/MlKi0bLR47LYhxkNzAvv6TRWJHJ92Zzria5xVySyrNw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb29k/aWJlZS5jb20vd3At/Y29udGVudC91cGxv/YWRzL1R3aXR0ZXIt/WC1Mb2dvLnBuZw" alt="twitter" />
        </div>
        <div className='my- 6'>
          <Link to ="/" className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div> 
              <CiHome size={'24px'}/>
            </div>
            <h1 className='font-bold text lg ml-2'>home</h1>
         </Link>
         <div className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div> 
              < CiHashtag size={'24px'}/>
            </div>
            <h1 className='font-bold text lg ml-2'>Explore</h1>
         </div>
         <div className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div> 
              <IoMdNotificationsOutline size={'24px'}/>
            </div>
            <h1 className='font-bold text lg ml-2'>Notification</h1>
         </div>
         <Link to = "/profile" className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div> 
              <CgProfile  CiHoe size={'24px'}/>
            </div>
            <h1 className='font-bold text lg ml-2'>profile</h1>
         </Link>
         <div className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div> 
              <CiBookmark size={'24px'}/>
            </div>
            <h1 className='font-bold text lg ml-2'>Bookmarks</h1>
         </div>
         <div className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
            <div> 
              <CiLogout size={'24px'}/>
            </div>
            <h1 className='font-bold text lg ml-2'>Logout</h1>
         </div>
         <button className='bg-blue-500 text-white px-4 py-2 rounded-full w-full mt-4 hover:bg-blue-600 font-bold'>
           Post 
          </button>
         
      
    </div>
    </div>
    </div>
  )
}

export default LeftSideBar
