import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import { ReactElement } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import AdsInfo from "./components/ads-info/AdsInfo";
import ReportInfo from "./components/report-info/ReportInfo";
import EditSetpoint from "./components/vhtt/EditSetpoint";
import CreateAccount from "./components/vhtt/CreateAccount";
import AdsMap from "./components/vhtt/AdsMap";
import AdsRequestPage from "./routes/AdsRequestPage";
import AdManagement from "./components/vhtt/AdManagement";
import AdsRequestVHTTPage from "./components/vhtt/ads-request/AdsRequestVHTTPage";
import EditRequestComponent from "./components/vhtt/EditRequestComponent";
const { Header, Sider, Content } = Layout;

const App = () => {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<AdsRequestPage />} />
          <Route path="advertisements" element={<AdsInfo />} />
          <Route path="reports" element={<ReportInfo />} />
        </Route>
        <Route path="vhtt" element={<PageLayoutVHTT />}>
          <Route path="editad" element={<EditAdForm />} />
          {/* <Route path="editpoint" element={<EditSetpoint />} /> */}
          <Route path="adsmap" element={<AdsMap />} />
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="editrequest" element={<EditRequestComponent />} />
        </Route>
      </Routes>
    </div>
  );
};

interface Item {
  key: string;
  icon: ReactElement;
  label: string;
  title: string;
}
interface PageLayoutProps {
  items: Item[];
}
const items: Item[] = [
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
const itemVHTTs: Item[] = [
  {
    key: "1",
    icon: <VideoCameraOutlined />,
    label: "Quản lý",
    title: "/vhtt",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "Quản lý bảng quảng cáo",
    title: "managead",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "Quản lý điểm quảng cáo",
    title: "editpoint",
  },
  {
    key: "4",
    icon: <UploadOutlined />,
    label: "YÊU CẦU CẤP PHÉP",
    title: "requestad",
  },
  {
    key: "5",
    icon: <UploadOutlined />,
    label: "YÊU CẦU CHỈNH SỬA ",
    title: "requesteditad",
  },
];

const PageLayout: React.FC<PageLayoutProps> = ({ items }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout className="min-h-full">
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

const PageLayoutVHTT = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Mắt thần",
      title: "/vhtt/adsmap",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Chỉnh sửa bảng quảng cáo",
      title: "/vhtt/editad",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "Chỉnh sửa điểm quảng cáo",
      title: "/vhtt/editpoint",
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "Thêm tài khoản",
      title: "/vhtt/createaccount",
    },
    {
      key: "5",
      icon: <UploadOutlined />,
      label: "Yêu cầu chỉnh sửa",
      title: "/vhtt/editrequest",
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
          <span className="text-base font-bold text-white"> VHTT</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ fontSize: "16px" }}
          defaultSelectedKeys={["1"]}
          items={items}
          onSelect={({ key }) => {
            const redirectURL = items?.find((item) => item?.key == key)?.title;
            return redirectURL === undefined
              ? navigate("/")
              : navigate(redirectURL);
          }}
        />
      </Sider>
      <Layout style={{ background: "#ffffff" }}>
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
