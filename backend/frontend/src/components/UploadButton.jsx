import { useState } from "react";
import { UseMutation } from "../hooks/UseMutation";
import { addImagesAsync } from "../redux/imagesActions"


const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']

export function UploadButton () {
    const {mutate: uploadImage, isLoading: uploading, error: uploadError } = UseMutation({action: addImagesAsync})
    const [error, setError] = useState('')

    const handleUpload = async (e) => {
        const file = e.target.files[0]

        if (!validFileTypes.some(type => type === file.type)) {
            setError('File must be in JPG/PNG format')
            return
        }

        const form = new FormData()
        form.append('image', file)

        await uploadImage(form)
    }


    return (
        <section className="upload__button-section">
            {uploading ? <span>Uploading...</span> : <label htmlFor="imageInput" className="upload-button button">
                <input type="file" id="imageInput" hidden onClick={()=> setError('')} onChange={handleUpload}/>
                <span>Upload</span>
            </label>}
            {error && 
            <span>{error}</span>}
            {uploadError && 
            <span>{uploadError}</span>}
        </section>
    )
}