import { StatsApi } from "@admanager/shared";
import { Button } from "antd";
import ApexCharts from "apexcharts";
import React, { useRef } from "react";
import { useEffect, useState } from "react";

export function StatsPage() {
  const barChartEle = useRef<HTMLDivElement | null>(null);
  const [apexBarChart, setApexBarChart] = useState<ApexCharts>();

  function initApexBarChart(stats: StatsApi.StatsResponse) {
    if (!barChartEle.current) return console.log("Missing element");
    if (apexBarChart) return console.log("Already init chart");
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
        width: 50 * 100,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "left",
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
          ...Object.values(stats).map((v) => v.phuong.ten_phuong),
          ...new Array(50).fill("a"),
        ],
      },
    };
    setApexBarChart(new ApexCharts(barChartEle.current, options));
  }

  useEffect(() => {
    fetch("http://localhost:4030/api/thong-ke").then(async (v) => {
      try {
        const data = await v.json();
        initApexBarChart(StatsApi.StatsResponseSchema.parse(data));
      } catch (e) {
        console.warn(e);
      }
    });
  }, []);

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
