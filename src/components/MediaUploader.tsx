"use client";
import React from "react";
import { useToast } from "@/comp-ui/ui/use-toast";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Plus } from "lucide-react";

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
    toast({
      title: "Image uploaded successfully",
      description: "1 credit was deducted",
      variant: "destructive",
      duration: 4000,
    });
  }

  function onUploadErrorHandler(error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
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
          <h3 className="text-lg font-semibold">Original</h3>
          {publicId ? (
            <></>
          ) : (
            <div
              onClick={() => open()}
              aria-label="Upload image"
              role="button"
              aria-pressed="false"
              className="justify-cente flex h-72 cursor-pointer 
          flex-col gap-5 rounded-[16px] border border-dashed bg-primary-100/20 shadow-inner"
            >
              <div className="rounded-[16px] dark:bg-secondary bg-white p-5 shadow-sm shadow-primary-200/50 h-full flex gap-4 justify-center flex-col items-center">
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
