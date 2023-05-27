import clsx from "clsx";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Team } from "@/slices/teamSlice";
import InputComp from "./InputComp";
import { selectTeamState } from "@/slices/teamSlice";
import FilterBox from "./FilterBox";
import { addTeamPlayer } from "@/slices/teamPlayerSlice";

interface AddTeamModalProps {
  playerId: number | null;
  setPlayerId: Dispatch<SetStateAction<number | null>>;
}

const selectedTabStyles =
  "bg-primary-orange text-slate-50 font-bold px-[1rem] py-[0.4rem] rounded shadow text-sm hover:bg-primary-orange/90";
const selectableTabStyles =
  "border border-grey-400 text-gray-400 font-bold px-[1rem] py-[0.4rem] rounded shadow hover:bg-gray-500 hover:text-slate-50 text-sm";

const AddTeamModal: React.FC<AddTeamModalProps> = ({
  playerId,
  setPlayerId,
}) => {
  const dispatch = useDispatch();
  const teamsState = useSelector(selectTeamState);
  const [filterItems, setFilterItems] = useState<Array<Team>>([]);

  const closeModal = () => {
    setPlayerId(null);
  };

  useMemo(() => {
    setFilterItems(teamsState);
  }, [teamsState]);

  const onChange = (e: any) => {
    const value = e.target?.value;
    const filter = teamsState.filter((item: Team) =>
      item.name.includes(value)
    ) as Array<Team>;
    setFilterItems([...filter]);
  };

  const onSelect = async (id: number | string) => {
    if (id && playerId) {
      await dispatch(
        addTeamPlayer({
          playerId,
          teamId: id,
        })
      );
    }
    closeModal();
  };

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center transition-all duration-[1s] ease z-50",
        playerId ? "bg-black/20 pointer-events-auto" : "pointer-events-none"
      )}
    >
      <form
        onSubmit={() => {}}
        className={clsx(
          "relative bg-white h-max transition-all duration-[1s] ease min-w-[25rem] py-[2rem] px-[2.5rem] rounded pointer-events-auto",
          playerId ? "mt-[5rem]" : "mt-[-100vh]"
        )}
      >
        <button
          type="button"
          className="absolute flex gap-1 items-center top-[0.5rem] right-[0.5rem] text-2xl  text-black font-bold px-2 py-1 rounded"
          onClick={closeModal}
        >
          <AiFillCloseSquare />
        </button>
        <h3 className="font-bold text-2xl text-center">Add team to player</h3>
        <InputComp
          label="Search:"
          name="name"
          hookFormProps={{
            onChange,
          }}
        />
        <FilterBox data={filterItems} onSelect={onSelect} />
      </form>
    </div>
  );
};

export default AddTeamModal;
