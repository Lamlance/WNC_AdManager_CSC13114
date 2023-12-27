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
  img: string;
  img2: string;
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

<<<<<<< HEAD

export interface EditRequest {   //yeu cau chinh sua
=======
export interface EditAdRequest {
  id: string;
  timeRequest: string;
  reason: string;
  newinfo: AdsInfoRecord;
  status: string;
}

export interface EditAdRequest {
  id: string;
  timeRequest: string;
  reason: string;
  newinfo: AdsInfoRecord;
  status: string;
}

export interface EditRequest {
  //yeu cau chinh sua
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a
  id: string;
  location: string;
  sender: string;
  address: string;
  reason: string;
  lng: number;
  lat: number;
  status: string;
<<<<<<< HEAD
}
=======
}
>>>>>>> 920c6bb3c62c34021bba84d4adc2c7eb41b3023a
