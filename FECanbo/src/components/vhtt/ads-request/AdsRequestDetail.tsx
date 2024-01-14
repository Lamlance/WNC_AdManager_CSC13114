import React from "react";
import { Button } from "antd";
import { AdsReqApi } from "@admanager/shared";
import { useSubmitUpdateAdRequestStatusMutation } from "../../../slices/api/apiSlice";

interface AdDetailsSectionProps {
  ad: AdsReqApi.ManyAdsRequestResponse | null;
  onStatus?: (isApprove: boolean) => void;
}

const AdDetailsSection: React.FC<AdDetailsSectionProps> = ({
  ad,
  onStatus,
}) => {
  const containerStyle = {
    padding: "10px",
    borderRadius: "8px",
  };

  const imageStyle = {
    marginBottom: "10px",
    img: {
      width: "100%",
      borderRadius: "4px",
    },
  };
  const [submitAdMethod] = useSubmitUpdateAdRequestStatusMutation();
  const handleApprove = () => {
    const data: AdsReqApi.AdRequestUpdateStatus2 = {
      id_yeu_cau: ad!.yeu_cau.id_yeu_cau,
      trang_thai: "Approve",
    };

    submitAdMethod(data).then((v) => {
      onStatus?.(true);
      console.log(v);
    });
    //window.location.reload();
  };
  const handleReject = () => {
    const data: AdsReqApi.AdRequestUpdateStatus2 = {
      id_yeu_cau: ad!.yeu_cau.id_yeu_cau,
      trang_thai: "Reject",
    };

    submitAdMethod(data).then((v) => {
      onStatus?.(false);
      console.log(v);
    });
    //window.location.reload();
  };

  return (
    <div style={containerStyle} className="bg-cream">
      {ad ? (
        <div>
          <h2 className="font-bold">CHI TIẾT YÊU CẦU</h2>
          <div style={imageStyle}>
            <img
              src="https://example.com/path/to/your/image.jpg"
              alt="Ads Img"
              style={imageStyle.img}
            />
          </div>
          <p>
            <span className="font-semibold">Công ty đặt quảng cáo: </span>
            <span>{ad.yeu_cau.ten_cty}</span>
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            <span>{ad.yeu_cau.email_cty}</span>
          </p>
          <p>
            <span className="font-semibold">SĐT: </span>
            <span>{ad.yeu_cau.dien_thoai_cty}</span>
          </p>
          <p>
            <span className="font-semibold">Địa chỉ: </span>
            <span>{ad.yeu_cau.dia_chi_cty}</span>
          </p>
          <p>
            <span className="font-semibold">Thời gian đặt: </span>
            <span>
              {(ad.yeu_cau.ngay_hieu_luc as unknown as string).split("T")[1]}
            </span>{" "}
            -{" "}
            <span>
              {(ad.yeu_cau.ngay_het_han as unknown as string).split("T")[1]}
            </span>
          </p>
          <p>
            <span className="font-semibold">Trạng thái: </span>
            <span>{"No status"}</span>
          </p>
          <p>
            <span className="font-semibold">Nội dung: </span>
            <span>{ad.yeu_cau.noi_dung_qc}</span>
          </p>

          {ad.yeu_cau.trang_thai !== "Waiting" ? (
            <div className="my-3 flex justify-between">
              <Button className="bg-neutral-300" disabled type="primary">
                Phê duyệt
              </Button>
              <Button disabled type="primary" className="bg-red-500">
                Từ chối
              </Button>
            </div>
          ) : (
            <div className="my-3 flex justify-between">
              <Button type="primary" onClick={handleApprove}>
                Phê duyệt
              </Button>
              <Button
                type="primary"
                className="bg-red-500"
                onClick={handleReject}
              >
                Từ chối
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p>Hãy chọn một yêu cầu</p>
      )}
    </div>
  );
};

export default AdDetailsSection;
