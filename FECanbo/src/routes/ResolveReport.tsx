import { ReportApi } from "@admanager/shared";
import QuillEditor from "../components/Quill/QuillEditor";
import ReportResolveForm from "../components/report-info/ReportResolveForm";
import { useLazyGetAllReportInfo } from "../slices/api/apiSlice";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReportInfoDetail from "../components/report-info/ReportInfoDetail";

export default function ResloveReport() {
  const [getAllReportInfo, { data }] = useLazyGetAllReportInfo();
  const [selectedReport, setSelectedReport] =
    useState<null | ReportApi.ReportResponse>(null);
  const { report_id } = useParams();
  useEffect(() => {
    if (!data) {
      getAllReportInfo({});
      return;
    }
    if (!report_id) return;
    const bc_id = parseInt(report_id);
    const idx = data.findIndex((v) => v.bao_cao.id_bao_cao === bc_id);
    console.log("Data index", idx);
    if (idx >= 0) setSelectedReport(data[idx]);
  }, [data]);
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <div className=" col-span-2 text-2xl">
        <Link to={"/reports"}>⬅️ Quay về bảng báo cáo</Link>
      </div>
      <div>{selectedReport && <ReportInfoDetail {...selectedReport} />}</div>
      <div>
        <ReportResolveForm report={selectedReport} />
      </div>
    </div>
  );
}
