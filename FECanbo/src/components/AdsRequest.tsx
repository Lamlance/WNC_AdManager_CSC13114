// MainContentSection.tsx
import React from "react";
import { Row, Col, Button } from "antd";
import { DemoComponent } from "@admanager/frontend";
import AdsRequestTable from "./AdsRequestTable"
import AdsRequestDetail from "./AdsRequestDetail";
import { AdRequest } from "../types";


interface MainContentSectionProps {
  data: AdRequest[];
  onRowClick: (record: AdRequest) => void;
  selectedAd: AdRequest | null;
}

const AdsRequest: React.FC<MainContentSectionProps> = ({ data, onRowClick, selectedAd }) => {
  return (
    <Row gutter={16}>
      <Col span={16}>
        <Button type="primary">Button</Button>
        <DemoComponent />

        <AdsRequestTable data={data} onRowClick={onRowClick} />
      </Col>
      <Col span={6}>
        <AdsRequestDetail ad={selectedAd} />
      </Col>
    </Row>
  );
};

export default AdsRequest;
