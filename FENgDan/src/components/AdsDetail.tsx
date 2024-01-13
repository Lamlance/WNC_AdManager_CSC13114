import { Modal } from "antd";
import { useAppSelector } from "../Redux/ReduxStore";
import { AdsGeoJson, ReportApi } from "@admanager/shared";
import { useLazyGetImageFromName } from "../Redux/AdsServerApi";
import { useEffect, useState } from "react";

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
  const [getImgFromName] = useLazyGetImageFromName();
  const selected = useAppSelector((state) => state.SelectedAds);
  const [imgs, setImgs] = useState({ hinh_1: "", hinh_2: "" });

  async function GetImages() {
    const data1 = Ad.hinh_1
      ? getImgFromName({ filename: Ad.hinh_1, bkname: "adsrequest" })
      : null;
    const data2 = Ad.hinh_2
      ? getImgFromName({ filename: Ad.hinh_2, bkname: "adsrequest" })
      : null;

    const allImg = await Promise.allSettled([data1, data2]);
    setImgs({
      hinh_1:
        allImg[0].status === "fulfilled"
          ? allImg[0].value?.data?.url || ""
          : "",
      hinh_2:
        allImg[1].status === "fulfilled"
          ? allImg[1].value?.data?.url || ""
          : "",
    });
  }

  console.log(imgs);
  useEffect(() => {
    GetImages();
  }, [Ad]);

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
          <span className=" font-bold">Ngày hết hạn:</span>
          {Ad.ngay_het_han
            ? new Date(Ad.ngay_het_han).toLocaleDateString()
            : "Không có"}
        </p>

        <div className="mt-2 grid grid-cols-2 gap-x-2 bg-slate-200 p-4">
          <img src={imgs.hinh_1} alt="Image 1" className="" />
          <img src={imgs.hinh_2} alt="Image 2" className="" />
        </div>
      </Modal>
    </div>
  );
}

export default AdsDetail;
