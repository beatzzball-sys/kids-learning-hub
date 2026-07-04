import type { Screen } from '../types';
import PandaMascot from './PandaMascot';
import RewardBar from './RewardBar';

type HomeScreenProps = {
  stars: number;
  onResetStars: () => void;
  onNavigate: (screen: Screen) => void;
};

export default function HomeScreen({
  stars,
  onResetStars,
  onNavigate
}: HomeScreenProps) {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <RewardBar stars={stars} onReset={onResetStars} />

        <div className="hero-content">
          <p className="eyebrow">Ages 4–8</p>
          <h1>Kids Learning Hub</h1>
          <p className="hero-text">
            A bright, friendly learning game where kids learn letters, numbers,
            words, sounds, and earn stars.
          </p>
        </div>

        <PandaMascot message="Hello! Choose a game and let’s learn together today." />

        <div className="game-grid">
          <button className="game-card active" onClick={() => onNavigate('abc')}>
            <span className="game-icon">🔤</span>
            <span className="game-title">ABC Adventure</span>
            <span className="game-description">
              Learn A to Z with words and sound.
            </span>
          </button>

          <button className="game-card active" onClick={() => onNavigate('number')}>
            <span className="game-icon">🔢</span>
            <span className="game-title">Number World</span>
            <span className="game-description">
              Count objects and learn numbers.
            </span>
          </button>

          <button className="game-card active" onClick={() => onNavigate('color')}>
            <span className="game-icon">🎨</span>
            <span className="game-title">Color Match</span>
            <span className="game-description">
              Find colors and earn stars.
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}