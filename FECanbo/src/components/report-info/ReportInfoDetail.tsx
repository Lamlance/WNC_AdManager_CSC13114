import { ReportApi } from "@admanager/shared";
import { ReportInfoRecord } from "../../types/view-model";
import { useLazyGetImageUrlQuery } from "../../slices/api/apiSlice";
import { useEffect, useState } from "react";
import { Carousel } from "antd";
interface ReportInfoDetailProps extends ReportApi.ReportResponse {
  lineClamp?: boolean;
}
const ReportInfoDetail = ({
  bao_cao,
  loai_bc,
  lineClamp,
}: ReportInfoDetailProps) => {
  const [getImgUrl] = useLazyGetImageUrlQuery();
  const [imgUrl, setImgUrl] = useState<string[]>([]);

  useEffect(() => {
    setImgUrl([]);
    if (!bao_cao) return;
    const imgs: Promise<{ data?: { url: string } }>[] = [];
    if (bao_cao.hinh_1)
      imgs.push(getImgUrl({ filename: bao_cao.hinh_1, bkname: "adsreports" }));
    if (bao_cao.hinh_2)
      imgs.push(getImgUrl({ filename: bao_cao.hinh_2, bkname: "adsreports" }));

    Promise.allSettled(imgs).then((data) => {
      console.log(data);
      const urls: string[] = [];
      data.forEach((d) => {
        if (d.status === "fulfilled" && d.value.data) {
          urls.push(d.value.data.url);
        }
      });
      setImgUrl(urls);
    });
  }, [bao_cao]);

  const containerStyle = {
    padding: "10px",
    backgroundColor: "#DBF1EA",
    borderRadius: "8px",
  };

  const imageStyle = {
    marginBottom: "10px",
    img: {
      width: "100%",
      borderRadius: "4px",
    },
  };

  return (
    <div style={containerStyle} className=" bg-cream text-base">
      <h2 className="font-bold"> CHI TIẾT THÔNG TIN BÁO CÁO </h2>
      <p>
        <span className="font-bold"> Họ tên người gửi: </span>
        <span> {bao_cao.ten_nguoi_gui} </span>
      </p>
      <p>
        <span className="font-bold"> Email: </span>
        <span> {bao_cao.email} </span>
      </p>
      <p>
        <span className="font-bold"> Số điện thoại: </span>
        <span> {bao_cao.dien_thoai} </span>
      </p>
      <p>
        <span className="font-bold"> Địa điểm quảng cáo: </span>
        <span> {bao_cao.dia_chi} </span>
      </p>
      <p>
        <span className="font-bold"> Loại hình báo cáo: </span>
        <span> {loai_bc} </span>
      </p>
      <p>
        <span className="font-bold"> Thời điểm gửi: </span>
        <span> {`${bao_cao.thoi_diem_bc}`} </span>
      </p>
      <p>
        <span className="font-bold"> Trạng thái: </span>
        <span> {bao_cao.trang_thai} </span>
      </p>
      <Carousel>
        {imgUrl.map((i) => (
          <img
            key={i}
            src={i}
            alt="Ads Img"
            className=" mb-4 max-h-80 object-contain"
          />
        ))}
      </Carousel>
      <div>
        <span className="font-bold"> Nội dung báo cáo: </span>
        <span
          dangerouslySetInnerHTML={{ __html: bao_cao.noi_dung }}
          className={`${lineClamp ? "line-clamp-2" : ""}`}
        ></span>
      </div>
    </div>
  );
};

export default ReportInfoDetail;
