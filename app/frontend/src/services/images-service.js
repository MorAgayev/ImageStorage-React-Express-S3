import { axiosClient } from './axios'

const URL = '/images'

export const ImagesService = {
    getImages,
    addImage,
    deleteImage,
}

async function getImages() {
    const {data} = await axiosClient({url: URL, method:'GET'})
    return data
}

async function addImage(data) {
    console.log('data', data);
    return await axiosClient({url: URL, method:'POST', data})
}

function deleteImage() {
    return ''
}