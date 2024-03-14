import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends ComponentProps<"input"> {
  // label: string;
  name: string;
}

export function Input({ name, ...rest }: Props) {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col my-6">
      {/* <label className="text-white text-sm">{label}</label> */}
      <input
        {...rest}
        {...register(name)}
        className="px-2 py-1 text-black rounded-md border border-cyan-200"
      />
    </div>
  );
}
