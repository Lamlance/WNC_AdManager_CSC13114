import { useLazyGetAllWards } from "../../slices/api/apiSlice";
import { ChangeEvent, useEffect, useRef } from "react";

type GroupByQuan = {
  quan: { id_quan: number; ten_quan: string };
  phuong: { id_phuong: number; ten_phuong: string; id_quan: number }[];
};

interface WardListProps {
  wardIdsRef: React.MutableRefObject<number[]>;
  onWardListChange?: (phuong_ids: number[]) => void;
}

function WardList(props: WardListProps) {
  const [getAllWard, { data }] = useLazyGetAllWards();

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
        props.wardIdsRef.current = [...props.wardIdsRef.current, value];
      } else {
        props.wardIdsRef.current = [
          ...props.wardIdsRef.current.filter((v) => v !== value),
        ];
      }
    }

    props.onWardListChange?.(props.wardIdsRef.current);
  }

  function handleOnWardCheck(e: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.currentTarget.value);
    if (isNaN(value)) return;

    if (e.currentTarget.checked) {
      props.wardIdsRef.current = [...props.wardIdsRef.current, value];
    } else {
      props.wardIdsRef.current = [
        ...props.wardIdsRef.current.filter((v) => v !== value),
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
    </>
  );
}

export default WardList;
