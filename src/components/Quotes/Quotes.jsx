import { useState } from "react";
import Button from "../Button/Button";
import "./Quotes.css";

const Quotes = () => {
  const quotes = [
    "Don’t watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
    "Start where you are. Use what you have. Do what you can.",
    "Productivity is being able to do things that you were never able to do before.",
    "The secret of getting ahead is getting started.",
  ];

  const randomIndex = () => Math.floor(Math.random() * quotes.length);

  const [quote, setQuote] = useState(randomIndex);

  const handleNextQuote = () => {
    let newIndex = randomIndex();
    while (newIndex === quote) {
      newIndex = randomIndex();
    }

    setQuote(newIndex);
  };

  return (
    <div className="quoteSection">
      <blockquote className="quotes">{quotes[quote]}</blockquote>

      <button className="quoteBtn" onClick={handleNextQuote}>
        Next Quote
      </button>
    </div>
  );
};

export default Quotes;
