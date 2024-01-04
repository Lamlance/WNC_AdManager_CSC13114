import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useLazyGetAllWards } from "../../slices/api/apiSlice";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Checkbox } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import WardList from "./WardFilter";

interface WardCheckBoxListProps {
  onWardListChange?: (phuong_ids: number[]) => void;
}

function WardCheckBoxList(props: WardCheckBoxListProps) {
  const phuongIdList = useRef<number[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  const [validFilter, setValidFilter] = useState<boolean>(false);

  function onWardListChange(phuong_id: number[]) {
    setValidFilter(!!phuong_id.length);
    props.onWardListChange?.(phuong_id);
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
        <WardList
          wardIdsRef={phuongIdList}
          onWardListChange={onWardListChange}
        />
      </div>
    </div>
  );
}

export default WardCheckBoxList;
