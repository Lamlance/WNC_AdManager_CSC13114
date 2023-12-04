import { Col, Row } from "antd";
import ReportInfoTable from "./ReportInfoTable";
import { ReportInfoRecord } from "../../types";
import { useState } from "react";
import ReportInfoDetail from "./ReportInfoDetail";

const data: ReportInfoRecord[] = [
  {
    reporterInfo: {
      name: "Nguyen Van B",
      phone: "0987658332",
    },
    adsAddress: "47 Điện Biên Phủ, Quận 10, TP Hồ Chí Minh",
    reportType: "Báo cáo vi phạm",
    reportTime: new Date(),
    status: "Đang xử lý",
  },
  {
    reporterInfo: {
      name: "Pham Van C",
      phone: "0976854732",
    },
    adsAddress: "107 Nguyễn Văn Linh, Quận 7, TP Hồ Chí Minh",
    reportType: "Báo cáo vi phạm",
    reportTime: new Date(),
    status: "Đang xử lý",
  },
];

const ReportInfo = () => {
  const [selectedReportInfo, setSelectedReportInfo] =
    useState<ReportInfoRecord | null>(null);

  return (
    <Row
      gutter={20}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col span={17}>
        <ReportInfoTable
          data={data}
          onRowClick={(record) => {
            setSelectedReportInfo(record);
          }}
        />
      </Col>
      <Col span={6}>
        {selectedReportInfo && <ReportInfoDetail {...selectedReportInfo} />}
      </Col>
    </Row>
  );
};

export default ReportInfo;
