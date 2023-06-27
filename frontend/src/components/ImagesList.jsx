import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImagesAsync } from "../redux/imagesActions";
import ImageGallery from 'react-image-gallery';

export function ImagesList() {
    const dispatch = useDispatch()
    const images = useSelector((state)=> state.images)

    function getImagesForGallery() {
        return images.map(url => {
            return {
                original: url
            }
        })
    }

    useEffect(()=> {
        const loadImages = () => {
            dispatch(getImagesAsync())
        }
        loadImages()
    }, [])

    return (
       <section className="images__section container">
            <ImageGallery items={getImagesForGallery()}/>
       </section>
    )
}