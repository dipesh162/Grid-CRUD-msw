// React
import React, { useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

// Components
import CardImage from './CardImage';

// Styles
import '../Card.css'
import Overlay from './Overlay';
import ContentForm from './ContentForm';

const Card = ({ card, index, moveCard, handleEditItem, handleDeleteItem, handleDataUpdate }) => {

  const [isOverlayOpen, setOverlayOpen] = useState(false)

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e) => {
    const draggedIndex = e.dataTransfer.getData('text');
    moveCard(draggedIndex, index);
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  return (
    <div
      className="card"
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
        {isOverlayOpen &&
            <Overlay isOverlayOpen={isOverlayOpen} setOverlayOpen={setOverlayOpen}>
                <ContentForm 
                  setOverlayOpen={setOverlayOpen} 
                  handleDataUpdate={handleDataUpdate} 
                  filledTitle={card.title} 
                  filledImg={card.src} 
                  position={card.position} 
                  handleEditItem={handleEditItem}
                />
            </Overlay>
        }
      <div className='icons-container'>
        <h3 className='card-heading'>{card.title}</h3>
        <div className='icons'>
            <MdModeEdit size={18} color="black" onClick={()=>{
              setOverlayOpen(!isOverlayOpen)
            }}/>
            <MdDelete size={18} onClick={()=>handleDeleteItem(card)}/>
        </div>
      </div>

      <CardImage card={card} />
    </div>
  );
};

export default Card;





