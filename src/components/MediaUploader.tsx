"use client";
import React, { useEffect } from "react";
import { useToast } from "@/comp-ui/ui/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Plus } from "lucide-react";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  publicId: string;
  setImage: React.Dispatch<any>;
  image: any;
  type: string;
};

export default function MediaUploader({
  onValueChange,
  publicId,
  setImage,
  image,
  type,
}: MediaUploaderProps) {
  const { toast } = useToast();

  function onUploadSuccessHandler(result: any) {

    console.log(result);
    setImage((prevState) => ({
      ...prevState,
      publicId: result?.info.public_id,
      width: result?.info.width,
      height: result?.info.height,
      secureUrl: result?.info.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Image uploaded successfully",
      description: "1 credit was deducted",
      variant: "default",
      className: "bg-primary",
      duration: 4000,
    });
  }

  function onUploadErrorHandler(error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
      className: "bg-destructive",
      duration: 4000,
    });
  }

  return (
    <CldUploadWidget
      uploadPreset="jsm_imagineer"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold dark:text-white text-black">
            Original
          </h3>
          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-xl">
                <CldImage
                  src={publicId}
                  sizes={"(max-width: 768px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  alt="image"
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-primary/10 object-cover p-2"
                />
              </div>
            </>
          ) : (
            <div
              onClick={() => open()}
              aria-label="Upload image"
              role="button"
              aria-pressed="false"
              className="justify-cente flex h-72 cursor-pointer 
          flex-col gap-5 rounded-[16px] border border-dashed bg-primary-100/10 shadow-inner"
            >
              <div className="rounded-[16px] dark:bg-card bg-white p-5 shadow-sm shadow-primary-200/50 h-full flex gap-4 justify-center flex-col items-center">
                <button className="bg-gradient p-2 rounded-lg aspect-square w-8 flex items-center justify-center  text-lg font-semibold">
                  <Plus className="w-6 h-6" />
                </button>
                <p className="text-center">Click here to upload image</p>
              </div>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}
