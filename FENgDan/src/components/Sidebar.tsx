import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
// import AdsDetail from "./AdsDetail";
import AdsInfor from "./AdsInfor";
import AdsMap from "./AdsMap";

const { Header, Sider, Content } = Layout;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function onAdMarkerClick() {}

  return (
    <div>
      <Layout className="z-10 bg-transparent">
        <Sider
          className={`${collapsed ? "hidden" : "visible"}`}
          trigger={null}
          collapsible
          collapsed={false}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Dữ liệu quảng cáo",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Dữ liệu báo cáo",
              },
            ]}
          />
        </Sider>
        <Layout className=" bg-transparent">
          <Header style={{ padding: 0 }} className=" bg-transparent">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
        </Layout>
      </Layout>
      <div className=" absolute bottom-0 left-0 right-0 top-0 -z-10">
        <AdsMap onAdMarkerClick={onAdMarkerClick} />
      </div>
    </div>
  );
}

export default Sidebar;
