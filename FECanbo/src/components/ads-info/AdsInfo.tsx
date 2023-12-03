import { Row, Col } from "antd";
import AdsInfoDetail from "./AdsInfoDetail";
import AdsInfoTable from "./AdsInfoTable";

const AdsInfo = () => {
  return (
    <Row gutter={20} style={{
      minHeight: "100vh"
    }}>
      <Col span={17}>
        <AdsInfoTable />
      </Col>
      <Col span={6}>
      </Col>
    </Row>
  );
};

export default AdsInfo;
