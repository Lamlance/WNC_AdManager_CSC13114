import { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import { ReactElement } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import AdsInfo from "./components/ads-info/AdsInfo";
import ReportInfo from "./components/report-info/ReportInfo";
import CreateAccount from "./components/vhtt/CreateAccount";
import AdsRequestPage from "./routes/AdsRequestPage";
import AdManagement from "./components/vhtt/AdManagement";
import AdsRequestVHTTPage from "./components/vhtt/ads-request/AdsRequestVHTTPage";
import EditRequest from "./components/vhtt/requestedit-ads/EditRequest";
import EditRequestComponent from "./components/vhtt/EditRequestComponent";
import AdsMethodPage from "./routes/AdsMethodPage";
import ReportTypeComponent from "./components/vhtt/ReportTypeComponent";
import EditUserInfo from "./components/user/EditUserInfo";
import ResolveReport from "./routes/ResolveReport";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import ForgotPasswordPage from "./routes/ForgotPassword";
import VerifyAccountPage from "./routes/VerifyAccountPage";
import { useAppSelector } from "./hooks";
import AccountManager from "./routes/AccountManager";

const { Header, Sider, Content } = Layout;
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
  {
    key: "4",
    icon: <UploadOutlined />,
    label: "Chỉnh sửa thông tin cá nhân",
    title: "/user",
  },
];
const itemVHTTs: Item[] = [
  {
    key: "1",
    icon: <VideoCameraOutlined />,
    label: "Quản lý bảng quảng cáo",
    title: "/vhtt",
  },
  {
    key: "4",
    icon: <UploadOutlined />,
    label: "Yêu cầu cấp phép QC",
    title: "/vhtt/requestad",
  },
  {
    key: "5",
    icon: <UploadOutlined />,
    label: "Yêu cầu chỉnh sửa QC",
    title: "/vhtt/edit-ad-request",
  },
  {
    key: "6",
    icon: <UploadOutlined />,
    label: "Yêu cầu chỉnh sửa địa điểm",
    title: "/vhtt/edit-place-request",
  },
  {
    key: "7",
    icon: <UploadOutlined />,
    label: "Quản lý hình thức quảng cáo",
    title: "/vhtt/manage-ad-method",
  },
  {
    key: "2",
    icon: <UploadOutlined />,
    label: "Các loại hình thức báo cáo",
    title: "/vhtt/reporttype",
  },
  {
    key: "8",
    icon: <UserAddOutlined />,
    label: "Thêm tài khoản cán bộ",
    title: "/vhtt/register",
  },
  {
    key: "9",
    icon: <UserOutlined />,
    label: "Quản lí tài khoản cán bộ",
    title: "/vhtt/accounts",
  },
];
const App = () => {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<PageLayout items={items} />}>
          <Route index element={<AdsRequestPage />} />
          <Route path="advertisements" element={<AdsInfo />} />
          <Route path="reports" element={<ReportInfo />} />
          <Route path="user" element={<EditUserInfo />} />
          <Route path="resolve/:report_id?" element={<ResolveReport />} />
        </Route>
        <Route path="vhtt" element={<PageLayout items={itemVHTTs} />}>
          <Route index element={<AdManagement />} />
          <Route path="requestad" element={<AdsRequestVHTTPage />} />
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="edit-ad-request" element={<EditRequest />} />
          <Route path="edit-place-request" element={<EditRequestComponent />} />
          <Route path="manage-ad-method" element={<AdsMethodPage />} />
          <Route path="reporttype" element={<ReportTypeComponent />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="accounts" element={<AccountManager />} />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify-account" element={<VerifyAccountPage />} />
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

const PageLayout: React.FC<PageLayoutProps> = ({ items }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const authUser = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log(authUser);
  }, [authUser]);

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
        <Header
          style={{ padding: 0, background: "#ffffff" }}
          className=" flex flex-row justify-between align-middle"
        >
          <div>
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
          </div>

          <div className=" pr-8">
            {!authUser.isLoggedIn ? (
              <Link to={"/auth/login"}>LOGIN</Link>
            ) : (
              <p>{`Hello user ${authUser.user.username}`}</p>
            )}
          </div>
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
