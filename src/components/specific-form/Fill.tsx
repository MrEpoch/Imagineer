"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/comp-ui/ui/select";
import CustomField from "../CustomField";
import { aspectRatioOptions } from "@/lib/constant";

interface FillFieldProps {
  form: any;
  onSelectFieldHandler: any;
}

export default function FillField({
  form,
  onSelectFieldHandler,
}: FillFieldProps) {
  return (
    <CustomField
      render={({ field }: any) => (
        <Select
          onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
        >
          <SelectTrigger
            className="border-0 bg-transparent text-dark-600 w-full placeholder:text-dark-400 h-[50px] p-16-medium 
          focus-visible:ring-offset-0 p-3 focus-visible:ring-transparent"
          >
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent className="">
            {Object.keys(aspectRatioOptions).map((k) => (
              <SelectItem
                key={k}
                value={k}
                className="
            p-16-semibold text-dark-700 cursor-pointer transition-all px-8 py-3 
            rounded-none outline-none hover:border-none focus-visible:ring-transparent 
            hover:text-white hover:bg-purple-gradient hover:bg-cover focus-visible:ring-offset-0 focus-visible:outline-none"
              >
                {aspectRatioOptions[k as keyof typeof aspectRatioOptions].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      name="aspectRatio"
      formLabel="Aspect Ratio"
      className="w-full"
      control={form.control}
    />
  );
}
