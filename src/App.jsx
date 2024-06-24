// React
import { useEffect, useState, useRef } from 'react'

// Components
import Card from './components/Card'
import AddContent from './components/AddContent';

// Styles
import './App.css'

// Helpers
import { fetchDelete, fetchGet, fetchPatch, fetchPost } from './helpers/apiHelper';


const CardList = () => {
  const [cards, setCards] = useState([]);
  const [cardMoved, setCardMoved] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(Date().now);
  const [timeSinceLastSave, setTimeSinceLastSave] = useState(null);
  const latestCardsRef = useRef(cards);
  let saveDataScheduler = null;


  useEffect(()=>{
      fetchGet('/api/data')
        .then((res) => {
          setCards(res);
          latestCardsRef.current = res;
        })
        .catch((error) => console.error('Error fetching data:', error));
  },[])
  

  const handleDataUpdate = (data)=>{
    setCards(data)
    setCardMoved(true)
    setUpdated(prev=> !prev)
  }


  // Update the latestCardsRef whenever cards changes
  useEffect(() => {
    latestCardsRef.current = cards;
  }, [cards]);

  // Effect to update timeSinceLastSave every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSaved) {
        const totalSeconds = Math.floor((Date.now() - lastSaved) / 1000)
        const minutes = Math.floor(totalSeconds/60)
        const seconds = totalSeconds%60;
        setTimeSinceLastSave(`${minutes>0 ? `${minutes} :` : ''} ${seconds} seconds`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lastSaved]);

  useEffect(() => {
    if(cardMoved){

      if (saveDataScheduler) {
        clearTimeout(saveDataScheduler);
      }
      
      saveDataScheduler = setTimeout(() => {
        const currentCards = latestCardsRef.current;
        saveData(currentCards)
        saveData(cards);
      }, 5000);
    }

    return () => {
      clearTimeout(saveDataScheduler);
    };
  }, [updated]);

  const saveData = (data) => {
    setIsSaving(true);
    fetchPost('/api/data', data)
      .then(() => {
        setLastSaved(Date.now());
        lastSavedCards.current = data;
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      })
      .finally(()=>{
        setTimeout(() => {
          setIsSaving(false);
        }, 500);
      })
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const updatedCards = [...cards];
    [updatedCards[dragIndex], updatedCards[hoverIndex]] = [updatedCards[hoverIndex], updatedCards[dragIndex]];
    setCards(updatedCards);
    setCardMoved(true)
    setUpdated(prev=> !prev)
  };

  const handleDeleteItem = (card)=>{
      fetchDelete(`/api/data/${card.position}`)
      .then((res)=>{
        console.log(res)
        handleDataUpdate(res)
      })
  }

  return (
    <>
      { timeSinceLastSave &&
        <b style={{position:'fixed', right: 10, top: 10}}>Last saved {timeSinceLastSave} ago</b>
      }

      { isSaving &&
        <div style={{position:'fixed', left: 10, top: 10}} className="spinner">
          <img src="images/spinner.gif" alt="Loading..." className="spinner" />
        </div>
      }

      <div className="card-list">
        {cards.map((card, index) => (
          <Card
            key={card.type}
            index={index}
            card={card}
            moveCard={moveCard}
            handleDeleteItem={handleDeleteItem}
            handleDataUpdate={handleDataUpdate}
          />
        ))}
        <AddContent handleDataUpdate={handleDataUpdate}/>
      </div>
    </>
  );
};

export default CardList;
