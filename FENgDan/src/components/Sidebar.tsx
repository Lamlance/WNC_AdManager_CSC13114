import { Drawer } from "antd";
import Tab from "./Tabs";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxStore";
import { setSelectedAdsLocation } from "../Redux/SelectedAdsSlice";
import { setSelectedReport } from "../Redux/ReportsDataSlice";
import AdsInfor from "./AdsInfor";
import ReportInfor from "./ReportInfor";

function Sidebar() {
  const selectedAds = useAppSelector((state) => state.SelectedAds);
  const selectedReport = useAppSelector(
    (state) => state.ReportsData.selectedReport,
  );

  const dispatch = useAppDispatch();

  function on_drawer_close() {
    dispatch(setSelectedAdsLocation(null));
    dispatch(setSelectedReport(null));
  }

  console.log(selectedReport);
  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={on_drawer_close}
        open={selectedAds || selectedReport ? true : false}
        key="left"
        width="30%"
      >
        {!selectedAds ? null : <AdsInfor />}
        {!selectedReport ? null : <ReportInfor />}
      </Drawer>
    </div>
  );
}

export default Sidebar;
