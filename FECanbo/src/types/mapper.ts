import { AdsResponse, ReportResponse } from "./response";
import { AdsInfoRecord, ReportInfoRecord } from "./view-model";

// export const fromAdsResponse2AdsRecord = (adsResponse: AdsResponse) => {
//   return {
//     id: adsResponse.id,
//     effDate: adsResponse.effDate,
//     expDate: adsResponse.expDate,
//     number: adsResponse.number,
//     imageUrls: [adsResponse.imageUrl1, adsResponse.imageUrl2],
//     sizeInfo: `${adsResponse.length}m x ${adsResponse.width}m`,
//     num: adsResponse.number,
//     contentType: adsResponse.contentType,
//     placeType: adsResponse.placeType,
//     adsType: adsResponse.adsType,
//     address: adsResponse.address,
//   } as AdsInfoRecord;
// };

export const fromAdsResponse2AdsRecord = (adsResponse: AdsResponse) => {
  return {
    ...adsResponse,
    imageUrls: [adsResponse.imageUrl1, adsResponse.imageUrl2],
    sizeInfo: `${adsResponse.length}m x ${adsResponse.width}m`,
  } as AdsInfoRecord;
};

export const fromReportResponse2ReportRecord = (
  reportResponse: ReportResponse,
) => {
  return {
    ...reportResponse,
    reporterInfo: `${reportResponse.reporterName}\n${reportResponse.reporterEmail}`,
  } as ReportInfoRecord;
};
