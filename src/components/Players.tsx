"use client";

import clsx from "clsx";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { TbArrowTopCircle } from "react-icons/tb";
import usePlayers from "@/hooks/usePlayers";
import AddTeamModal from "@/components/AddTeamModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Team, selectTeamState } from "@/slices/teamSlice";
import { selectTeamPlayerState } from "@/slices/teamPlayerSlice";
import { TeamPlayer } from "@/slices/teamPlayerSlice";

interface PlayersProps {}

const Players: React.FC<PlayersProps> = () => {
  const players = usePlayers();
  const teamState = useSelector(selectTeamState);
  const teamPlayerState = useSelector(selectTeamPlayerState);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const findTeamNameByPlayerId = (id: number | string) => {
    const teamPlayer = teamPlayerState.find((item:TeamPlayer) => item.playerId == id) as TeamPlayer;
    if(teamPlayer){
      const team = teamState.find((item:Team) => item.id == teamPlayer.teamId);
      if(team){
        return team.name
      }
    }
    return "Add Team"
  }
  return (
    <>
      <AddTeamModal playerId={selectedPlayer} setPlayerId={setSelectedPlayer} />
      <div className="w-full lg:w-[50vw] box-border px-3 md:px-10 lg:mt-[5rem]">
        <h1 className="hidden lg:block font-bold text-lg pb-5">Players</h1>
        <div className="flex flex-col gap-5 w-full h-[83vh] overflow-y-auto box-border">
          {players.data.map((player, index) => (
            <div key={player.id}>
              <div
                className={clsx(
                  "shadow-lg w-full bg-zinc-50 flex overflow-hidden rounded"
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
                    <h3 className="font-semibold box-border ">
                      {player.first_name + " " + player.last_name + " " + player.id}
                    </h3>
                    <div className="flex gap-2">
                      {player.position && (
                        <h5 className="flex items-center text-xs">
                          <span className="min-w-[1.1rem] p-1 h-[1.1rem] flex justify-center items-center bg-slate-800 text-zinc-300 ml-1 rounded">
                            {player.position}
                          </span>
                        </h5>
                      )}
                      {player.height_feet && (
                        <h5 className="flex items-center text-xs">
                          <TbArrowTopCircle /> height:{" "}
                          {player.height_feet
                            ? player.height_feet + "ft"
                            : "empty"}
                        </h5>
                      )}
                      {!player.position && !player.height_feet && (
                        <h5 className="flex items-center text-xs">No data</h5>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      className="flex gap-2"
                      onClick={() => setSelectedPlayer(player.id)}
                    >
                      <FaEdit />
                      <h5 className="font-semibold box-border text-xs">
                        {findTeamNameByPlayerId(player.id)}
                      </h5>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {players.query.data?.meta.next_page && (
            <div ref={players.ref} className="animate-pulse text-center">
              loading...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Players;
