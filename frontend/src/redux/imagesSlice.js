import { createSlice } from "@reduxjs/toolkit";
import { getImagesAsync, addImagesAsync, deleteImagesAsync } from "./imagesActions";

const imagesSlice = createSlice({
    name: 'images',
    initialState: [],
    extraReducers: {
        [getImagesAsync.fulfilled]: (state, action) => {
            return action.payload.images
        },
        [addImagesAsync.fulfilled]: (state, action) => {
            state.push(action.payload.image)
        },
        [deleteImagesAsync.fulfilled]: (state, action) => {
            return action.payload.images
        }
    }
})

export default imagesSlice.reducer