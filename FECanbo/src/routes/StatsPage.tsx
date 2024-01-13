import { StatsApi } from "@admanager/shared";
import { Button } from "antd";
import ApexCharts from "apexcharts";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useLazyGetReportStatsEachWardQuery } from "../slices/api/apiSlice";

export function StatsPage() {
  const barChartEle = useRef<HTMLDivElement | null>(null);
  const [apexBarChart, setApexBarChart] = useState<ApexCharts>();

  const [getStatsEachWard, { data: statsEachWard }] =
    useLazyGetReportStatsEachWardQuery();

  function initApexBarChart(stats: StatsApi.StatsResponse) {
    if (!barChartEle.current) return console.log("Missing element");
    if (apexBarChart) return updateBarChartData(stats);
    const options = {
      series: Object.values(stats).reduce(
        (acum, v) => {
          acum[0].data.push(v.chua_xu_ly);
          acum[1].data.push(v.dang_xu_ly);
          acum[2].data.push(v.da_xy_ly);
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
          Object.values(stats).length * 100,
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
        categories: [...Object.values(stats).map((v) => v.phuong.ten_phuong)],
      },
    };
    setApexBarChart(new ApexCharts(barChartEle.current, options));
  }

  function updateBarChartData(stats: StatsApi.StatsResponse) {
    if (!apexBarChart) return console.warn("Cant update uninit bar chart");
    const series = {
      series: Object.values(stats).reduce(
        (acum, v) => {
          acum[0].data.push(v.chua_xu_ly);
          acum[1].data.push(v.dang_xu_ly);
          acum[2].data.push(v.da_xy_ly);
          return acum;
        },
        [
          { name: "Chưa xử lý", data: [] as number[] },
          { name: "Đang xử lý", data: [] as number[] },
          { name: "Đã xử lý", data: [] as number[] },
        ],
      ),
    };
    apexBarChart.updateSeries(series.series);
  }

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
    if (!statsEachWard) return;
    initApexBarChart(statsEachWard);
  }, [statsEachWard]);

  return (
    <>
      <Button
        onClick={() => {
          apexBarChart?.render();
        }}
      >
        Render chart
      </Button>
      <div ref={barChartEle} className=" overflow-auto"></div>
    </>
  );
}
