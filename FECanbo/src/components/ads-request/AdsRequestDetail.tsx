import React, { useEffect, useState } from "react";
import { AdRequest } from "../../types/view-model";
import { AdsReqApi } from "@admanager/shared";
import { useLazyGetImageUrlQuery } from "../../slices/api/apiSlice";
import { Carousel } from "antd";

interface AdDetailsSectionProps {
  ad: AdsReqApi.ManyAdsRequestResponse | null;
}

const AdDetailsSection: React.FC<AdDetailsSectionProps> = ({ ad }) => {
  const [getImgUrl] = useLazyGetImageUrlQuery();
  const [imgUrl, setImgUrl] = useState<string[]>([]);

  useEffect(() => {
    setImgUrl([]);
    if (!ad?.yeu_cau) return;
    const imgs: Promise<{ data?: { url: string } }>[] = [];
    if (ad.yeu_cau.hinh_anh)
      imgs.push(
        getImgUrl({
          filename: ad.yeu_cau.hinh_anh,
          bkname: "adsrequest",
        }),
      );
    if (ad.yeu_cau.hinh_anh_2)
      imgs.push(
        getImgUrl({
          filename: ad.yeu_cau.hinh_anh_2,
          bkname: "adsrequest",
        }),
      );

    Promise.allSettled(imgs).then((data) => {
      const urls: string[] = [];
      console.log(data);
      data.forEach((d) => {
        if (d.status === "fulfilled" && d.value.data) {
          urls.push(d.value.data.url);
        }
      });
      setImgUrl(urls);
    });
  }, [ad]);

  return (
    <div className=" bg-cream rounded-md p-4 text-base">
      {ad ? (
        <div className="flex flex-col gap-y-1">
          <h2 className="text-center text-base font-semibold text-zinc-950">
            Chi tiết yêu cầu
          </h2>
          <div className=" mb-4">
            <Carousel className="m-0 h-fit overflow-hidden rounded-md">
              {imgUrl.map((i) => (
                <img
                  key={i}
                  src={i}
                  alt="Ads Img"
                  className=" m-0 mb-4 overflow-hidden rounded-md"
                />
              ))}
            </Carousel>
          </div>
          <p>
            <span className="font-semibold">Công ty đặt quảng cáo: </span>
            <span>{ad.yeu_cau.ten_cty}</span>
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            <span>{ad.yeu_cau.email_cty}</span>
          </p>
          <p>
            <span className="font-semibold">SĐT: </span>
            <span>{ad.yeu_cau.dien_thoai_cty}</span>
          </p>
          <p>
            <span className="font-semibold">Địa chỉ: </span>
            <span>{ad.yeu_cau.dia_chi_cty}</span>
          </p>
          <p>
            <span className="font-semibold">Thời gian đặt: </span>
            <span>
              {new Date(ad.yeu_cau.ngay_hieu_luc).toLocaleDateString()}
            </span>{" "}
            -{" "}
            <span>
              {new Date(ad.yeu_cau.ngay_het_han).toLocaleDateString()}
            </span>
          </p>
          <p>
            <span className="font-semibold">Trạng thái: </span>
            <span>{"No status"}</span>
          </p>
          <p>
            <span className="font-semibold">Nội dung: </span>
            <span>{ad.yeu_cau.noi_dung_qc}</span>
          </p>
        </div>
      ) : (
        <p>Hãy chọn một yêu cầu</p>
      )}
    </div>
  );
};

export default AdDetailsSection;
