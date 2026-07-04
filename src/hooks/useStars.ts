import { useEffect, useState } from 'react';

const STORAGE_KEY = 'kids-learning-hub-stars';

export function useStars() {
  const [stars, setStars] = useState<number>(() => {
    const savedStars = localStorage.getItem(STORAGE_KEY);
    return savedStars ? Number(savedStars) : 0;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(stars));
  }, [stars]);

  const addStar = () => setStars((currentStars) => currentStars + 1);
  const resetStars = () => setStars(0);

  return { stars, addStar, resetStars };
}
