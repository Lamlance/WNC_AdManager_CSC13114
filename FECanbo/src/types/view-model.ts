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
  sizeInfo: string;
  num: number;
  contentType: string;
  placeType: string;
  effDate: string;
  expDate: string;
  imageUrls: string[];
}

export interface ReportInfoRecord {
  id: number;
  adsId: number;
  reporterInfo: string;
  adsAddress: string;
  reporterPhone: string;
  reportType: string;
  reportContent: string;
  reportTime: string;
  status: string;
}
