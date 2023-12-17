import { Row, Col } from "antd";
import AdsInfoTable from "./AdsInfoTable";
import { AdsInfoRecord } from "../../types";
import { useState } from "react";
import AdsInfoDetail from "./AdsInfoDetail";
import { useGetAllAdsInfoQuery } from "../../slices/api/apiSlice";

const data: AdsInfoRecord[] = [];

const AdsInfo = () => {
  const { data, error, isLoading } = useGetAllAdsInfoQuery();
  const [selectedAdsInfo, setSelectedAdsInfo] = useState<AdsInfoRecord | null>(
    null,
  );

  return (
    <>
      {error && (
        <div>
          <p> There was an error </p>
        </div>
      )}
      {isLoading && (
        <div>
          <p> Loading page </p>
        </div>
      )}
      {data && (
        <Row
          gutter={20}
          style={{
            minHeight: "100vh",
          }}
        >
          <Col span={17}>
            <AdsInfoTable
              data={data}
              onRowClick={(record) => setSelectedAdsInfo(record)}
            />
          </Col>
          <Col span={6}>
            {selectedAdsInfo && <AdsInfoDetail {...selectedAdsInfo} />}
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdsInfo;
