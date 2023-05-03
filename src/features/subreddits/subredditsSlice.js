import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubreddits = createAsyncThunk(
    'subreddits/loadSubreddits',
    async () => {
        const response = await fetch('https://www.reddit.com/subreddits.json');
        const jsonResponse = await response.json();
        const subredditsData = jsonResponse.data.children;
        return subredditsData.map(subredditData => subredditData.data);
    }
);

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits:[],
        isLoading: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadSubreddits.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadSubreddits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.subreddits = action.payload;
        })
        .addCase(loadSubreddits.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
    }
});

export const selectSubreddits = state => state.subreddits.subreddits;

export const isLoadingSubreddits = state => state.subreddits.isLoading;

// upon initialization, get the first subreddit.
export const selectInitialSubreddit = async() => {
    await loadSubreddits();
    const getInitialSubreddit = state => state.subreddits.subreddits[0].display_name;
    return getInitialSubreddit;
}



export default subredditsSlice.reducer;




