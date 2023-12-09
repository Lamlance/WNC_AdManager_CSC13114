import { Row, Col } from "antd";
import AdsInfoTable from "./AdsInfoTable";
import { AdsInfoRecord } from "../../types";
import { useState } from "react";
import AdsInfoDetail from "./AdsInfoDetail";

const data: AdsInfoRecord[] = [
  {
    adsType: "Trụ, cụm pano",
    address: "227 Nguyễn Văn Cừ, Quận 5, TP Hồ Chí Minh",
    generalInfo: {
      size: {
        width: 2,
        height: 1.5,
      },
      number: 1,
    },
    contentType: "Quảng cáo doanh nghiệp",
    placeType: "Đất công",
    status: "Đang xử lý",
  },
  {
    adsType: "Trụ, cụm pano",
    address: "Viettel Tower, Quận 10, TP Hồ Chí Minh",
    generalInfo: {
      size: {
        width: 5,
        height: 4,
      },
      number: 2,
    },
    contentType: "Tranh cổ động",
    placeType: "Đất công",
    status: "Đã xử lý",
  },
  {
    adsType: "Bảng điện tử",
    address: "Công viên Tao Đàn, Quận 5, TP Hồ Chí Minh",
    generalInfo: {
      size: {
        width: 5,
        height: 4,
      },
      number: 2,
    },
    contentType: "Quảng cáo doanh nghiệp",
    placeType: "Đất công",
    status: "Đang xử lý",
  },
];

const AdsInfo = () => {
  const [selectedAdsInfo, setSelectedAdsInfo] = useState<AdsInfoRecord | null>(
    null,
  );

  return (
    <Row
      gutter={20}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col span={17}>
        <AdsInfoTable
          data={data}
          onRowClick={(record) => {
            setSelectedAdsInfo(record);
          }}
        />
      </Col>
      <Col span={6}>
        {selectedAdsInfo && <AdsInfoDetail {...selectedAdsInfo} />}
      </Col>
    </Row>
  );
};

export default AdsInfo;
