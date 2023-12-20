import React from "react";
import { Row, Col } from "antd";
import AdsRequestTable from "./AdsRequestTable";
import AdsRequestDetail from "./AdsRequestDetail";
import { AdRequest } from "../../../types";

interface MainContentSectionProps {
  data: AdRequest[];
  onRowClick: (record: AdRequest) => void;
  selectedAd: AdRequest | null;
}

const AdsRequest: React.FC<MainContentSectionProps> = ({
  data,
  onRowClick,
  selectedAd,
}) => {
  console.log("selctedad", selectedAd);
  return (
    <Row
      gutter={20}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col span={17}>
        <AdsRequestTable data={data} onRowClick={onRowClick} />
      </Col>
      <Col span={7}>
        <AdsRequestDetail ad={selectedAd} />
      </Col>
    </Row>
  );
};

export default AdsRequest;
