// types.ts (or a file where you define your types)
export interface AdRequest {
  requestId: string;
  panoContent: string;
  position: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  effectedDate: string;
  expiredDate: string;
  status: string;
  image: string;
}

export interface AdsInfoRecord {
  id: string;
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
  effectDate: string;
  expireDate: string;
}

export interface ReportInfoRecord {
  id: string;
  reporterInfo: {
    name: string;
    phone: string;
  };
  adsAddress: string;
  reportType: string;
  reportContent: string;
  reportTime: Date;
  status: string;
}


export interface EditRequest {   //yeu cau chinh sua
  id: string;
  loccation: string;
  sender: string;
  address: string;
  reason: string;
  lng: number;
  lat: number;
}