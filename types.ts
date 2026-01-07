export interface ConsoleOption {
  id: string;
  name: string;
  era: string;
  description: string;
  color: string;
  gradient: string;
}

export interface GeneratedImage {
  imageUrl: string;
  consoleName: string;
}

export type ProcessingState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';