import React, { useState } from 'react';
import { Message } from './types/chat';
import { MistralService } from './services/MistralService';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ApiKeyForm } from './components/ApiKeyForm';
import { Toaster, toast } from 'react-hot-toast';
import { RotateCcw } from 'lucide-react';

function App() {
  const [mistralService, setMistralService] = useState<MistralService | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiKeySubmit = (apiKey: string) => {
    try {
      const service = new MistralService(apiKey);
      setMistralService(service);
      setError(null);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: "Hello! I'm your Mistral AI assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } catch (err) {
      setError('Invalid API key');
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!mistralService) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await mistralService.chat(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      toast.error(err.message || 'Failed to get response from Mistral AI');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    if (mistralService) {
      mistralService.clearConversation();
      setMessages([{
        id: Date.now().toString(),
        content: "Conversation reset. How can I help you?",
        isBot: true,
        timestamp: new Date(),
      }]);
      toast.success('Conversation has been reset');
    }
  };

  if (!mistralService) {
    return <ApiKeyForm onSubmit={handleApiKeySubmit} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Mistral AI Chat</h1>
            <p className="text-indigo-100">Powered by Mistral's language model</p>
          </div>
          <button
            onClick={handleResetConversation}
            className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-[500px] overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;