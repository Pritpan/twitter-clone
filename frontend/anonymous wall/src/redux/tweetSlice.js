import {createSlice} from '@reduxjs/toolkit';

const tweetSlice = createSlice({
  name: 'tweet',
  initialState:{
    tweet: null
  },
    reducers: {
        getAllTweet : (state, action) =>{
            state.tweet = action.payload;
        }
    }
});
export const {getAlltweet} = tweetSlice.actions;
export default userSlice.reducer;