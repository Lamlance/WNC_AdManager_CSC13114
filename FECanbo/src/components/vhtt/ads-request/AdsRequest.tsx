import React, { useEffect } from "react";
import { Row, Col } from "antd";
import AdsRequestTable from "./AdsRequestTable";
import AdsRequestDetail from "./AdsRequestDetail";
import { AdRequest } from "../../../types";
import {
  useGetAllAdsReqQuery,
  useLazyGetAllAdsReq,
} from "../../../slices/api/apiSlice";
import { AdsReqApi } from "@admanager/shared";
import { useAppSelector } from "../../../hooks";

interface MainContentSectionProps {
  onRowClick: (record: AdsReqApi.ManyAdsRequestResponse) => void;
  selectedAd: AdsReqApi.ManyAdsRequestResponse | null;
}

const AdsRequest: React.FC<MainContentSectionProps> = ({
  onRowClick,
  selectedAd,
}) => {
  const [getAllAdsReq, { data, error, isLoading }] = useLazyGetAllAdsReq();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    getAllAdsReq({});
  }, [authState]);

  return (
    <Row
      gutter={20}
      style={{
        minHeight: "100vh",
      }}
    >
      <Col span={!!selectedAd ? 17 : 24}>
        <AdsRequestTable data={data || []} onRowClick={onRowClick} />
      </Col>
      <Col span={!!selectedAd ? 7 : 0}>
        <AdsRequestDetail ad={selectedAd} onStatus={() => getAllAdsReq({})} />
      </Col>
    </Row>
  );
};

export default AdsRequest;
