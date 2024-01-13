import { Col, Row, Switch, notification } from "antd";
import ReportInfoTable from "./ReportInfoTable";
import ReportInfoDetail from "./ReportInfoDetail";
import { useLazyGetAllReportInfo } from "../../slices/api/apiSlice";
import { useEffect, useRef, useState } from "react";
import { ReportApi, SocketIoApi } from "@admanager/shared";
import WardCheckBoxList from "../FormComponents/WardCheckBox";
import { useAppSelector } from "../../store";

const ReportInfo = () => {
  const [getAllReportInfo, { data, error, isLoading }] =
    useLazyGetAllReportInfo();
  const authState = useAppSelector((state) => state.auth);
  const [selectedRow, setSelectedRow] =
    useState<ReportApi.ReportResponse | null>(null);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.info({
      message: `Receive new report`,
      placement: "topRight",
      duration: 0,
    });
  };

  function onReportCreateEvent(e: CustomEvent<SocketIoApi.ReportCreateEvent>) {
    console.log("Detail", e.detail);
    if (!authState.isLoggedIn) return;
    openNotification();
    getAllReportInfo({
      phuong_id: authState.user.managedWards,
    });
  }

  useEffect(() => {
    document.addEventListener(
      "AdsManager:CreateReportEvent",
      onReportCreateEvent,
    );

    return () => {
      document.removeEventListener(
        "AdsManager:CreateReportEvent",
        onReportCreateEvent,
        true,
      );
    };
  }, []);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    getAllReportInfo({
      phuong_id: authState.user.managedWards,
    }).then((d) => console.log("Reprots", d));
  }, [authState]);

  const onWardFilter = (phuong_ids: number[]) => {
    if (phuong_ids.length > 0) {
      getAllReportInfo({ phuong_id: phuong_ids });
    } else if (authState.isLoggedIn) {
      getAllReportInfo({
        phuong_id: authState.user.managedWards,
      });
    }
    console.log(phuong_ids);
  };

  return (
    <>
      {contextHolder}
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
