import { Row, Col } from "antd";
import AdsInfoTable from "./AdsInfoTable";
import { useGetAllAdsInfoQuery } from "../../slices/api/apiSlice";
import { fromAdsResponse2AdsRecord } from "../../types/mapper";
import AdsInfoDetail from "./AdsInfoDetail";

const AdsInfo = () => {
  const { data, error, isLoading } = useGetAllAdsInfoQuery();

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
              data={data.map((adsInfo) => fromAdsResponse2AdsRecord(adsInfo))}
            />
          </Col>
          <Col span={7}>
            {<AdsInfoDetail {...fromAdsResponse2AdsRecord(data[0])} />}
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdsInfo;
