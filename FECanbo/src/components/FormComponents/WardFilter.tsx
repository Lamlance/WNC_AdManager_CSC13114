import { useLazyGetAllWards } from "../../slices/api/apiSlice";
import { ChangeEvent, useEffect, useRef } from "react";

type PhuongType = { id_phuong: number; ten_phuong: string; id_quan: number };

type GroupByQuan = {
  quan: { id_quan: number; ten_quan: string };
  phuong: PhuongType[];
};

interface WardListProps {
  wardIdsRef: React.MutableRefObject<PhuongType[]>;
  onWardListChange?: (phuong_ids: PhuongType[]) => void;
  showOnlyDistrict?: boolean;
  defaultCheckedWard?: number[];
  defaultCheckedDistrict?: number[];
}

function WardList(props: WardListProps) {
  const [getAllWard, { data }] = useLazyGetAllWards();

  useEffect(() => {
    getAllWard({ id_quan: [1, 3] });
  }, []);

  useEffect(() => {
    if (!data) return;

    if (props.defaultCheckedWard) {
      props.wardIdsRef.current = [
        ...data
          .filter((v) => props.defaultCheckedWard?.includes(v.phuong.id_phuong))
          .map((v) => v.phuong),
      ];
    }

    for (let i = 0; i < data.length; i++) {
      const ele = document.getElementById(`Ward_${data[i].phuong.id_phuong}`);
      if (!ele) continue;
      (ele as HTMLInputElement).checked = !!props.defaultCheckedWard?.includes(
        data[i].phuong.id_phuong,
      );
    }
  }, [props, data]);

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
    if (!data) return;
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
        const selectedWard = data.find((v) => v.phuong.id_phuong === value);
        if (selectedWard)
          props.wardIdsRef.current = [
            ...props.wardIdsRef.current,
            selectedWard.phuong,
          ];
      } else {
        props.wardIdsRef.current = [
          ...props.wardIdsRef.current.filter((v) => v.id_phuong !== value),
        ];
      }
    }

    props.onWardListChange?.(props.wardIdsRef.current);
  }

  function handleOnWardCheck(e: ChangeEvent<HTMLInputElement>) {
    console.log(e);
    if (!data) return;
    const value = parseInt(e.currentTarget.value);
    if (isNaN(value)) return;

    if (e.currentTarget.checked) {
      const selectedWard = data.find((v) => v.phuong.id_phuong === value);
      if (selectedWard)
        props.wardIdsRef.current = [
          ...props.wardIdsRef.current,
          selectedWard.phuong,
        ];
    } else {
      props.wardIdsRef.current = [
        ...props.wardIdsRef.current.filter((v) => v.id_phuong !== value),
      ];
    }

    props.onWardListChange?.(props.wardIdsRef.current);
  }

  return (
    <>
      {Object.values(grpByQuan).map((q) => {
        return (
          <div key={q.quan.id_quan} className=" mb-2">
            <input
              onChange={onParentChecked}
              type="checkbox"
              className=" mb-1 mr-1"
            />
            {q.quan.ten_quan}
            <div
              className={`flex flex-col gap-y-1 ${
                props.showOnlyDistrict ? "hidden" : ""
              }`}
            >
              {q.phuong.map((p) => (
                <span className=" pl-4">
                  <input
                    id={`Ward_${p.id_phuong}`}
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
    </>
  );
}

export default WardList;
