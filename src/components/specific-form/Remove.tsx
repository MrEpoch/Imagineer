'use client';
import React from "react";
import CustomField from "../CustomField";
import { Input } from "@/comp-ui/ui/input";

interface removeProps {
  form: any;
  type: string;
  onInputChangeHandler: (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void,
  ) => any;
}

export default function Remove({
  form,
  type,
  onInputChangeHandler,
}: removeProps) {
  return (
    <>
      <CustomField
        control={form.control}
        name="prompt"
        formLabel={type === "remove" ? "Object ro remove" : "Object to recolor"}
        className="w-full"
        render={({ field }) => (
          <Input
            value={field.value}
            className=""
            onChange={(e) =>
              onInputChangeHandler(
                "prompt",
                e.target.value,
                type,
                field.onChange,
              )
            }
          />
        )}
      />
    </>
  );
}
