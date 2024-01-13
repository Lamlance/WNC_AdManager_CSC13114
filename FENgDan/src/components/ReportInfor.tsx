import { SocketIoApi, ReportApi, AdsGeoJson } from "@admanager/shared";
import { uploadReportData } from "../Redux/AdsServerApi";
import { useAppSelector } from "../Redux/ReduxStore";
import { EmptyAdItem } from "./AdsInfor";
import { UploadFile } from "antd/es/upload/interface";
import { ReportFormPropery } from "./ReportModal";

interface AdsItemProps {
  Ad: AdsGeoJson.AdsProperty;
  Place: AdsGeoJson.PlaceProperty | ReportApi.ReportPlace;

  onReportSubmit: (
    report: ReportFormPropery,
    place: AdsGeoJson.PlaceProperty | ReportApi.ReportPlace,
    ad?: AdsGeoJson.AdsProperty,
  ) => void;
}

function ReportInfor() {
  const selected = useAppSelector((state) => state.ReportsData.selectedReport);
  const [uploadReport, data] = uploadReportData();
  const onReportSubmit: AdsItemProps["onReportSubmit"] = async (
    report,
    place,
    ad,
  ) => {
    try {
      console.log(report, place, ad);
      const formData = new FormData();
      Object.entries(report).forEach(([k, v]) => {
        if (!v) return;
        if ((k as keyof ReportFormPropery) === "images") {
          const files = v as UploadFile[];
          files.forEach((f) => {
            if (f.originFileObj) {
              console.log(f.originFileObj);
              formData.append("hinh_anh", f.originFileObj);
            }
          });
          return;
        }
        formData.append(k, v.toString());
      });

      Object.entries(place).forEach(([k, v]) => {
        if (!v) return;
        formData.append(k, v.toString());
      });

      if (ad?.id_quang_cao) {
        formData.append("id_quang_cao", ad.id_quang_cao);
      }

      try {
        const geojson = await uploadReport(formData).unwrap();
      } catch (e) {
        console.warn(e);
      }

      document.dispatchEvent(
        new CustomEvent<SocketIoApi.ReportCreateEvent>(
          "AdsManager:CreateReportEvent",
        ),
      );
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <div className=" flex h-full flex-col gap-y-4 overflow-scroll">
      {selected?.[0] && (
        <div>
          <EmptyAdItem
            onReportSubmit={onReportSubmit}
            disableEmptyMsg={true}
            Place={{
              ten_dia_diem: selected[0].bao_cao.dia_chi,
              dia_chi: selected[0].bao_cao.dia_chi,
              lng: selected[0].bao_cao.lng,
              lat: selected[0].bao_cao.lat,
            }}
          />
        </div>
      )}
      {selected?.map((v) => {
        console.log(v.bao_cao);
        return (
          <div className="" key={v.bao_cao.id_bao_cao}>
            <div className=" w-full rounded-xl border-opacity-90 p-4 shadow-lg">
              <div className="">
                <p className="text-base">
                  <span className=" font-bold">Báo cáo:</span> {v.loai_bao_cao}
                </p>
                <p className="text-base">
                  <span className=" font-bold">Tình trạng:</span>
                  {v.bao_cao.trang_thai}
                </p>

                <p className="text-base">
                  <span className=" font-bold">Thời điểm báo cáo:</span>
                  {new Date(v.bao_cao.thoi_diem_bc).toLocaleDateString()}
                </p>

                <p className="text-base">
                  <span className=" font-bold">Nội dung</span>
                  <span
                    className="font-semibold "
                    dangerouslySetInnerHTML={{
                      __html: v.bao_cao.noi_dung || "Không có nội dung",
                    }}
                  ></span>
                </p>

                <p className="text-base">
                  <span className=" font-bold">Phản hồi</span>

                  <span
                    className="font-semibold "
                    dangerouslySetInnerHTML={{
                      __html: v.bao_cao.phan_hoi || "Chưa có phản hồi",
                    }}
                  ></span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReportInfor;
