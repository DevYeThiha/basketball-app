"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Players from "@/components/Players";
import Teams from "@/components/Teams";
import { selectTabState, setTabState } from "@/slices/tabSlice";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

// https://github.com/czetsuya/nextjs-redux-toolkit

const selectedTab =
  "bg-primary-orange text-slate-50 font-bold px-5 py-2 rounded shadow cursor-not-allowed";
const selectableTab =
  "border border-primary-orange text-[#111] font-bold px-5 py-2 rounded shadow hover:bg-primary-orange hover:text-slate-50";

export default function Home() {
  const tabState = useSelector(selectTabState);
  const { handleLogout } = useContext(AuthContext);
  const dispatch = useDispatch();

  return (
    <div>
      {/* <Link href="/another-page">Another Page</Link>
      <div>{authState ? "Logged in" : "Not Logged In"}</div> */}
      <div className="min-w-full min-h-full flex px-[5rem]">
        {tabState == "player" ? <Players /> : <Teams />}

        <div className="flex w-[50vw]">
          <div className="flex flex-col w-full items-center mt-[3.5rem] h-max">
            <div className="image-container w-[10rem] h-[10rem] overflow-hidden bg-primary-orange flex items-center rounded-lg shadow-lg">
              <Image
                src="/basket-ball-icon.png"
                className="aspect-square"
                alt="basket-ball-icon"
                fill
              />
            </div>
            <h5 className="mt-5 text-lg font-bold">Basketball App</h5>
            <div className="mt-5 flex gap-2">
              <button
                className={tabState == "player" ? selectedTab : selectableTab}
                onClick={() => {
                  dispatch(setTabState("player"));
                }}
              >
                Players
              </button>
              <button
                className={tabState == "team" ? selectedTab : selectableTab}
                onClick={() => {
                  dispatch(setTabState("team"));
                }}
              >
                Teams
              </button>
            </div>
            <button
              className="mt-[3rem] flex gap-3 items-center font-bold hover:text-primary-orange"
              type="button"
              onClick={handleLogout}
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
