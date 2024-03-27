'use client';
import React from "react";
import CustomField from "../CustomField";
import { Input } from "@/comp-ui/ui/input";

interface RecolorProps {
  form: any;
  onInputChangeHandler: (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void,
  ) => any;
}

export default function Recolor({ form, onInputChangeHandler }: RecolorProps) {
  return (
    <CustomField
      control={form.control}
      name="color"
      formLabel="New color"
      className="w-full"
      render={({ field }) => (
        <Input
          value={field.value}
          className=""
          onChange={(e) =>
            onInputChangeHandler(
              "color",
              e.target.value,
              "recolor",
              field.onChange,
            )
          }
        />
      )}
    />
  );
}
