interface Response {
  keywords: string[];
  answer: string;
}

const responses: Response[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    answer: "Hello! I'm Sarah, your AI assistant. How can I help you today?"
  },
  {
    keywords: ['how', 'are', 'you'],
    answer: "I'm doing great, thank you for asking! I'm here to help you with any questions you might have."
  },
  {
    keywords: ['weather', 'temperature', 'forecast'],
    answer: "I'm sorry, I don't have access to real-time weather data, but I can chat with you about many other topics!"
  },
  {
    keywords: ['name', 'who', 'are', 'you'],
    answer: "I'm Sarah, an AI assistant designed to chat with you and answer your questions with a friendly female voice."
  },
  {
    keywords: ['time', 'date', 'day'],
    answer: `The current time is ${new Date().toLocaleTimeString()} and today is ${new Date().toLocaleDateString()}.`
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    answer: "Goodbye! It was nice chatting with you. Feel free to come back anytime!"
  }
];

export class ResponseService {
  private findBestMatch(input: string): string {
    const lowercaseInput = input.toLowerCase();
    const words = lowercaseInput.split(' ');
    
    let bestMatch: Response | null = null;
    let maxMatches = 0;

    for (const response of responses) {
      const matches = response.keywords.filter(keyword => 
        words.some(word => word.includes(keyword))
      ).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = response;
      }
    }

    if (bestMatch) {
      return bestMatch.answer;
    }

    return "I'm not sure how to answer that, but I'm always learning! Feel free to ask me something else.";
  }

  getResponse(input: string): string {
    return this.findBestMatch(input);
  }
}