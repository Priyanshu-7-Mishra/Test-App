export class SpeechService {
  private synthesis: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.setFemaleVoice();
  }

  private setFemaleVoice() {
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = this.synthesis.getVoices();
      this.voice = voices.find(
        (voice) => voice.lang.startsWith('en') && voice.name.includes('Female')
      ) || voices[0];
    };
  }

  speak(text: string) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.rate = 1;
    utterance.pitch = 1;
    this.synthesis.speak(utterance);
  }

  stop() {
    this.synthesis.cancel();
  }
}