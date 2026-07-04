import { useState } from 'react';
import { speak } from '../utils/speech';
import PandaMascot from './PandaMascot';
import RewardBar from './RewardBar';

type NumberWorldProps = {
  stars: number;
  onAddStar: () => void;
  onResetStars: () => void;
  onBackHome: () => void;
};

const numberData = [
  { number: 1, objectName: 'apple', emoji: '🍎', options: [1, 2, 3] },
  { number: 2, objectName: 'stars', emoji: '⭐', options: [1, 2, 3] },
  { number: 3, objectName: 'balls', emoji: '⚽', options: [2, 3, 4] },
  { number: 4, objectName: 'ducks', emoji: '🦆', options: [3, 4, 5] },
  { number: 5, objectName: 'flowers', emoji: '🌸', options: [4, 5, 6] },
  { number: 6, objectName: 'cars', emoji: '🚗', options: [5, 6, 7] },
  { number: 7, objectName: 'butterflies', emoji: '🦋', options: [6, 7, 8] },
  { number: 8, objectName: 'fish', emoji: '🐟', options: [7, 8, 9] },
  { number: 9, objectName: 'bananas', emoji: '🍌', options: [8, 9, 10] },
  { number: 10, objectName: 'balloons', emoji: '🎈', options: [8, 9, 10] }
];

export default function NumberWorld({
  stars,
  onAddStar,
  onResetStars,
  onBackHome
}: NumberWorldProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('Count the objects and tap the correct number.');
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const currentQuestion = numberData[currentIndex];

  const objects = Array.from(
    { length: currentQuestion.number },
    (_, index) => `${currentQuestion.emoji}-${index}`
  );

  const readQuestion = () => {
    speak(`How many ${currentQuestion.objectName} can you see?`);
    setFeedback(`How many ${currentQuestion.objectName} can you see?`);
  };

  const checkAnswer = (answer: number) => {
    if (answer === currentQuestion.number) {
      if (!answeredCorrectly) {
        onAddStar();
      }

      setAnsweredCorrectly(true);
      setFeedback(`Great job! The answer is ${currentQuestion.number}.`);
      speak(`Great job! The answer is ${currentQuestion.number}.`);
      return;
    }

    setFeedback('Try again. Count slowly.');
    speak('Try again. Count slowly.');
  };

  const nextQuestion = () => {
    setCurrentIndex((currentIndex + 1) % numberData.length);
    setAnsweredCorrectly(false);
    setFeedback('Count the objects and tap the correct number.');
  };

  return (
    <main className="page-shell">
      <section className="game-screen">
        <div className="top-row">
          <button className="ghost-button" onClick={onBackHome}>
            Home
          </button>

          <RewardBar stars={stars} onReset={onResetStars} />
        </div>

        <PandaMascot message={feedback} />

        <div className="letter-card">
          <p className="eyebrow">Number World</p>

          <h2 className="big-letter">{currentQuestion.number}</h2>

          <p className="word-text">
            Count the {currentQuestion.objectName}
          </p>

          <div
            style={{
              fontSize: '64px',
              lineHeight: '1.5',
              margin: '24px 0'
            }}
          >
            {objects.map((item) => (
              <span
                key={item}
                style={{
                  margin: '6px',
                  display: 'inline-block'
                }}
              >
                {currentQuestion.emoji}
              </span>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                className="primary-button"
                onClick={() => checkAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="action-row">
          <button className="secondary-button" onClick={readQuestion}>
            Read Question
          </button>

          <button className="primary-button" onClick={nextQuestion}>
            Next
          </button>
        </div>
      </section>
    </main>
  );
}