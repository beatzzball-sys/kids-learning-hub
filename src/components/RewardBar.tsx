type RewardBarProps = {
  stars: number;
  onReset: () => void;
};

export default function RewardBar({ stars, onReset }: RewardBarProps) {
  return (
    <div className="reward-bar">
      <div className="reward-pill">⭐ Stars: {stars}</div>
      <button className="ghost-button" onClick={onReset}>Reset</button>
    </div>
  );
}
