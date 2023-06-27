import { createAsyncThunk } from "@reduxjs/toolkit";
import { ImagesService } from '../services/images-service';

export const getImagesAsync = createAsyncThunk('images/getImagesAsync',
    async () => {
        const images = await ImagesService.getImages()
        
        return { images }
    })

export const addImagesAsync = createAsyncThunk('images/addImageAsync',
    async (payload) => {
        const {data} = await ImagesService.addImage(payload)
        return { image: data }
        
})

export const deleteImagesAsync = createAsyncThunk('images/deleteImageAsync', 
    async (payload) => {
        const images = await ImagesService.deleteImage(payload.id)

        return { images }
    })
