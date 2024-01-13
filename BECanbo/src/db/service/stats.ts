import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { VNCharToEN } from "../../utils/VNCharToEN";
import { StatsApi } from "@admanager/shared";

//Chưa xử lý Đang xử lý Đã xử lý

export async function GetWardStats() {
  const ward_list = await pg_client.query.Phuong.findMany();
  const report_list = await pg_client.query.BaoCao.findMany();
  const report_grpBy_ward: StatsApi.StatsResponse = {};

  for (let i = 0; i < report_list.length; i++) {
    const report = report_list[i];
    const ward_index = ward_list.findIndex((w) => {
      return (
        report.dia_chi.includes(w.ten_phuong) ||
        report.dia_chi.includes(VNCharToEN(w.ten_phuong))
      );
    });
    if (ward_index < 0) {
      continue;
    }

    const ward_id = ward_list[ward_index].id_phuong.toString();
    if (!report_grpBy_ward[ward_id]) {
      report_grpBy_ward[ward_id] = {
        chua_xu_ly: 0,
        dang_xu_ly: 0,
        da_xy_ly: 0,
        phuong: ward_list[ward_index],
      };
    }

    if (report.trang_thai === "Chưa xử lý") {
      report_grpBy_ward[ward_id]["chua_xu_ly"] += 1;
    } else if (report.trang_thai === "Đang xử lý") {
      report_grpBy_ward[ward_id]["dang_xu_ly"] += 1;
    } else if (report.trang_thai === "Đã xử lý") {
      report_grpBy_ward[ward_id]["da_xy_ly"] += 1;
    }
  }

  return report_grpBy_ward;
}
