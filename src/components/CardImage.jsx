// React
import React, { useState } from 'react'

// Components
import Overlay from './Overlay';

// Styles
import '../Card.css'

function CardImage({card}) {

  const [isOverlayOpen, setOverlayOpen] = useState(false)
  const handleImgClick = ()=>{
    setOverlayOpen(!isOverlayOpen)
  }

  return (
    <>
        { isOverlayOpen &&
            <Overlay isOverlayOpen={isOverlayOpen} setOverlayOpen={setOverlayOpen}>
                <Image card={card} height={500} width={500} />
            </Overlay>
        }
        <Image card={card} handleImgClick={handleImgClick}/>
    </>
  )
}

// Image Component
const Image = ({card,handleImgClick, height, width})=>{
    const [loading, setLoading] = useState(true);
    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <>
            {loading && <img src="images/spinner.gif" alt="Loading..." className="spinner" />}
            <img
                src={card.src}
                alt={card.title}
                onLoad={handleImageLoad}
                style={{ display: loading ? 'none' : 'block' }}
                width={width ?? '300'} 
                height={height ?? '300'} 
                className='card-img'
                onClick={handleImgClick}
            />
        </>
    )
}

export default CardImage