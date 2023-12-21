// types.ts (or a file where you define your types)
export interface AdRequest {
  id_yeu_cau: string;
  noi_dung_qc: string;
  id_diem_dat: string;
  ten_cty: string;
  email_cty: string;
  dien_thoai_cty: string;
  dia_chi_cty: string;
  ngay_hieu_luc: string;
  ngay_het_han: string;
  trang_thai: string;
  hinh_anh: string;
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
