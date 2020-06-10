export interface Enquiry {
  id: string;
  date: string;
  title: string;
  description: string;
  answer?: string;
  dateAnswered?: string;
  relatedLot: string;
}
