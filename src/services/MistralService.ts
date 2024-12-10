import MistralClient from '@mistralai/mistralai';
import { MISTRAL_MODELS, DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from '../utils/constants';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class MistralService {
  private client: MistralClient;
  private model = MISTRAL_MODELS.TINY;
  private conversationHistory: ChatMessage[] = [];

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.client = new MistralClient(apiKey);
  }

  async chat(message: string): Promise<string> {
    try {
      if (!message.trim()) {
        throw new Error('Message cannot be empty');
      }

      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: message
      });

      // Prepare messages array for the API call
      const messages = this.conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const chatResponse = await this.client.chat({
        model: this.model,
        messages: messages,
        temperature: DEFAULT_TEMPERATURE,
        max_tokens: DEFAULT_MAX_TOKENS
      });

      if (!chatResponse.choices || chatResponse.choices.length === 0) {
        throw new Error('No response received from Mistral AI');
      }

      const assistantMessage = chatResponse.choices[0]?.message?.content || '';
      
      if (!assistantMessage) {
        throw new Error('Empty response received from Mistral AI');
      }

      // Add assistant response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      // Keep only the last 10 messages to prevent context length issues
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      return assistantMessage;
    } catch (error: any) {
      console.error('Mistral API Error:', error);
      
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your credentials.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid request. Please check your input.');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to get response from Mistral AI. Please try again.');
      }
    }
  }

  clearConversation() {
    this.conversationHistory = [];
  }

  getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }
}