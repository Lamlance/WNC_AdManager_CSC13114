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

export type GetAllAdsReqRequest = AdsReqResponse[];

export interface GetAllReportResponse {

}

