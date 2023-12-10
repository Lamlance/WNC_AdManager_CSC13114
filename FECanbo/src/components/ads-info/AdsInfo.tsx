import { Row, Col } from "antd";
import AdsInfoTable from "./AdsInfoTable";
import { AdsInfoRecord } from "../../types";
import { useState } from "react";
import AdsInfoDetail from "./AdsInfoDetail";

const data: AdsInfoRecord[] = [];

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
