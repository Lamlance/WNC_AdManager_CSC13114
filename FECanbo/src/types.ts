// types.ts (or a file where you define your types)
export interface AdRequest {
  requestId: string;
  panoContent: string;
  panoTitle: string;
  position: string;
  bookingAgency: string;
  email: string;
  phoneNumber: string;
  address: string;
  panoDetailedContent: string;
  rentalPeriod: string;
  status: string;
  image: string;
  tags: string[];
}
