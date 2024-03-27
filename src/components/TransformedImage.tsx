'use client';
import { dataUrl, debounce, getImageSize } from "@/lib/utils";
import { Download, Shell } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

export default function TransformedImage({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}) {
  function downloadHandler(e) {}
  console.log(image, transformationConfig);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold dark:text-white text-black">
          Transformed
        </h3>
        {hasDownload && (
          <button
            className="p-14-medium mt-2 flex items-center gap-2 px-2"
            onClick={downloadHandler}
          >
            <Download className="w-6 h-6" />
          </button>
        )}
      </div>
      {(image?.publicId && transformationConfig) ? (
        <div className="relative">
          <CldImage
            src={image?.publicId}
            sizes={"(max-width: 768px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            alt={image?.title}
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-primary/10 object-cover p-2"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000);
            }}
            {...transformationConfig}
          />
          {isTransforming && (
            <div className="flex-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[10px] border bg-background/90">
              <Shell className="w-12 h-12 animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center p-14-medium h-full min-h-72 flex-col gap-5 rounded-2xl border border-dashed bg-card shadow-inner">
          Transformed Image
        </div>
      )}
    </div>
  );
}
