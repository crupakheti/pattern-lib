import { CensuredText } from '../strategizer/model';
export type Classification = 'word' | 'paragraph' | 'page' | 'chapter' | 'book';
export type Sentiment = 'happy' | 'sad' | 'flat';

export interface CategorizedText extends CensuredText {
  classification?: Classification;
  sentiment?: Sentiment;
}
