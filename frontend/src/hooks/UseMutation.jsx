import { useState } from "react"
import { useDispatch } from "react-redux"

export const UseMutation = ({action}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        isLoading: false,
        error: ''
    })

    const fn = async (data) => {
        setState(prev => ({
            ...prev,
            isLoading: true
        }))

        try {
            dispatch(action(data))
            setState({ error: '', isLoading: false})

            // TEMP - ADD TOAST
        } catch (error) {
            setState({ error: error.massage, isLoading: false})
        }
    }

    return {...state, mutate:fn}

}