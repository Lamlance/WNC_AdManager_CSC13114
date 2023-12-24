import { AdsGeoJson } from "@admanager/shared";
import { AdsInfoRecord } from "../../types/view-model";
import { Button, Carousel } from "antd";
import { useRef } from "react";
import { CarouselRef } from "antd/es/carousel";

type AdsInfoDetailProps = {
  ad: AdsGeoJson.AdsProperty;
  place: AdsGeoJson.PlaceProperty;
};

const AdInfoDetail = ({ ad, place }: AdsInfoDetailProps) => {
  const containerStyle = {
    padding: "10px",
    backgroundColor: "#DBF1EA",
    borderRadius: "8px",
  };

  const imageStyle = {
    marginBottom: "10px",
    img: {
      width: "100%",
      borderRadius: "4px",
    },
  };

  return (
    <div style={containerStyle}>
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
        <span className="italic"> {ad.ngay_hieu_luc} </span>
      </p>
      <p>
        <span className="font-semibold"> Ngày hết hạn: </span>
        <span className="italic"> {ad.ngay_het_han} </span>
      </p>
    </div>
  );
};

function AdsInfoSlider(props: AdsGeoJson.AdsGeoJsonProperty) {
  const sliderRef = useRef<CarouselRef | null>(null);

  return (
    <div className=" flex h-full flex-col gap-4">
      <Carousel ref={sliderRef} dotPosition="top" className=" p-2">
        {props.ads.map((v) => (
          <AdInfoDetail ad={v} place={props.place} />
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
