import { StatsApi } from "@admanager/shared";
import { Button, Select } from "antd";
import ApexCharts from "apexcharts";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import {
  useGetAllWards,
  useLazyGetReportStatsEachWardQuery,
} from "../slices/api/apiSlice";

type Quan = { id_quan: number; ten_quan: string };

export function StatsPage() {
  const barChartEle = useRef<HTMLDivElement | null>(null);
  const { data: wardData } = useGetAllWards({});
  const [apexBarChart, setApexBarChart] = useState<ApexCharts>();
  const [quanList, setQuanList] = useState<Quan[]>([]);
  const [selectedQuan, setSelectedQuan] = useState<number | null>(null);
  const [getStatsEachWard, { data: statsEachWard }] =
    useLazyGetReportStatsEachWardQuery();

  function initApexBarChart(stats: StatsApi.StatsResponse) {
    if (!barChartEle.current) return console.log("Missing element");
    if (!wardData) return console.log("Missing ward data");
    if (!selectedQuan) return console.log("Chọn quận");
    if (apexBarChart) return updateBarChartData(stats);
    const stats_arr = Object.entries(stats).filter(
      (s) => s[1].phuong.id_quan === selectedQuan,
    );
    console.log(stats_arr, selectedQuan, Object.entries(stats));
    const missing_ward = wardData.filter(
      (w) =>
        w.quan.id_quan === selectedQuan &&
        stats_arr.findIndex(
          (s) => s[1].phuong.id_phuong === w.phuong.id_phuong,
        ) < 0,
    );

    const options = {
      series: stats_arr.reduce(
        (acum, v) => {
          acum[0].data.push(v[1].chua_xu_ly);
          acum[1].data.push(v[1].dang_xu_ly);
          acum[2].data.push(v[1].da_xy_ly);
          return acum;
        },
        [
          { name: "Chưa xử lý", data: [] as number[] },
          { name: "Đang xử lý", data: [] as number[] },
          { name: "Đã xử lý", data: [] as number[] },
        ] as const,
      ),
      chart: {
        type: "bar",
        height: 430,
        width: Math.max(
          (stats_arr.length + missing_ward.length) * 100,
          barChartEle.current.offsetWidth,
        ),
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enable: true,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [
          ...stats_arr.map((v) => v[1].phuong.ten_phuong),
          ...missing_ward.map((w) => w.phuong.ten_phuong),
        ],
      },
    };
    const chart = new ApexCharts(barChartEle.current, options);
    setApexBarChart(chart);
    if (barChartEle.current.childElementCount <= 0) chart.render();
  }

  function updateBarChartData(stats: StatsApi.StatsResponse) {
    if (!apexBarChart) return console.warn("Cant update uninit bar chart");
    if (!selectedQuan) return console.log("Chọn quận");
    if (!wardData) return console.log("Missing ward data");
    if (!barChartEle.current) return console.log("Missing element");

    const stats_arr = Object.entries(stats).filter(
      (s) => s[1].phuong.id_quan === selectedQuan,
    );
    const missing_ward = wardData.filter(
      (w) =>
        w.quan.id_quan === selectedQuan &&
        stats_arr.findIndex(
          (s) => s[1].phuong.id_phuong === w.phuong.id_phuong,
        ) < 0,
    );

    const options = {
      series: stats_arr.reduce(
        (acum, v) => {
          acum[0].data.push(v[1].chua_xu_ly);
          acum[1].data.push(v[1].dang_xu_ly);
          acum[2].data.push(v[1].da_xy_ly);
          return acum;
        },
        [
          { name: "Chưa xử lý", data: [] as number[] },
          { name: "Đang xử lý", data: [] as number[] },
          { name: "Đã xử lý", data: [] as number[] },
        ] as const,
      ),
      xaxis: {
        categories: [
          ...stats_arr.map((v) => v[1].phuong.ten_phuong),
          ...missing_ward.map((w) => w.phuong.ten_phuong),
        ],
      },
    };
    // apexBarChart.updateSeries(series.series);
    apexBarChart.updateOptions(options);
    if (barChartEle.current.childElementCount <= 0) apexBarChart.render();
  }

  useEffect(() => {
    if (!wardData) return;

    setQuanList(
      wardData.reduce((a, v) => {
        if (a.findIndex((cur) => cur.id_quan === v.quan.id_quan) < 0)
          a.push(v.quan);
        return a;
      }, [] as Quan[]),
    );
  }, [wardData]);

  useEffect(() => {
    getStatsEachWard();
    document.addEventListener("AdsManager:CreateReportEvent", () => {
      getStatsEachWard();
    });
    document.addEventListener("AdsManager:UpdateReportEvent", () => {
      getStatsEachWard();
    });
  }, []);

  useEffect(() => {
    if (!statsEachWard || !selectedQuan) return;
    initApexBarChart(statsEachWard);
  }, [statsEachWard, selectedQuan]);

  return (
    <>
      <div>
        <span>Quận: </span>
        <Select
          className=" min-w-24"
          onChange={(v) => {
            setSelectedQuan(v || null);
          }}
          options={quanList.map((q) => ({
            value: q.id_quan,
            label: q.ten_quan,
          }))}
        />
      </div>
      <div ref={barChartEle} className=" overflow-auto"></div>
    </>
  );
}
