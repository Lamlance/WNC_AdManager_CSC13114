import { AdChangeApi, AdsGeoJson } from "@admanager/shared";
import { AdsInfoRecord } from "../../types/view-model";
import { Button, Carousel } from "antd";
import { useEffect, useRef, useState } from "react";
import { CarouselRef } from "antd/es/carousel";
import { useLazyGetImageUrlQuery } from "../../slices/api/apiSlice";

export type AdsInfoDetailProps = {
  ad: AdsGeoJson.AdsProperty;
  place: AdsGeoJson.PlaceProperty;
  onRequestChange: (
    data: AdsGeoJson.AdsProperty & AdsGeoJson.PlaceProperty,
  ) => void;
};

const AdInfoDetail = ({ ad, place, onRequestChange }: AdsInfoDetailProps) => {
  const [getImgFromName] = useLazyGetImageUrlQuery();
  const [imgs, setImgs] = useState({ hinh_1: "", hinh_2: "" });

  async function GetImages() {
    const data1 = ad.hinh_1
      ? getImgFromName({ filename: ad.hinh_1, bkname: "adsrequest" })
      : null;
    const data2 = ad.hinh_2
      ? getImgFromName({ filename: ad.hinh_2, bkname: "adsrequest" })
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

  useEffect(() => {
    GetImages();
    console.log(ad.hinh_1, ad.hinh_2);
  }, [ad]);

  return (
    <div className="flex flex-col bg-cream text-base">
      <h2 className="font-bold"> CHI TIẾT THÔNG TIN ĐIỂM QUẢNG CÁO </h2>
      <p>
        <span className="font-semibold"> Loại quảng cáo: </span>
        <span> {ad.bang_qc} </span>
      </p>
      <p>
        <span className="font-semibold"> Địa điểm quảng cáo: </span>
        <span> {place.dia_chi} </span>
      </p>
      <p>
        <span className="font-semibold"> Kích thước: </span>
        <span> {`${ad.chieu_dai_m}m x ${ad.chieu_rong_m}m`} </span>
      </p>
      <p>
        <span className="font-semibold"> Số lượng: </span>
        <span> {`${ad.so_luong} cột/bảng`} </span>
      </p>
      <p>
        <span className="font-semibold"> Hình thức: </span>
        <span> {ad.hinh_thuc} </span>
      </p>
      <p>
        <span className="font-semibold"> Điểm đặt: </span>
        <span> {ad.loai_vitri} </span>
      </p>
      <p>
        <span className="font-semibold"> Ngày hiệu lực: </span>
        <span className="italic">
          {ad.ngay_hieu_luc
            ? new Date(ad.ngay_hieu_luc).toLocaleDateString()
            : ""}
        </span>
      </p>
      <p>
        <span className="font-semibold"> Ngày hết hạn: </span>
        <span className="italic">
          {ad.ngay_het_han
            ? new Date(ad.ngay_het_han).toLocaleDateString()
            : ""}
        </span>
      </p>
      <div>
        <Carousel>
          {imgs.hinh_1 ? <img src={imgs.hinh_1} /> : null}
          {imgs.hinh_2 ? <img src={imgs.hinh_2} /> : null}
        </Carousel>
      </div>
      <Button
        onClick={() => onRequestChange({ ...ad, ...place })}
        className=" self-center"
      >
        Yêu cầu chỉnh sửa
      </Button>
    </div>
  );
};

interface AdsInfoSliderProps {
  data: AdsGeoJson.AdsGeoJsonProperty;
  onRequestChange: AdsInfoDetailProps["onRequestChange"];
}
function AdsInfoSlider(props: AdsInfoSliderProps) {
  const sliderRef = useRef<CarouselRef | null>(null);

  return (
    <div className=" flex flex-col gap-4 bg-cream">
      <Carousel ref={sliderRef} dotPosition="top" className=" p-2">
        {props.data.ads.map((v) => (
          <AdInfoDetail
            onRequestChange={props.onRequestChange}
            ad={v}
            place={props.data.place}
          />
        ))}
      </Carousel>
      <div className=" flex justify-between">
        <Button type="primary" onClick={() => sliderRef.current?.prev()}>
          {"<"}
        </Button>
        <Button type="primary" onClick={() => sliderRef.current?.next()}>
          {">"}
        </Button>
      </div>
    </div>
  );
}

export default AdsInfoSlider;
