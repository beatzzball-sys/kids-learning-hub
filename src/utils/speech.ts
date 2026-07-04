const getIndianEnglishVoice = () => {
  const voices = window.speechSynthesis.getVoices();

  return (
    voices.find((voice) => voice.lang.toLowerCase() === 'en-in') ||
    voices.find((voice) => voice.name.toLowerCase().includes('india')) ||
    voices.find((voice) => voice.name.toLowerCase().includes('indian')) ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith('en')) ||
    null
  );
};

export const speak = (text: string) => {
  if (!('speechSynthesis' in window)) {
    alert('Speech is not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  const indianVoice = getIndianEnglishVoice();

  speech.lang = 'en-IN';
  speech.rate = 0.78;
  speech.pitch = 1.08;
  speech.volume = 1;

  if (indianVoice) {
    speech.voice = indianVoice;
  }

  window.speechSynthesis.speak(speech);
};