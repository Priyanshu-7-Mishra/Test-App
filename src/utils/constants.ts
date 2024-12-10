export const MISTRAL_MODELS = {
  TINY: 'mistral-tiny',
  SMALL: 'mistral-small',
  MEDIUM: 'mistral-medium',
} as const;

export const DEFAULT_MAX_TOKENS = 1000;
export const DEFAULT_TEMPERATURE = 0.7;
export const MAX_CONVERSATION_HISTORY = 10;