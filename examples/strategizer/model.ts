export type Source = 'textbook' | 'newspaper' | 'magazines' | 'socialmedia';

export interface Text {
  content: string;
  source: Source;
}

export interface CensuredText extends Text {
  censuredContent?: string;
}
