import Image from 'next/image'

const selectedTab =
  "bg-primary-orange text-slate-50 font-bold px-5 py-2 rounded shadow cursor-not-allowed";
const selectableTab =
  "border border-primary-orange text-[#111] font-bold px-5 py-2 rounded shadow hover:bg-primary-orange hover:text-slate-50";

export default function Home() {
  return (
    <div>
      <div className="min-w-full min-h-full flex px-[5rem]">
        <div className="w-[50vw] box-border px-10 mt-[5rem]"></div>
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
              <button className={true ? selectedTab : selectableTab}>
                Players
              </button>
              <button className={false ? selectedTab : selectableTab}>
                Teams
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
