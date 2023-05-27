import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import InputComp from "./InputComp";

interface Inputs {
  name: string;
  region: string;
  country: string;
}

interface AddStudenModalProps {
  playerId: number;
  setPlayerId: Dispatch<SetStateAction<number | null>>;
}

const selectedTabStyles =
  "bg-primary-orange text-slate-50 font-bold px-[1rem] py-[0.4rem] rounded shadow text-sm hover:bg-primary-orange/90";
const selectableTabStyles =
  "border border-grey-400 text-gray-400 font-bold px-[1rem] py-[0.4rem] rounded shadow hover:bg-gray-500 hover:text-slate-50 text-sm";

const AddStudenModal: React.FC<AddStudenModalProps> = ({
  playerId,
  setPlayerId,
}) => {
  const dispatch = useDispatch();


  const closeModal = () => {
    setPlayerId(null)
  };
  
  
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center transition-all duration-[1s] ease ",
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
          className="absolute top-[0.5rem] right-[0.5rem] text-xl"
          onClick={closeModal}
        >
          <AiFillCloseCircle />
        </button>
        <h3 className="font-bold text-2xl text-center">
          {playerId ? "Edit" : "Create"} Team
        </h3>
        <InputComp
          label="Team Name:*"
          name="name"
          hookFormProps={{
            onChange: (e:any) => {console.log(e)}
          }}
        />
        <div className="flex justify-end gap-2 mt-5 border-t border-t-gray-300 pt-3">
          <button type="submit" className={selectedTabStyles}>
            Save
          </button>
          <button
            type="button"
            className={selectableTabStyles}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudenModal;
