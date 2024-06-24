// React
import React, { useState } from 'react'

// Components
import Overlay from './Overlay';
import ContentForm from './ContentForm';

// Styles
import '../AddButton.css'

function AddContent({handleDataUpdate}) {

    const [isOverlayOpen, setOverlayOpen] = useState(false)
    const handleClick = ()=>{
        setOverlayOpen(!isOverlayOpen)
    }

    return (
        <>
            {isOverlayOpen &&
                <Overlay isOverlayOpen={isOverlayOpen} setOverlayOpen={setOverlayOpen}>
                    <ContentForm setOverlayOpen={setOverlayOpen} handleDataUpdate={handleDataUpdate}/>
                </Overlay>
            }
            
            <div className='add-content' onClick={handleClick}>
                + Add more
            </div>
        </>
    )
}

export default AddContent