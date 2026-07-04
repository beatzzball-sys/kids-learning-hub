import { useState } from 'react';
import { abcData } from '../data/abcData';
import { speak } from '../utils/speech';
import PandaMascot from './PandaMascot';
import RewardBar from './RewardBar';

type ABCAdventureProps = {
  stars: number;
  onAddStar: () => void;
  onResetStars: () => void;
  onBackHome: () => void;
};

export default function ABCAdventure({ stars, onAddStar, onResetStars, onBackHome }: ABCAdventureProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('Tap the big card to hear the sound.');

  const currentCard = abcData[currentIndex];
  const progress = Math.round(((currentIndex + 1) / abcData.length) * 100);

  const playLetterSound = () => {
    speak(`${currentCard.letter}. ${currentCard.sentence}.`);
    setFeedback(`${currentCard.sentence}! Great listening!`);
  };

  const handleCorrectTap = () => {
    onAddStar();
    speak(`Great job! ${currentCard.sentence}. You earned one star.`);
    setFeedback('Great job! You earned one star. ⭐');
  };

  const goNext = () => {
    setCurrentIndex((index) => (index + 1) % abcData.length);
    setFeedback('Tap the big card to hear the sound.');
  };

  const goPrevious = () => {
    setCurrentIndex((index) => (index === 0 ? abcData.length - 1 : index - 1));
    setFeedback('Tap the big card to hear the sound.');
  };

  return (
    <main className="page-shell">
      <section className="game-screen">
        <div className="top-row">
          <button className="ghost-button" onClick={onBackHome}>← Home</button>
          <RewardBar stars={stars} onReset={onResetStars} />
        </div>

        <div className="progress-wrap" aria-label="ABC progress">
          <div className="progress-label">Letter {currentIndex + 1} of {abcData.length}</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <PandaMascot message={feedback} />

        <button className="letter-card" onClick={playLetterSound}>
          <span className="letter">{currentCard.letter}</span>
          <span className="emoji">{currentCard.emoji}</span>
          <span className="word">{currentCard.word}</span>
        </button>

        <div className="action-row">
          <button className="secondary-button" onClick={goPrevious}>Previous</button>
          <button className="primary-button" onClick={handleCorrectTap}>I learned it ⭐</button>
          <button className="secondary-button" onClick={goNext}>Next</button>
        </div>

        <button className="sound-button" onClick={playLetterSound}>🔊 Hear Again</button>
      </section>
    </main>
  );
}
