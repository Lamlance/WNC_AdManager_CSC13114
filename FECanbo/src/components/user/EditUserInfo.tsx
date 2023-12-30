import { Button, DatePicker, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";

type UserFormValue = {
  ho_va_ten: string;
  ngay_sinh: dayjs.Dayjs;
  email: string;
  dien_thoai: string;
};

type FormInputElement = {
  label: string;
  name?: keyof UserFormValue;
  render: JSX.Element;
};

function EditUserInfo() {
  function onFormFinish(data: UserFormValue) {
    console.log(data.ngay_sinh.toDate());
  }

  const inputEle: FormInputElement[] = [
    { label: "Họ và tên", name: "ho_va_ten", render: <Input /> },
    { label: "Ngày sinh", name: "ngay_sinh", render: <DatePicker /> },
    { label: "Email", name: "email", render: <Input /> },
    { label: "Điện thoại", name: "dien_thoai", render: <Input /> },
  ];

  return (
    <div>
      <Form onFinish={onFormFinish}>
        <table className=" min-w-[50%] table-auto border-separate border-spacing-y-4  ">
          <tbody>
            {inputEle.map((v) => (
              <tr>
                <td>{v.label}</td>
                <td>
                  <FormItem<UserFormValue> name={v.name} className="m-0 p-0">
                    {v.render}
                  </FormItem>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Cập nhập
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}

export default EditUserInfo;
