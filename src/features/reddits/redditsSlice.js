import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const redditsSlice = createSlice({
    name: 'reddits',
    initialState: {
        reddits: [], // comments: [] -- the comments state goes inside of reddits.
        isLoading: false,
        hasError: false,
        searchTerm: '',
        selectedSubreddit: 'Home', // initilization of reddits is now hard-coded. ideally, it is to choose the first subreddit to render.
    },
    reducers: {
        setSelectedSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload.toLowerCase();
            state.searchTerm = '';
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        toggleShowingComments: (state, action) => {
            state.reddits[action.payload].showingComments = !state.reddits[action.payload].showingComments;
        },
        setLocalVote: (state, action) => {
            const {index, vote} = action.payload;
            state.reddits[index].localVote = vote;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadReddits.pending,(state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadReddits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.reddits = action.payload;
            state.searchTerm = '';

        })
        .addCase(loadReddits.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(loadComments.pending, (state, action) => {
            const index = action.meta.arg;
            state.reddits[index].isLoadingComments = true;
            state.reddits[index].loadingCommentshasError = false;
        })
        .addCase(loadComments.fulfilled, (state, action) => {
            const index = action.meta.arg;
            state.reddits[index].isLoadingComments = false;
            state.reddits[index].loadingCommentshasError = false;
            state.reddits[index].comments = action.payload;
        })
        .addCase(loadComments.rejected, (state, action) => {
            const index = action.meta.arg;
            state.reddits[index].isLoadingComments = false;
            state.reddits[index].loadingCommentshasError = true;
        })
    }
});

export const loadReddits = createAsyncThunk(
    'reddits/loadReddits',
    // the asyn below use the state.reddits.selectedSubreddit as para, which retrived from onClick value from subreddit
    // the param expected to be a string, etc 'Home'.
    async (selectedSubreddit) => {
        const response = await fetch(`https://www.reddit.com/r/${selectedSubreddit}.json`);
        const jsonResponse = await response.json();
        const redditsData = jsonResponse.data.children;
        const redditDataArray = redditsData.map(redditData => redditData.data); 
        // add comments state into the each reddit state at this step. since we will use these to call another API fetch to get comments data.
        return redditDataArray.map((redditData, index) => ({
            ...redditData,
            comments: [],
            isLoadingComments: false,
            loadingCommentshasError: false,
            showingComments: false,
            index: index,
            localVote: 0
        }));
    }
);


// loadComments for fetching comments data takes two parameters: url parameter of comments data and the index of reddit clicked.
// the argument of index is the action.payload passed to "toggleShowingComments" and "showOrHideComments" actions. 
export const loadComments = createAsyncThunk(
    'reddits/loadComments',
    async(index, {getState}) => {
        let {showingComments} = getState().reddits.reddits[index];
        if (!showingComments) {
            return [];
        }
        
        let {permalink} = getState().reddits.reddits[index];
        const response = await fetch(`https://www.reddit.com${permalink}.json`);
        const commentsData = await response.json();
        return commentsData[1].data.children.map(commentData => commentData.data);
    }
)

export const onToggleComments = (index) => {
    return async(dispatch) => {
        await dispatch(toggleShowingComments(index));
        dispatch(loadComments(index));
    }
}

export const selectReddits = state => {
    if (!state.reddits.searchTerm) {
        return state.reddits.reddits;
    }
    return state.reddits.reddits.filter(reddit => reddit.title.toLowerCase().includes(state.reddits.searchTerm));
};

export const selectSelectedSubreddit = state => state.reddits.selectedSubreddit;

export const selectSearchTerm = state => state.reddits.searchTerm;

export const isLoadingReddits = state => state.reddits.isLoading;

export default redditsSlice.reducer;

export const {setSelectedSubreddit, setSearchTerm, toggleShowingComments, setLocalVote} = redditsSlice.actions;



