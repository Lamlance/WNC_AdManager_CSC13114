import { Modal } from "antd";
import { useAppSelector } from "../Redux/ReduxStore";
import { AdsGeoJson, ReportApi } from "@admanager/shared";

interface AdsDetailProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  Ad: AdsGeoJson.AdsProperty;
  Place: AdsGeoJson.PlaceProperty | ReportApi.ReportPlace;
}

function AdsDetail({
  isModalOpen,
  handleOk,
  handleCancel,
  Ad,
  Place,
}: AdsDetailProps) {
  const selected = useAppSelector((state) => state.SelectedAds);

  const customTitle = (
    <div className="text-center text-2xl">
      <p>Chi tiết bảng quảng cáo</p>
    </div>
  );

  return (
    <div>
      <Modal
        title={customTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={850}
      >
        <p className=" text-xl font-bold">{Ad.bang_qc}</p>
        <p className=" text-xl">{Place.dia_chi}</p>
        <p className=" text-xl">
          <span className=" font-bold">Ngày hết hạn:</span>{" "}
          {Ad.ngay_het_han || "Không có"}
        </p>

        <div className="mt-5 flex justify-center">
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
            alt="Image 1"
            className="h-50 w-120 mr-10"
          />
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
            alt="Image 2"
            className="h-50 w-120"
          />
        </div>
      </Modal>
    </div>
  );
}

export default AdsDetail;
