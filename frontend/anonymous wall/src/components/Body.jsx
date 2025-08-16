import React from 'react'
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import Home from './Home';
import Feed from './Feed';
import Profile  from './Profile';
import Login from './Login';
import ProfileUpdate from './ProfileUpdate';

const Body = () => {
  const appRouter = createBrowserRouter([{
      path : '/',
      element : <Home/>,
      children : [{
          path : '/',
          element : <Feed/>
      },{
          path : 'profile/:id',
          element : <Profile/>
      },{
          path : 'profile/:id/edit',
          element : <ProfileUpdate/>
      }

    ]},
      {
          path : '/login',
          element : <Login/>
      },
      {
          path : '/profile/:id/edit',
          element : <ProfileUpdate/>
      }]
    );

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
