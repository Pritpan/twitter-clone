import React from 'react';
import CreatePost from './CreatePost';
import Tweet from './Tweet';
import { useSelector } from 'react-redux';

const Feed = () => {
  const { tweets } = useSelector((store) => store.tweet);

  return (
    <div className='w-[50%] border border-gray-200 h-screen flex flex-col'>
      {/* Fixed CreatePost Section */}
      <div className='flex-shrink-0'>
        <CreatePost />
      </div>

      {/* Scrollable Tweets Section */}
      <div className='flex-1 overflow-y-auto'>
        {tweets?.map((tweet) => (
          <Tweet key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;