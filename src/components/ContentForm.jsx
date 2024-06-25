// React
import React, { useEffect, useState } from 'react';

// Styles
import '../AddButton.css';

// Helpers
import { fetchPatch, fetchPost } from '../helpers/apiHelper';

function ContentForm({ setOverlayOpen, handleDataUpdate, filledTitle, filledImg, position }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState('');
    const [title, setTitle] = useState(filledTitle ?? '');

    useEffect(() => {
        if (filledImg) {
            fetchImageAsBase64(filledImg);
        }
    }, [filledImg]);

    const fetchImageAsBase64 = async (imagePath) => {
        try {
            const response = await fetch(imagePath);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(blob);  // Storing the blob instead of base64 string
                setPreviewSrc(reader.result);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error converting image to base64:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            const base64Image = reader.result;
            const existingData = JSON.parse(localStorage.getItem('data')) || [];

            const newItem = {
                position: position ?? existingData.length,
                type: title.trim().replace(/\s+/g, '-'),
                title,
                src: base64Image,
            };
            

            if(filledTitle || filledImg){
                // Call API to save data
                fetchPatch(`/api/data/${position}`,newItem)
                    .then((res)=>{
                        handleDataUpdate(res)
                        // Reset form fields
                        setTitle('');
                        setSelectedFile(null);
                        setPreviewSrc('');
                        setOverlayOpen(false);
                    })
            } else {

                const updatedData = [...existingData, newItem];

                // Call API to save data
                fetchPost('/api/data', updatedData)
                    .then(() => {
                        handleDataUpdate(updatedData);
                        // Reset form fields
                        setTitle('');
                        setSelectedFile(null);
                        setPreviewSrc('');
                        setOverlayOpen(false);
                    })
                    .catch((error) => {
                        console.error('Error adding item:', error);
                    });
            }
            
        };
    };

    return (
        <div className='overlay-form'>
            <div>
                <label htmlFor="title">Title: </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div style={{marginLeft: '62px'}}>
                <label htmlFor="image">Image: </label>
                <input type="file" id="image" onChange={handleFileChange} />
            </div>

            {previewSrc && (
                <div>
                    <h2>Preview:</h2>
                    <img src={previewSrc} alt="Preview" style={{ width: '50%' }} />
                </div>
            )}

            <button onClick={handleSubmit} className='add-item'>{filledTitle ? 'Update' : 'Add'} Item</button>
        </div>
    );
}

export default ContentForm;
