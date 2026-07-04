export type NumberQuestion = {
  number: number;
  objectName: string;
  emoji: string;
  options: number[];
};

const items = [
  { objectName: 'apples', emoji: '🍎' },
  { objectName: 'stars', emoji: '⭐' },
  { objectName: 'balls', emoji: '⚽' },
  { objectName: 'ducks', emoji: '🦆' },
  { objectName: 'flowers', emoji: '🌸' },
  { objectName: 'cars', emoji: '🚗' },
  { objectName: 'butterflies', emoji: '🦋' },
  { objectName: 'fish', emoji: '🐟' },
  { objectName: 'bananas', emoji: '🍌' },
  { objectName: 'balloons', emoji: '🎈' }
];

const makeOptions = (answer: number): number[] => {
  if (answer === 1) return [1, 2, 3];
  if (answer === 10) return [8, 9, 10];

  return [answer - 1, answer, answer + 1];
};

export const numberData: NumberQuestion[] = items.map((item, index) => {
  const number = index + 1;

  return {
    number,
    objectName: item.objectName,
    emoji: item.emoji,
    options: makeOptions(number)
  };
});