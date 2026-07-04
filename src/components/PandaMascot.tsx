type PandaMascotProps = {
  message: string;
};

export default function PandaMascot({ message }: PandaMascotProps) {
  return (
    <div className="mascot-card">
      <div className="panda-face" aria-label="Panda Buddy">🐼</div>
      <div>
        <p className="mascot-name">Panda Buddy</p>
        <p className="mascot-message">{message}</p>
      </div>
    </div>
  );
}
