import React from "react";
import { Select, Space, Input, Button, } from "antd";
const { Option } = Select;
import { SearchOutlined } from "@ant-design/icons";

function EditAdForm() {
  const status = ["Đã quy hoạch", "Chưa quy hoạch"];
  const billboard = [
    ["Chợ", "cau ket gian duong dai dao", "da quy hoach"],
    ["Chợ", "buon lau vu khi", "da quy hoach"],
    ["Chợ", "day ba gia xuong bien", "da quy hoach"],
    ["Chợ", "hiep dam 1 con heo", "da quy hoach"],
    ["Chợ", "Lâu gòi k gặp cháu lớn như vậy rồi hả, qua đây chú ôm cái đi , chú nhớ con quá đi", "chau tinh tri"],
  ];

  return (
    <div className="bg-gray-500">
      <div className="mx-auto my-auto w-8/12 rounded-lg bg-white">
        <div className="mr-4 cursor-pointer text-right text-3xl font-semibold ">
          x
        </div>
        <h1 className=" mb-10 mt-5 text-center text-3xl font-semibold">
          CHỈNH SỬA ĐIỂM QUẢNG CÁO
        </h1>

        <div className="mx-10 mb-5" >
          <div className=" flex w-full">
            <div className="w-1/5 font-bold text-base pt-2 "> Địa chỉ : </div>
            <Input className="w-4/5"></Input>
          </div>
        </div>
        <div className="mx-10 mb-5 flex justify-between" >
          <div className=" flex w-1/2">
            <div className="w-2/5 font-bold text-base pt-2 "> Vị trí : </div>
            <Input className="w-1/2"></Input>
            <Button className="w-1/12 p-0 pb-2 justify-center items-center"><SearchOutlined /></Button>
          </div>
          <div className="flex w-5/12 justify-end">
            <div className="w-1/3 font-bold text-base pt-2 "> Trạng thái : </div>
            <Space.Compact className=" w-1/2">
              <Select defaultValue="" style={{ width: "100%" }}>
                {status.map((value) => {
                  return (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Space.Compact>
          </div>
        </div>
        <div className="mx-10 mb-5" >
          <div className=" flex w-full">
            <div className="w-1/5 font-bold text-base pt-2 "> Số biển quảng cáo : </div>
            <Input className="w-10" value={billboard.length}></Input>
            <div className="w-1/5 font-bold text-base pt-2 ml-4"> biển </div>
          </div>
        </div>
        <div className="mx-10" >
          <div className=" flex w-full">
            <div className="w-1/5 font-bold text-base"> Các biển quảng cáo : </div>
            <div className="w-4/5">
              <section className="container mx-auto">
                <div className="w-full mb-8 overflow-hidden shadow-lg">
                  <div className="w-full overflow-x-auto border-2 rounded-lg border-black">
                    <table className="w-full text-center">
                      <thead>
                        <tr className=" text-center bg-gray-400">
                          <th className="py-3 w-1/5">Loại quảng cáo</th>
                          <th className="py-3 w-5/12 border-x border-black">Thông tin chung</th>
                          <th className="py-3 w-1/5 border-x border-black">Trạng thái</th>
                          <th className="py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {billboard.map((value) => {
                          return (
                            <>
                              <tr className="text-gray-700 border-t border-black">
                                <td className=" px-2 py-2 "> {value[0]} </td>
                                <td className=" px-2 py-2 text-left border-x border-black"> {value[1]} </td>
                                <td className=" px-2 py-2 border-x border-black"> {value[2]} </td>
                                <td><a className=" px-2 py-2 text-blue-600" href="https://www.w3schools.com"> Chi tiết </a></td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="mx-10 mb-5 flex justify-end">
          <Button type="primary">Thêm biển </Button>
      </div>


      <div className="mt-5 flex items-center justify-center">
        <Button type="primary">Hoàn thành </Button>
      </div>
    </div>
    </div >
  );
}

export default EditAdForm;