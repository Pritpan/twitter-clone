import React from 'react'
import { useState } from 'react'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const loginHandler = () => {
    setIsLogin(!isLogin); }  

  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
        <img className= 'ml-5' width = {"300px"} src="https://imgs.search.brave.com/MlKi0bLR47LYhxkNzAvv6TRWJHJ92Zzria5xVySyrNw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb29k/aWJlZS5jb20vd3At/Y29udGVudC91cGxv/YWRzL1R3aXR0ZXIt/WC1Mb2dvLnBuZw" alt="twitter" />
        </div>

        <div>
          <div className='my-6'>
            <h1 className='text-6xl font-bold'>
              Happening Now
            </h1>
          </div>

          <h1 className='text-2xl font-bold mb-2 mt-4'>
            {isLogin ? "Login" : "Create Account"}
          </h1>
          <form className='flex flex-col w-[60%]'>
            {
              !isLogin && (<> 
               <input type="text" placeholder='Name' className='outline-blue-500 border border-grey-800 px-3 py-2 rounded-full my-1 font-semibold' />
               <input type="text" placeholder='USername' className='outline-blue-500 border border-grey-800 px-3 py-2 rounded-full my-1 font-semibold'/>
              </>)
            }
           
            <input type="text" placeholder='Email'className='outline-blue-500 border border-grey-800 px-3 py-2 rounded-full my-1 font-semibold'/>
            <input type="text" placeholder='Password'className='outline-blue-500 border border-grey-800 px-3 py-2 rounded-full my-1 font-semibold'/>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-full font-semibold my-2 hover:bg-blue-600'>
            {isLogin ? "Login" : "Create account"}
            </button>
            <h1>{isLogin? "Do not have an account?": "Already have an account?"} <span onClick={loginHandler} className='text-blue-600 cursor-pointer'>{isLogin ? "Register" : "Login" }</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
