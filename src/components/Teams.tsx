"use client";

import clsx from "clsx";
import Image from "next/image";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
import usePlayers from "@/hooks/usePlayers";
import { useDispatch, useSelector } from "react-redux";
import { Team, deleteTeam, selectTeamState } from "@/slices/teamSlice";
import TeamModal from "@/components/TeamModal";
import { useState } from "react";
import { TeamPlayer, selectTeamPlayerState } from "@/slices/teamPlayerSlice";

interface PlayersProps {}

const Teams: React.FC<PlayersProps> = () => {
  const teamsState = useSelector(selectTeamState);
  const teamPlayerState = useSelector(selectTeamPlayerState);
  const dispatch = useDispatch();
  const [editValue, setEditValue] = useState<Team | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleEdit = (team: Team) => {
    setEditValue(team);
    setShowModal(true);
  };

  const getTotalPlayerByTeamId = (id: number |string) => {
    const players = teamPlayerState.filter((item:TeamPlayer) => item.teamId == id);
    return players.length;
  }
  return (
    <>
      <TeamModal
        showModal={showModal}
        editValue={editValue}
        setEditValue={setEditValue}
        setShowModal={setShowModal}
      />
      <div className="relative w-full lg:w-[50vw] box-border px-3 md:px-10 lg:mt-[5rem]">
        <div className="w-full flex justify-between">
          <h1 className="hidden lg:block font-bold text-lg pb-5 max-w">Teams</h1>
          <button
            className="hidden lg:block bg-primary-orange text-slate-50 font-bold text-sm px-5 py-[0.35rem] h-max rounded shadow"
            type="button"
            onClick={() => setShowModal(true)}
          >
            create
          </button>
        </div>
        <div className="flex flex-col gap-5 w-full h-[83vh] overflow-y-auto box-border">
          {teamsState.map((team: any, index: number) => (
            <div key={team.id}>
              <div
                className={clsx(
                  "shadow-lg w-full bg-zinc-50 flex overflow-hidden rounded transition-all 1s ease"
                )}
              >
                <div className="image-container w-[5rem] overflow-hidden bg-primary-orange flex items-center">
                  <Image
                    src="/basket-ball-icon.png"
                    className="aspect-square"
                    alt="basket-ball-icon"
                    fill
                  />
                </div>
                <div className="flex w-full h-full box-border justify-between px-5 py-2">
                  <div className="flex flex-col justify-between min-h-[3em]">
                    <h3 className="font-semibold box-border ">{team.name}</h3>
                    <div className="flex gap-2">
                      <h5 className="flex items-center text-xs">
                        <IoLocationSharp />
                        {team.country}, {team.region}
                      </h5>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button
                      className="flex gap-1"
                      onClick={() => {
                        handleEdit(team);
                      }}
                    >
                      <FaEdit />
                      <h5 className="font-semibold box-border text-xs">Edit</h5>
                    </button>
                    <div>
                      <RxDividerVertical />
                    </div>
                    <button
                      className="flex gap-1"
                      onClick={() =>
                        dispatch(
                          deleteTeam({
                            id: team.id,
                          })
                        )
                      }
                    >
                      <MdDelete />
                      <h5 className="font-semibold box-border text-xs">
                        Delete
                      </h5>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
            className="absolute flex justify-center items-center lg:hidden bg-primary-orange text-slate-50 font-bold p-[1rem] rounded-full w-[3rem] h-[3rem] bottom-[2rem] right-[2rem] shadow"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="text-2xl"/>
          </button>
      </div>
    </>
  );
};

export default Teams;
