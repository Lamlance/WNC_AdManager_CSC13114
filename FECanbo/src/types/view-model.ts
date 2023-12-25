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
  sizeInfo: string;
  number: number;
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
  reporterName: string;
  reporterEmail: string;
  adsAddress: string;
  reporterPhone: string;
  reportType: string;
  reportContent: string;
  reportTime: string;
  status: string;
}
