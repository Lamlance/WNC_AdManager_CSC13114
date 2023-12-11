import { useAppSelector } from "../Redux/ReduxStore";
import AdsDetail from "./AdsDetail";
import { AdsGeoJson } from "@admanager/shared";

function AdItem(props: AdsGeoJson.AdsProperty) {
  return (
    <div className="ads-info-container relative">
      <div className="ads-info-popup absolute rounded border border-gray-500 p-4">
        <div className="ads-info-content">
          <p className="text-xl font-bold">Trụ, cụm Pano</p>
          <p className="ads_info_location text-xl">{props.dia_chi}</p>
          <p className="text-xl">
            <span className="font-bold">Loại bảng: </span> {props.bang_qc}
          </p>
          <p className="text-xl">
            <span className="font-bold">Kích thước: </span> 2.5m x 10m
          </p>
          <p className="text-xl">
            <span className="font-bold">Hình thức: </span> {props.hinh_thuc}
          </p>
          <p className="text-xl">
            <span className="font-bold">Phân loại: </span> {props.loai_vitri}
          </p>
          <p className="text-xl">
            <span className="font-bold">Số lượng: </span> {props.so_luong || 1}{" "}
            trụ/bảng
          </p>
          <p className="mt-1 text-xl font-bold italic">
            {props.quy_hoach ? "Đã quy hoạch" : "Chưa đã quy hoạch"}
          </p>

          <AdsDetail />

          <div className="mt-4 flex justify-end">
            <button className="mr-2 rounded border border-gray-500 bg-blue-500 p-4 px-4 py-2 text-white">
              Register
            </button>
            <button className="rounded border border-gray-500 bg-green-500 p-4 px-4 py-2 text-white">
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdsInfos() {
  const selected = useAppSelector((state) => state.SelectedAds);

  return (
    <>
      {!selected ? (
        <div>No ads data available</div>
      ) : (
        selected.ads.map((v) => <AdItem {...v} key={v.dia_chi} />)
      )}
    </>
  );
}

export default AdsInfos;
