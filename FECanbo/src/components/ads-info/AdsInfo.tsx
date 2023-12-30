import { Row, Col, Button } from "antd";
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
      <EditSetpoint onFormSubmit={onPlaceChangeSubmit} />
      {selectedAd && (
        <EditAdForm
          onFormSubmit={onAdChangeSubmit}
          ad={selectedAd}
          type="AdInfo"
          isModalOpen={openAd}
          onClose={() => setOpenAd(false)}
        />
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
