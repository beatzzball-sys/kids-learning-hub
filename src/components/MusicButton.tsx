import { useEffect, useRef, useState } from 'react';

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const playNote = (frequency: number) => {
    const audioContext = audioContextRef.current;
    const masterGain = gainRef.current;

    if (!audioContext || !masterGain) return;

    const oscillator = audioContext.createOscillator();
    const noteGain = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    noteGain.gain.setValueAtTime(0.001, audioContext.currentTime);
    noteGain.gain.exponentialRampToValueAtTime(0.09, audioContext.currentTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.45);

    oscillator.connect(noteGain);
    noteGain.connect(masterGain);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const startMusic = async () => {
    const audioContext = new AudioContext();
    const gain = audioContext.createGain();

    gain.gain.value = 0.18;
    gain.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    gainRef.current = gain;

    const melody = [523, 659, 784, 659, 587, 698, 880, 698];
    let step = 0;

    playNote(melody[step]);

    intervalRef.current = window.setInterval(() => {
      step += 1;
      playNote(melody[step % melody.length]);
    }, 520);

    setIsPlaying(true);
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    audioContextRef.current?.close();

    audioContextRef.current = null;
    gainRef.current = null;

    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
      return;
    }

    startMusic();
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <button className="music-button" onClick={toggleMusic}>
      {isPlaying ? '🔇 Music Off' : '🎵 Music On'}
    </button>
  );
}