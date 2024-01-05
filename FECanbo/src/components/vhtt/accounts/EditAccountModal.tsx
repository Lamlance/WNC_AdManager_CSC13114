import { Modal } from "antd";
import RegisterForm from "../../auth/RegisterForm";
import { AuthApi } from "@admanager/shared";

interface EditAccountModalProps {
  open: boolean;
  setClose: () => void;
  initalValue?: AuthApi.FullUserData;
  handleSubmit?: (value: AuthApi.RegisterRequest) => void;
}

function EditAccountModal(props: EditAccountModalProps) {
  function handleFormSubmit(value: AuthApi.RegisterRequest) {
    props.handleSubmit?.(value);
  }
  return (
    <Modal
      open={props.open}
      onCancel={props.setClose}
      style={{
        minWidth: "80vw",
      }}
    >
      <RegisterForm
        overrideSubmit={handleFormSubmit}
        initalValue={{
          name: props.initalValue?.user.ten_ng_dung,
          email: props.initalValue?.user.email,
          phone: props.initalValue?.user.sdt,
          username: props.initalValue?.user.ten_tk,
          accLevel: props.initalValue?.user.cap_tk as
            | "ward"
            | "district"
            | "department",
        }}
        checkedWardId={props.initalValue?.ward.map((v) => v.id_phuong)}
      />
    </Modal>
  );
}

export default EditAccountModal;
