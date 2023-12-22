import { useAppSelector } from "../Redux/ReduxStore";

function ReportInfor() {
  const selected = useAppSelector((state) => state.ReportsData.selectedReport);
  return (
    <div className="ads-info-container relative ">
      <div className="ads-info-popup absolute w-full rounded-xl border-opacity-90 p-4 shadow-lg">
        <div className="">
          <p className="text-base">Báo cáo: {selected?.reportType}</p>
          <p className="text-base">
            <span className="font-semibold">{selected?.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReportInfor;
