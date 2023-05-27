import clsx from "clsx";

interface InputCompProps {
  label: string;
  name: string;
  hookFormProps: any;
  wrapperClass?: string;
  error?: string;
}

const InputComp: React.FC<InputCompProps> = ({
  label,
  name,
  error,
  wrapperClass = "",
  hookFormProps,
}) => {
  return (
    <div className={clsx("mt-5 w-full", wrapperClass)}>
      <div className="flex w-full justify-between mb-1">
        <label className="text-xs font-bold" htmlFor={name}>
          {label}
        </label>
        {error && <span className="text-xs text-red-800">{error}</span>}
      </div>
      <input
        className="flex h-[2.5rem] items-center bg-zinc-100 shadow outline-none px-3 w-full"
        id={name}
        {...hookFormProps}
      />
    </div>
  );
};

export default InputComp;
