import { Row, Col } from "antd";
import AdsInfoTable from "./AdsInfoTable";
import { useGetAllAdsInfoQuery } from "../../slices/api/apiSlice";
import AdsInfoSlider from "./AdsInfoDetail";
import { useState } from "react";
import { AdsGeoJson } from "@admanager/shared";

const AdsInfo = () => {
  const { data, error, isLoading } = useGetAllAdsInfoQuery();
  const [selectedRow, setSelectedRow] =
    useState<AdsGeoJson.AdsGeoJsonProperty | null>(null);

  return (
    <>
      {error && <div>There was an error</div>}
      {isLoading && <div>Loading data </div>}
      <Row
        gutter={20}
        style={{
          minHeight: "100vh",
        }}
      >
        <Col span={17}>
          <AdsInfoTable
            data={(data || []).map((v) => ({
              ...v,
              loai_vi_tri: v.ads[0].loai_vitri,
            }))}
            onRowSelect={setSelectedRow}
          />
        </Col>
        <Col span={7}>{selectedRow && <AdsInfoSlider {...selectedRow} />}</Col>
      </Row>
    </>
  );
};

export default AdsInfo;
