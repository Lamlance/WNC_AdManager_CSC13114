import type { ColumnsType } from "antd/es/table";
import {
  useGetAllAccountQuery,
  useUpdateAccountMutation,
} from "../../../slices/api/apiSlice";
import { AuthApi } from "@admanager/shared";
import Table from "antd/es/table";
import EditAccountModal from "./EditAccountModal";
import { useState } from "react";

function AccountTable() {
  const { data } = useGetAllAccountQuery();
  const [selectedUser, setSelectedUser] = useState<AuthApi.FullUserData | null>(
    null,
  );

  const [updateAccount] = useUpdateAccountMutation();

  const Columns: ColumnsType<AuthApi.FullUserData> = [
    {
      align: "center",
      title: "Tên tài khoản",
      dataIndex: ["user", "ten_tk"],
      key: "ten_tk",
    },
    {
      align: "center",
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      align: "center",
      title: "Cấp tài khoản",
      dataIndex: ["user", "cap_tk"],
      render: (_r: string, v) => {
        return (
          <>
            {_r === "district"
              ? "Quản lý quận"
              : _r === "ward"
                ? "Quản lý phường"
                : "Sở VH-TT"}
          </>
        );
      },
    },
    {
      title: "Thao tác",
      align: "center",
      width: "20%",
      render: (_r, v) => {
        return (
          <a
            onClick={() => {
              setSelectedUser(v);
            }}
          >
            Chỉnh sửa
          </a>
        );
      },
    },
  ];

  function handleUpdate(value: AuthApi.RegisterRequest) {
    if (!selectedUser) return;
    const wards =
      selectedUser.ward.length !== value.managedWards.length
        ? value.managedWards
        : selectedUser.ward.every((w) =>
              value.managedWards.includes(w.id_phuong),
            )
          ? undefined
          : value.managedWards;
    console.log(wards);
    updateAccount({
      user_id: selectedUser.user.id_tk,
      body: {
        ten_ng_dung: value.name,
        ten_tk: value.username,
        cap_tk: value.accLevel,
        sdt: value.phone,
        email: value.email,
        ward_list: wards,
      },
    });
  }

  return (
    <>
      <EditAccountModal
        handleSubmit={handleUpdate}
        open={!!selectedUser}
        setClose={() => setSelectedUser(null)}
        initalValue={selectedUser || undefined}
      />
      <Table bordered dataSource={data?.data || []} columns={Columns} />
    </>
  );
}

export default AccountTable;
