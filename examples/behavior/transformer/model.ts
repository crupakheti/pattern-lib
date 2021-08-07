import { SensoredText } from '../strategy/model';

export type Classification = 'word' | 'paragraph' | 'page' | 'chapter' | 'book';
export type Sentiment = 'happy' | 'sad' | 'flat';

export interface CategorizedText extends SensoredText {
  classification?: Classification;
  sentiment?: Sentiment;
}
