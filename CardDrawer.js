import React, { useState } from 'react';

const CardDisplay = ({ card }) => {
  return (
    <div className="card">
      <img src={card.image} alt={card.code} />
    </div>
  );
};

const App = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCard = async () => {
    if (!deckId) return;
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();
    if (data.success) {
      setCards([...cards, ...data.cards]);
    } else {
      alert("Error: no cards remaining!");
    }
  };

  const shuffleDeck = async () => {
    if (!deckId) return;
    setIsDrawing(true);
    setCards([]);
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    const data = await response.json();
    if (data.success) {
      setIsDrawing(false);
    } else {
      alert("Error: failed to shuffle the deck!");
      setIsDrawing(false);
    }
  };

  const toggleDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
    } else {
      setIsDrawing(true);
      drawCard();
    }
  };

  const buttonText = isDrawing ? "Stop Drawing" : "Start Drawing";

  return (
    <div className="app">
      <h1>Card Drawer</h1>
      <div className="controls">
        <button onClick={toggleDrawing}>{buttonText}</button>
        <button onClick={shuffleDeck} disabled={isDrawing}>Shuffle Deck</button>
      </div>
      <div className="card-display">
        {cards.map((card, index) => (
          <CardDisplay key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default App;
