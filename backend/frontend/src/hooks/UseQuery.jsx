import { useEffect } from "react"
import { useState } from "react"
import { axiosClient } from "../services/axios"


export function UseQuery({url}) {
    const [state, setState] = useState({
        data: null,
        isLoading: false,
        error: ''
    })

    useEffect(()=> {
        const fetch = async () => {
            try {
                const { data } = axiosClient.get(url)
                setState({data, isLoading: false, error: ''})
            } catch (error) {
                setState({data: null, isLoading: false, error: error.message})
            }
        }
        fetch()
    }, [url])
    
    return state
}