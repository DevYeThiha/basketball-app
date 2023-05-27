"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Players from "@/components/Players";
import Teams from "@/components/Teams";
import { selectTabState, setTabState } from "@/slices/tabSlice";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import clsx from "clsx";
import { GiHamburgerMenu } from "react-icons/gi";

const selectedTab =
  "bg-primary-orange text-slate-50 font-bold px-5 py-2 rounded shadow cursor-not-allowed";
const selectableTab =
  "border border-primary-orange text-[#111] font-bold px-5 py-2 rounded shadow hover:bg-primary-orange hover:text-slate-50";

export default function Home() {
  const tabState = useSelector(selectTabState);
  const { handleLogout } = useContext(AuthContext);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <div className="flex flex-col justify-center lg:hidden">
        <h3 className="w-full text-center font-bold text-2xl py-2">
          Basket Ball App
        </h3>
        <div className="mt-1 flex justify-center gap-2 text-sm mb-3">
          <button
            className={clsx(tabState == "player" ? selectedTab : selectableTab)}
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
      </div>
      <div className="min-w-full min-h-full flex lg:px-[5rem]">
        {tabState == "player" ? <Players /> : <Teams />}

        <div className="hidden lg:flex w-[50vw]">
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

      <div className="absolute flex lg:hidden w-[2.5rem] h-[2.5rem] justify-center items-center rounded bg-black top-[1.5rem] right-[1.5rem] shadow text-white" onClick={handleLogout}>
        <FiLogOut />
      </div>
    </div>
  );
}
