import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex items-start gap-4 ${
        message.isBot ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <div className="flex-shrink-0">
        {message.isBot ? (
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        )}
      </div>
      <div
        className={`flex-1 px-4 py-2 rounded-lg ${
          message.isBot ? 'bg-indigo-50' : 'bg-gray-50'
        }`}
      >
        <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs text-gray-500 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}