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
}

export interface AdsInfoRecord {
  adsType: string;
  address: string;
  generalInfo: {
    size: {
      width: number;
      height: number;
    };
    number: number;
  };
  contentType: string;
  placeType: string;
  status: string;
}

export interface ReportInfoRecord {
  reporterInfo: {
    name: string;
    phone: string;
  };
  adsAddress: string;
  reportType: string;
  reportTime: Date;
  status: string;
}
