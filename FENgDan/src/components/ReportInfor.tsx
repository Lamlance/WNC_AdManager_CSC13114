import { useAppSelector } from "../Redux/ReduxStore";

function ReportInfor() {
  const selected = useAppSelector((state) => state.ReportsData.selectedReport);
  return (
    <div className=" flex flex-col">
      {selected?.map((v) => (
        <div className="ads-info-container relative ">
          <div className="ads-info-popup absolute w-full rounded-xl border-opacity-90 p-4 shadow-lg">
            <div className="">
              <p className="text-base">Báo cáo: {v.loai_bao_cao}</p>
              <p className="text-base">Tình trạng: {v.bao_cao.trang_thai}</p>

              <p className="text-base">
                <span
                  className="font-semibold "
                  dangerouslySetInnerHTML={{
                    __html: v.bao_cao.noi_dung || "",
                  }}
                ></span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportInfor;
