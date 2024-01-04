import { Col, Row, Switch } from "antd";
import ReportInfoTable from "./ReportInfoTable";
import ReportInfoDetail from "./ReportInfoDetail";
import { useLazyGetAllReportInfo } from "../../slices/api/apiSlice";
import { fromReportResponse2ReportRecord } from "../../types/mapper";
import { useEffect, useRef, useState } from "react";
import { ReportApi } from "@admanager/shared";
import WardCheckBoxList from "../FormComponents/WardCheckBox";

const ReportInfo = () => {
  const [getAllReportInfo, { data, error, isLoading }] =
    useLazyGetAllReportInfo();
  const [selectedRow, setSelectedRow] =
    useState<ReportApi.ReportResponse | null>(null);

  useEffect(() => {
    getAllReportInfo({});
  }, []);

  const onWardFilter = (phuong_ids: number[]) => {
    getAllReportInfo({ phuong_id: phuong_ids });
    console.log(phuong_ids);
  };

  return (
    <>
      {error && <div>There was an error</div>}
      {isLoading && <div>Loading page</div>}
      <Row
        gutter={20}
        style={{
          minHeight: "100vh",
        }}
      >
        <Col span={17}>
          <div className=" relative left-0 right-0 z-10 h-8 bg-white">
            <WardCheckBoxList onWardListChange={onWardFilter} />
          </div>
          <ReportInfoTable data={data || []} onRowSelect={setSelectedRow} />
        </Col>
        <Col span={7}>
          {selectedRow && (
            <ReportInfoDetail {...selectedRow} lineClamp={true} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ReportInfo;
