import AdsDetail from "./AdsDetail";

function AdsInfor() {
  return (
    <div className="ads-info-container relative">
      <div className="ads-info-popup absolute rounded border border-gray-500 p-4">
        <div className="ads-info-content">
          <p className="text-xl font-bold">Trụ, cụm Pano</p>
          <p className="ads_info_location text-xl">
            42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu
          </p>
          <p className="text-xl">
            <span className="font-bold">Loại bảng: </span> Trụ bảng hiflex
          </p>
          <p className="text-xl">
            <span className="font-bold">Kích thước: </span> 2.5m x 10m
          </p>
          <p className="text-xl">
            <span className="font-bold">Hình thức: </span> Quảng cáo thương mại
          </p>
          <p className="text-xl">
            <span className="font-bold">Phân loại: </span> Nhà ở riêng lẻ
          </p>
          <p className="text-xl">
            <span className="font-bold">Số lượng: </span> 2 trụ/bảng
          </p>
          <p className="mt-1 text-xl font-bold italic">Đã quy hoạch</p>

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

export default AdsInfor;
