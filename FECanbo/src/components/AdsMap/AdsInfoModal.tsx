import { AdsGeoJson } from "@admanager/shared";
import {
  CaretLeftFilled,
  CaretLeftOutlined,
  CaretRightFilled,
} from "@ant-design/icons";
import { Carousel, Col, Modal, Row, Slider } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { useRef } from "react";

interface AdsInfoModalProps {
  data: AdsGeoJson.AdsGeoJsonProperty;
  isShow: boolean;
  onClose: () => void;
}
interface AdsInfoProps {
  Ad: AdsGeoJson.AdsProperty;
  Place: AdsGeoJson.PlaceProperty;
}
function AdsInfo({ Ad, Place }: AdsInfoProps) {
  return (
    <div className="">
      <div className="w-full rounded-xl border-opacity-90 p-4 shadow-lg">
        <div className="ads-info-content">
          <p className=" text-lg font-bold">{Ad.bang_qc}</p>
          <p className="ads_info_location text-base">{Place.dia_chi}</p>
          <p className="text-base">
            <span className="font-semibold">Kích thước: </span>{" "}
            {`${Ad.chieu_dai_m}m x ${Ad.chieu_rong_m}m`}
          </p>
          <p className="text-base">
            <span className="font-semibold">Hình thức: </span> {Ad.hinh_thuc}
          </p>
          <p className="text-base">
            <span className="font-semibold">Phân loại: </span> {Ad.loai_vitri}
          </p>
          <p className="text-base">
            <span className="font-semibold">Số lượng: </span>
            {`${Ad.so_luong} trụ/bảng`}
          </p>
          <p className="mt-1 text-base font-bold italic">
            {Ad.quy_hoach ? "Đã quy hoạch" : "Chưa quy hoạch"}
          </p>
        </div>
      </div>
    </div>
  );
}

function AdsInfoModal(props: AdsInfoModalProps) {
  const sliderRef = useRef<CarouselRef | null>(null);
  return (
    <Modal
      footer={null}
      open={props.isShow}
      onCancel={() => {
        props.onClose();
      }}
    >
      <div className="">
        <Row>
          <Col
            span={2}
            className=" cursor-pointer bg-gray-100 hover:blur-none"
            onClick={() => sliderRef.current?.prev()}
          >
            <div className=" h-full">
              <CaretLeftFilled className=" h-full text-3xl" />
            </div>
          </Col>

          <Col span={20}>
            <Carousel ref={sliderRef} className=" p-1" dotPosition="bottom">
              {props.data.ads.map((v) => (
                <AdsInfo Ad={v} Place={props.data.place} />
              ))}
            </Carousel>
          </Col>
          <Col
            span={2}
            className=" cursor-pointer bg-gray-100 hover:blur-none"
            onClick={() => sliderRef.current?.next()}
          >
            <div className=" h-full">
              <CaretRightFilled className=" h-full text-3xl" />
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

export default AdsInfoModal;
