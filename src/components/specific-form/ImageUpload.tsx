import React from "react";
import CustomField from "../CustomField";
import MediaUploader from "../MediaUploader";
import TransformedImage from "../TransformedImage";

export default function ImageUpload({
  form,
  setImage,
  image,
  type,
  setIsTransforming,
  transformationConfig,
}) {
  return (
    <>
      <CustomField
        control={form.control}
        name="publicId"
        className="flex flex-col size-full"
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
        isTransforming={setIsTransforming}
        transformationConfig={transformationConfig}
        setIsTransforming={setIsTransforming}
      />
    </>
  );
}
