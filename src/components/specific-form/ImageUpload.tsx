import React from "react";
import CustomField from "../CustomField";
import MediaUploader from "../MediaUploader";

export default function ImageUpload({ form, setImage, image, type }) {
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
    </>
  );
}
