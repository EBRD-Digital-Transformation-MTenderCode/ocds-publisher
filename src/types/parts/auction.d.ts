import { Period } from './period';
import { Value } from './value';

interface AuctionResult {
  relatedBid: string;
  value: Value;
}

interface ElectronicAuctionModality {
  url?: string;
  eligibleMinimumDifference: Value;
}

interface AuctionDetails {
  id: string;
  relatedLot: string;
  auctionPeriod?: Period;
  url?: string;
  electronicAuctionModalities?: ElectronicAuctionModality[];
  auctionResult?: AuctionResult[];
  electronicAuctionResult?: AuctionResult[];
}

export interface Auction {
  details: AuctionDetails[];
}
