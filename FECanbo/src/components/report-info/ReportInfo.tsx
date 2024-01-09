import { Col, Row, Switch } from "antd";
import ReportInfoTable from "./ReportInfoTable";
import ReportInfoDetail from "./ReportInfoDetail";
import { useLazyGetAllReportInfo } from "../../slices/api/apiSlice";
import { useEffect, useRef, useState } from "react";
import { ReportApi } from "@admanager/shared";
import WardCheckBoxList from "../FormComponents/WardCheckBox";
import { useAppSelector } from "../../store";

const ReportInfo = () => {
  const [getAllReportInfo, { data, error, isLoading }] =
    useLazyGetAllReportInfo();
  const authState = useAppSelector((state) => state.auth);
  const [selectedRow, setSelectedRow] =
    useState<ReportApi.ReportResponse | null>(null);

  useEffect(() => {
    document.addEventListener("AdsManager:CreateReportEvent", (e) => {
      console.log("Detail", e.detail);
      if (!authState.isLoggedIn) return;
      getAllReportInfo({
        phuong_id: authState.user.managedWards,
      });
    });
  }, []);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    getAllReportInfo({
      phuong_id: authState.user.managedWards,
    }).then((d) => console.log("Reprots", d));
  }, [authState]);

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
        <Col span={!!selectedRow ? 17 : 24}>
          <div className=" relative left-0 right-0 z-10 h-8 bg-white">
            <WardCheckBoxList onWardListChange={onWardFilter} />
          </div>
          <ReportInfoTable data={data || []} onRowSelect={setSelectedRow} />
        </Col>
        <Col span={!!selectedRow ? 7 : 0}>
          {selectedRow && (
            <ReportInfoDetail {...selectedRow} lineClamp={true} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ReportInfo;
