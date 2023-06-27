import axios from 'axios'

//temp
const baseURL = 'http://localhost:3000/'
// import.meta.env.REACT_APP_API_URL
const USER_ID = 123

export const axiosClient = axios.create({
    baseURL,
    headers: {
        'x-user-id': USER_ID
    }
})

