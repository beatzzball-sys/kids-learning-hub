import { useState } from 'react';
import { speak } from '../utils/speech';
import PandaMascot from './PandaMascot';
import RewardBar from './RewardBar';

type ColorMatchProps = {
  stars: number;
  onAddStar: () => void;
  onResetStars: () => void;
  onBackHome: () => void;
};

const colorData = [
  {
    colorName: 'Red',
    emoji: '🎈',
    objectName: 'balloon',
    options: ['Red', 'Blue', 'Green']
  },
  {
    colorName: 'Blue',
    emoji: '🚙',
    objectName: 'car',
    options: ['Yellow', 'Blue', 'Pink']
  },
  {
    colorName: 'Green',
    emoji: '🐸',
    objectName: 'frog',
    options: ['Green', 'Red', 'Purple']
  },
  {
    colorName: 'Yellow',
    emoji: '⭐',
    objectName: 'star',
    options: ['Blue', 'Yellow', 'Orange']
  },
  {
    colorName: 'Orange',
    emoji: '🍊',
    objectName: 'orange',
    options: ['Orange', 'Green', 'Red']
  }
];

export default function ColorMatch({
  stars,
  onAddStar,
  onResetStars,
  onBackHome
}: ColorMatchProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('Look carefully and choose the correct color.');
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const currentQuestion = colorData[currentIndex];

  const readQuestion = () => {
    speak(`What color is this ${currentQuestion.objectName}?`);
    setFeedback(`What color is this ${currentQuestion.objectName}?`);
  };

  const checkAnswer = (selectedColor: string) => {
    if (selectedColor === currentQuestion.colorName) {
      if (!answeredCorrectly) {
        onAddStar();
      }

      setAnsweredCorrectly(true);
      setFeedback(`Amazing! This is ${currentQuestion.colorName}.`);
      speak(`Amazing! This is ${currentQuestion.colorName}. You earned one star.`);
      return;
    }

    setFeedback('Try again. Look carefully.');
    speak('Try again. Look carefully.');
  };

  const nextQuestion = () => {
    setCurrentIndex((currentIndex + 1) % colorData.length);
    setAnsweredCorrectly(false);
    setFeedback('Look carefully and choose the correct color.');
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
          <p className="eyebrow">Color Match</p>

          <h2 className="big-letter">{currentQuestion.emoji}</h2>

          <p className="word-text">
            What color is this {currentQuestion.objectName}?
          </p>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '24px'
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