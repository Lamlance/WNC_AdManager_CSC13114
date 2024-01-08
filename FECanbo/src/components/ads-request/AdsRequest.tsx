import React from "react";
import { Row, Col } from "antd";
import AdsRequestTable from "./AdsRequestTable";
import AdsRequestDetail from "./AdsRequestDetail";
import { AdsReqApi } from "@admanager/shared";

interface MainContentSectionProps {
  data: AdsReqApi.ManyAdsRequestResponse[];
  onRowClick: (record: AdsReqApi.ManyAdsRequestResponse) => void;
  selectedAd: AdsReqApi.ManyAdsRequestResponse | null;
}

const AdsRequest: React.FC<MainContentSectionProps> = ({
  data,
  onRowClick,
  selectedAd,
}) => {
  // console.log("selctedad", selectedAd);
  return (
    <Row
      gutter={20}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col span={!!selectedAd ? 17 : 24}>
        <AdsRequestTable data={data} onRowClick={onRowClick} />
      </Col>
      <Col span={!!selectedAd ? 7 : 0}>
        <AdsRequestDetail ad={selectedAd} />
      </Col>
    </Row>
  );
};

export default AdsRequest;
