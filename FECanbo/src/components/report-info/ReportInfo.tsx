import { Col, Row } from "antd";
import ReportInfoTable from "./ReportInfoTable";
import ReportInfoDetail from "./ReportInfoDetail";

const ReportInfo = () => {
    return (
        <Row gutter={20} style={{
          minHeight: "100vh"
        }}>
          <Col span={17}>
            <ReportInfoTable />
          </Col>
          <Col span={6}>
          </Col>
        </Row>
      );
}

export default ReportInfo