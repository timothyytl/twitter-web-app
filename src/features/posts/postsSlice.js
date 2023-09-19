import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

const BASE_URL = 'http://localhost:3000'

// Async thunk for fetching a user's posts
export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`)
        return response.json()
    }
)

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent) => {
        const token = localStorage.getItem("authToken")
        const decode = jwtDecode(token)
        const userId = decode.id

        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId,
        }

        const res = await axios.post(`${BASE_URL}/posts`, data)
        return res.data
    }
)

// Slice
const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = false
        }),
            builder.addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts]
            })
    },
})



export default postsSlice.reducer;












