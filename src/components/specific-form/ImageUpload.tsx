"use client";
import React from "react";
import CustomField from "../CustomField";
import MediaUploader from "../MediaUploader";
import TransformedImage from "../TransformedImage";

export default function ImageUpload({
  form,
  image,
  isTransforming,
  type,
  setIsTransforming,
  transformationConfig,
  setImage,
}) {
  return (
    <>
      <CustomField
        control={form.control}
        name="publicId"
        className="flex flex-col w-full h-full"
        render={({ field }) => (
          <MediaUploader
            onValueChange={field.onChange}
            setImage={setImage}
            publicId={field.value}
            image={image}
            type={type}
          />
        )}
      />
      <TransformedImage
        image={image}
        type={type}
        title={form.getValues().title}
        isTransforming={isTransforming}
        transformationConfig={transformationConfig}
        setIsTransforming={setIsTransforming}
      />
    </>
  );
}
