interface FilterBoxData{
    id: number | string;
    name: string;
}

interface FilterBoxProps {
    data: Array<FilterBoxData>;
    onSelect: (id: number | string) => void;
}

const FilterBox: React.FC<FilterBoxProps> = ({data, onSelect}) => {
  return (
    <div className="w-full bg-slate-400 h-[10rem] mt-3 shadow rounded overflow-y-auto p-2 flex flex-col gap-[0.5rem]">
      {data.map((item) => (
        <div
          className="w-full p-2 bg-zinc-100 rounded flex justify-between group cursor-pointer"
          key={item.id}
          onClick={() => onSelect(item.id)}
        >
          <span className="text-sm font-bold">{item.name}</span>
          <div className="bg-black/20 group-hover:bg-black text-white text-xs px-2 rounded flex items-center">
            select
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterBox;
