import type {
  Address,
  Amendment,
  Award,
  Auction,
  Bid,
  Criterion,
  Document,
  Invitation,
  Item,
  Enquiry,
  OtherRequirement,
  Lot,
  Party,
  Period,
  PreQualification,
  ReviewProceeding,
  SecondStage,
  Submission,
  Qualification,
} from './parts';
import type { Conversion } from 'ts4ocds/extensions/conversions';

interface Tender {
  statusDetails: string;
  lots: (Lot & {
    hasOptions: boolean;
    hasRecurrence: boolean;
    hasRenewal: boolean;
    submissionTerms: {
      variantPolicy: 'allowed' | 'notAllowed';
    };
    techniques?: {
      electronicAuction?: {
        url?: string;
      };
    };
  })[];
  items: (Item & { deliveryAddress: Address & { description?: string } })[];
  tenderPeriod: Period;
  enquiryPeriod: Period;
  awardPeriod?: Period;
  auctionPeriod?: Period;
  secondStage?: SecondStage;
  preQualification?: PreQualification;
  hasEnquiries: boolean;
  enquiries?: Enquiry[];
  amendments?: Amendment[];
  documents?: Document[];
  criteria?: Criterion[];
  otherRequirements?: OtherRequirement;
  awardCriteria: string;
  awardCriteriaDetails: string;
  conversions?: Conversion[];
  auctions?: Auction;
}

interface PurposeOfNotice {
  isACallForCompetition: boolean;
}

export interface ConvertedContractNotice {
  tag: string[];
  date: string;
  id: string;
  purposeOfNotice: PurposeOfNotice;
  hasPreviousNotice: boolean;
  tender: Tender;
  reviewProceedings?: ReviewProceeding[];
  submissions?: Submission[];
  qualifications?: Qualification[];
  invitations?: Invitation[];
  awards?: Award[];
  bids?: Bid[];
  parties?: Party[];
}
