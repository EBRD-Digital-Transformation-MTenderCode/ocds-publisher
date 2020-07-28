import { Classification } from './classification';
import { Document } from './document';

interface Review {
  id: string;
  date: string;
  status: string;
  complainer: {
    name: string;
  };
  classification: Classification;
  addressedTo: 'reviewBody' | 'procuringEntity';
}

export interface ReviewProceeding {
  complaints: Review[];
  reviews: (Omit<Review, 'complainer' | 'addressedTo'> & {
    resolution: string;
    complaint: string;
    documents: Pick<Document, 'id' | 'url'>[];
  })[];
}
