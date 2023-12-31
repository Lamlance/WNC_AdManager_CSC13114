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
  id: string;
  location: string;
  sender: string;
  address: string;
  reason: string;
  lng: number;
  lat: number;
  status: string;
  
// const AdChangeRequestSchema = z
//   .object({
//     id_yeu_cau: z.number(),
//     thoi_diem_chinh_sua: z.date(),
//     trang_thai: z.string(),
//     id_quang_cao: z.string(),
//   })
//   .merge(AdChangeRequestCreateSchema);

// const AdChangeRequestResponseSchema = z.object({
//   chinh_sua: AdChangeRequestSchema,
//   thong_tin_qc: AdsGeoJson.AdsPropertySchema,
// });
}  
