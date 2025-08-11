import {createSlice} from '@reduxjs/toolkit';

const tweetSlice = createSlice({
  name: 'tweets',
  initialState:{
      tweets: null,
      refresh: false,
      isActive: true
  },
    reducers: {
        getAllTweet : (state, action) =>{
            state.tweets = action.payload;
        },
        getRefresh: (state) => {
          state.refresh = !state.refresh;
        },
        getIsActive: (state, action) => {
          state.isActive = action.payload;
        }
}});
export const {getAllTweet , getRefresh, getIsActive} = tweetSlice.actions;
export default tweetSlice.reducer;