import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Team, createTeam, editTeam } from "@/slices/teamSlice";
import InputComp from "./InputComp";

interface Inputs {
  name: string;
  region: string;
  country: string;
}

interface TeamModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  editValue: Team | null;
  setEditValue: Dispatch<SetStateAction<Team | null>>;
}

const selectedTabStyles =
  "bg-primary-orange text-slate-50 font-bold px-[1rem] py-[0.4rem] rounded shadow text-sm hover:bg-primary-orange/90";
const selectableTabStyles =
  "border border-grey-400 text-gray-400 font-bold px-[1rem] py-[0.4rem] rounded shadow hover:bg-gray-500 hover:text-slate-50 text-sm";

const TeamModal: React.FC<TeamModalProps> = ({
  showModal,
  setShowModal,
  editValue,
  setEditValue,
}) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Team name is required"),
    country: Yup.string().required("Country field is required"),
    region: Yup.string().required("Region field is required"),
  });
  const { handleSubmit, formState, reset, register, setValue } =
    useForm<Inputs>({
      resolver: yupResolver(validationSchema),
    });
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setEditValue(null);
      reset();
    }, 1000);
  };
  const handleCreateTeam: SubmitHandler<Inputs> = async (data) => {
    if (editValue) {
      await dispatch(editTeam({...editValue, ...data}));
    } else {
      await dispatch(createTeam(data));
    }

    closeModal();
  };
  useEffect(() => {
    if (showModal && editValue) {
      setValue("name", editValue.name);
      setValue("country", editValue.country);
      setValue("region", editValue.region);
    }
  }, [editValue, showModal]);
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center transition-all duration-[1s] ease ",
        showModal ? "bg-black/20 pointer-events-auto" : "pointer-events-none"
      )}
    >
      <form
        onSubmit={handleSubmit(handleCreateTeam)}
        className={clsx(
          "relative bg-white h-max transition-all duration-[1s] ease min-w-[25rem] py-[2rem] px-[2.5rem] rounded pointer-events-auto",
          showModal ? "mt-[5rem]" : "mt-[-100vh]"
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
          {editValue ? "Edit" : "Create"} Team
        </h3>
        <InputComp
          label="Team Name:*"
          name="name"
          hookFormProps={register("name", {
            required: true,
          })}
          error={formState?.errors?.name?.message}
        />
        <InputComp
          label="Country:*"
          name="country"
          hookFormProps={register("country", {
            required: true,
          })}
          error={formState?.errors?.country?.message}
        />
        <InputComp
          label="Region:*"
          name="region"
          hookFormProps={register("region", {
            required: true,
          })}
          error={formState?.errors?.region?.message}
        />
        <div className="flex justify-end gap-2 mt-5 border-t border-t-gray-300 pt-3">
          <button type="submit" className={selectedTabStyles}>
            { editValue ? "Edit" : "Create"}
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

export default TeamModal;
