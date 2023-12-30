import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useLazyGetAllWards } from "../../slices/api/apiSlice";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Checkbox } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

type GroupByQuan = {
  quan: { id_quan: number; ten_quan: string };
  phuong: { id_phuong: number; ten_phuong: string; id_quan: number }[];
};

interface WardCheckBoxListProps {
  onWardListChange?: (phuong_ids: number[]) => void;
}

function WardCheckBoxList(props: WardCheckBoxListProps) {
  const [getAllWard, { data }] = useLazyGetAllWards();
  const phuongIdList = useRef<number[]>([]);

  const [showList, setShowList] = useState<boolean>(false);
  const [validFilter, setValidFilter] = useState<boolean>(false);

  useEffect(() => {
    getAllWard({ id_quan: [1, 3] });
  }, []);

  const grpByQuan = (data || []).reduce(
    (acum, value) => {
      if (acum[value.quan.id_quan]) {
        acum[value.quan.id_quan].phuong.push(value.phuong);
      } else {
        acum[value.quan.id_quan] = { quan: value.quan, phuong: [value.phuong] };
      }
      return acum;
    },
    {} as { [key: number]: GroupByQuan },
  );

  function onParentChecked(e: ChangeEvent<HTMLInputElement>) {
    const element = e.currentTarget;

    if (!element || !element.parentElement) return;
    const childInput: NodeListOf<HTMLInputElement> = element.parentElement
      .getElementsByTagName("div")?.[0]
      ?.querySelectorAll("span > input");
    for (let i = 0; i < childInput.length; i++) {
      childInput[i].checked = element.checked;

      const value = parseInt(childInput[i].value);
      if (isNaN(value)) continue;
      if (element.checked) {
        phuongIdList.current.push(value);
      } else {
        phuongIdList.current = [
          ...phuongIdList.current.filter((v) => v !== value),
        ];
      }
    }

    setValidFilter(phuongIdList.current.length > 0);
    props.onWardListChange?.(phuongIdList.current);
  }

  function handleOnWardCheck(e: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.currentTarget.value);
    if (isNaN(value)) return;

    if (e.currentTarget.checked) {
      phuongIdList.current.push(value);
    } else {
      phuongIdList.current = phuongIdList.current.filter((v) => v !== value);
    }

    setValidFilter(phuongIdList.current.length > 0);
    props.onWardListChange?.(phuongIdList.current);
  }

  return (
    <div className="absolute -top-2 overflow-scroll">
      <span>
        <Button
          type={validFilter ? "primary" : "default"}
          onClick={() => setShowList(!showList)}
          className=" h-8"
        >
          <div>
            <span className=" mr-2">Lọc theo phường</span>
            {showList ? (
              <UpOutlined className=" align-middle" />
            ) : (
              <DownOutlined className=" align-middle" />
            )}
          </div>
        </Button>
      </span>

      <div
        className={`mt-1 max-h-72 overflow-scroll border border-zinc-500 bg-white p-4 ${
          showList ? "" : "hidden"
        }`}
      >
        {Object.values(grpByQuan).map((q) => {
          return (
            <div key={q.quan.id_quan} className=" mb-2">
              <input
                onChange={onParentChecked}
                type="checkbox"
                className=" mb-1 mr-1"
              />
              {q.quan.ten_quan}
              <div className="flex flex-col gap-y-1">
                {q.phuong.map((p) => (
                  <span className=" pl-4">
                    <input
                      onChange={handleOnWardCheck}
                      type="checkbox"
                      value={p.id_phuong}
                      className=" mr-1"
                    />
                    {p.ten_phuong}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WardCheckBoxList;
