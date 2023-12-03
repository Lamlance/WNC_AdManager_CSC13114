import { useEffect, useState } from "react";
import { AdRequest } from "./types";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import AdsRequest from "./components/ads-request/AdsRequest";
import { Button, Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import AdsInfo from "./components/ads-info/AdsInfo";
import ReportInfo from "./components/report-info/ReportInfo";

const { Header, Sider, Content } = Layout;

const data: AdRequest[] = [
  {
    requestId: "1",
    panoContent: "Quảng cáo",
    panoTitle: "Quảng cáo trà sữa Phúc Long",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    bookingAgency: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    panoDetailedContent:
      "Trà sữa Phúc Long không đặc biệt và hơi mắc nhưng uống cũng được",
    rentalPeriod: "12/11/2022 - 12/11/2024",
    status: "Đang xử lý",
    image: "",
  },
  {
    requestId: "2",
    panoContent: "Quảng cáo",
    panoTitle: "Quảng cáo trà sữa Phúc Long",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    bookingAgency: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    panoDetailedContent:
      "Trà sữa Phúc Long không đặc biệt và hơi mắc nhưng uống cũng được",
    rentalPeriod: "12/11/2022 - 12/11/2024",
    status: "Đã phê duyệt",
    image: "",
  },
  {
    requestId: "3",
    panoContent: "Quảng cáo",
    panoTitle: "Quảng cáo trà sữa Phúc Long",
    position: "42 Võ Thị Sáu, Quận 3, Phường Võ Thị Sáu",
    bookingAgency: "TNVH HN",
    email: "pthn@gmail.com",
    phoneNumber: "19001001",
    address: "227 NCV, Q5, HCM",
    panoDetailedContent:
      "Trà sữa Phúc Long không đặc biệt và hơi mắc nhưng uống cũng được",
    rentalPeriod: "12/11/2022 - 12/11/2024",
    status: "Đã hủy",
    image: "",
  },
];

const App = () => {
  const [selectedAds, setSelectedAds] = useState<AdRequest | null>(null);

  const showDetails = (record: AdRequest) => {
    setSelectedAds(record);
  };

  useEffect(() => {
    if (data.length > 0) {
      setSelectedAds(data[0]);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route
          index
          element={
            <AdsRequest
              data={data}
              onRowClick={showDetails}
              selectedAd={selectedAds}
            />
          }
        />
        <Route path="advertisements" element={<AdsInfo />} />
        <Route path="reports" element={<ReportInfo />} />
      </Route>
    </Routes>
  );
};

const PageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Yêu cầu cấp phép",
      title: "/",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Thông tin điểm quảng cáo",
      title: "/advertisements",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "Báo cáo từ người dân",
      title: "/reports",
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsedWidth={0}
        width={280}
        collapsible
        collapsed={collapsed}
      >
        <div className="my-4 flex flex-row justify-center">
          <span className="text-base font-bold text-white"> Ads Manager </span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{
            fontSize: "16px",
          }}
          defaultSelectedKeys={["1"]}
          items={items}
          onSelect={({ key }) => {
            const redirectURL = items?.find((item) => item?.key == key)?.title;
            console.log(redirectURL);
            return redirectURL === undefined
              ? navigate("/")
              : navigate(redirectURL);
          }}
        />
      </Sider>
      <Layout
        style={{
          background: "#ffffff",
        }}
      >
        <Header style={{ padding: 0, background: "#ffffff" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 50,
              height: 50,
              background: "#ffffff",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#ffffff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default function () {
  useEffect(() => {
    const head = document.querySelector("head");
    if (!head) {
      return;
    }
    const tailWindStyleTag = [...head.querySelectorAll("style")].find((style) =>
      style.innerHTML.includes("tailwind"),
    );
    if (tailWindStyleTag) {
      head.insertAdjacentElement("afterbegin", tailWindStyleTag);
    }
  }, []);
  return <App />;
}
