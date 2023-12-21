export interface AdsResponse {
    id: string;
    effDate: string;
    expDate: string;
    length: number;
    width: number;
    number: number;
    imageUrl1: string;
    imageUrl2: string;
    adsType: string;
    placeType: string;
    contentType: string;
    address: string;
}

export type GetAllAdsResponse = AdsResponse[]; 

export interface AdsReqResponse {
    id: number;
    place: string;
    adsContent: string;
    companyName: string;
    companyPhone: string;
    effDate: string;
    expDate: string;
}

export type GetAllAdsReqResponse = AdsReqResponse[];

export interface ReportResponse {
    id: number;
    reporterName: string,
    reporterEmail: string,
    adsAddress: string,
    reporterPhone: string,
    reportContent: string,
    reportType: string,
    reportTime: string;
    adsId: number;
    status: string;
}

export type GetAllReportsResponse = ReportResponse[];

