import { useEffect, useState } from "react";
import "./App.css";
import data from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > people.length - 1) {
      setIndex(0);
    }
  }, [index, people]);
  useEffect(() => {
    const slider = setInterval(() => {
      setIndex(index + 1);
    }, 4000);

    return () => clearInterval(slider);
  }, [index]);
  return (
    <>
      <div className="section">
        <div className="title">
          <h2>
            <span>/</span> Reviews
          </h2>
        </div>
        <div className="section-center">
          {people.map((person, personIndex) => {
            const { image, id, name, title, quote } = person;
            let position = "nextSlide";
            if (personIndex === index) {
              position = "activeSlide";
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === people.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <article className={position} key={id}>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="text"> {quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            );
          })}

          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>

          <button className="next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
