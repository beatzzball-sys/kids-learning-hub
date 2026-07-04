import { useState } from 'react';
import ABCAdventure from './components/ABCAdventure';
import ColorMatch from './components/ColorMatch';
import HomeScreen from './components/HomeScreen';
import MusicButton from './components/MusicButton';
import NumberWorld from './components/NumberWorld';
import { useStars } from './hooks/useStars';
import type { Screen } from './types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const { stars, addStar, resetStars } = useStars();

  let page = (
    <HomeScreen
      stars={stars}
      onResetStars={resetStars}
      onNavigate={setScreen}
    />
  );

  if (screen === 'abc') {
    page = (
      <ABCAdventure
        stars={stars}
        onAddStar={addStar}
        onResetStars={resetStars}
        onBackHome={() => setScreen('home')}
      />
    );
  }

  if (screen === 'number') {
    page = (
      <NumberWorld
        stars={stars}
        onAddStar={addStar}
        onResetStars={resetStars}
        onBackHome={() => setScreen('home')}
      />
    );
  }

  if (screen === 'color') {
    page = (
      <ColorMatch
        stars={stars}
        onAddStar={addStar}
        onResetStars={resetStars}
        onBackHome={() => setScreen('home')}
      />
    );
  }

  return (
    <>
      <MusicButton />
      {page}
    </>
  );
}