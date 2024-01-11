import { useEffect, useRef, useState } from "react";
import QuillEditor from "../Quill/QuillEditor";
import Quill from "quill";
import { Button, Form, Select } from "antd";
import { ReportApi } from "@admanager/shared";
import { useUpdateReportStatusMutation } from "../../slices/api/apiSlice";

type ReportResolveFormValue = ReportApi.ReportUpdate;

type ReportResolveFormProps = {
  report: ReportApi.ReportResponse | null;
};

function ReportResolveForm(props: ReportResolveFormProps) {
  const quillRef = useRef<Quill | null>(null);
  const [updateReportStats] = useUpdateReportStatusMutation();
  function handleFormSubmit(value: ReportResolveFormValue) {
    if (!props.report) return;
    if (!quillRef.current) return;
    const phan_hoi = encodeURI(quillRef.current.root.innerHTML.trim());
    value.phan_hoi = phan_hoi;
    const data = {
      ...value,
      id_bao_cao: props.report.bao_cao.id_bao_cao,
    };
    console.log("Update data", data);
    updateReportStats(data).then((v) => console.log(v));
  }

  useEffect(() => {
    if (!props.report || !props.report.bao_cao.phan_hoi) return;
    if (!quillRef.current) return;
    quillRef.current.clipboard.dangerouslyPasteHTML(
      props.report.bao_cao.phan_hoi,
    );
  }, [props]);

  return (
    <Form<ReportResolveFormValue>
      className="flex flex-col gap-y-2"
      onFinish={handleFormSubmit}
    >
      <p className="text-center text-2xl">Chỉnh sửa trạng thái</p>
      <Form.Item<ReportResolveFormValue>
        name="trang_thai"
        rules={[{ required: true, message: "Chọn trạng thái của báo cáo" }]}
      >
        <Select
          options={[
            { value: "Đang xử lý", label: "Đang xử lý" },
            { value: "Đã xử lý", label: "Đã xử lý" },
          ]}
        />
      </Form.Item>

      <div className="prose lg:prose-xl">
        <QuillEditor forwardedRef={quillRef} />
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default ReportResolveForm;
