"use client";
import { Button } from "@/comp-ui/ui/button";
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious } from "@/comp-ui/ui/pagination";
import { collectionSvg, transformationTypes } from "@/lib/constant";
import { formUrlQuery } from "@/lib/utils";
import { Image as ImagePrisma } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Search from "./Search";

interface CollectionProps {
  hasSearch?: boolean;
  images?: ImagePrisma[];
  totalPages?: number;
  page?: number;
}

export default function Collection({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: CollectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onPageChange(action: string) {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  }

  return (
    <>
      <div className="md:flex-row flex md:justify-between md:items-center flex-col mb-6 gap-5">
        <h2 className="text-3xl font-bold">Recent Edits</h2>
    {hasSearch && <Search />}
      </div>
      {images && images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-1 xl:grid-cols-3">
          {images.map((image) => (
            <ImgCard key={image.id} image={image} />
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-3xl font-bold">No Images Found</p>
        </div>
      )}

    {totalPages > 1 && 
    <Pagination className="mt-10">
      <PaginationContent className="flex w-full">
        <Button
      disabled={Number(page) <= 1}
      className="px-6 py-4 flex items-center justify-center gap-3 rounded-full text-sm font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent
        w-32 bg-gradient bg-cover text-white
      "
      onClick={() => onPageChange("prev")}
      >
        <PaginationPrevious className="hover:bg-transparent hover:text-white"></PaginationPrevious>
      </Button>
      <p className="flex items-center justify-center text-sm font-medium w-fit flex-1">{page} / {totalPages}</p>
      <Button
      className="px-6 py-4 flex items-center justify-center gap-3 rounded-full text-sm font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent
      w-32 bg-gradient bg-cover text-white"
      onClick={() => onPageChange("next")}
      disabled={Number(page) >= totalPages}
      >
        <PaginationNext className="hover:bg-transparent hover:text-white" />
      </Button>
      </PaginationContent>
    </Pagination>}
    </>
  );
}

function ImgCard({ image }: { image: ImagePrisma }) {
  const SvgIcon =
    collectionSvg[Object.values(transformationTypes).filter(t => t.type === image.transformationType)[0].type];

  return (
    <li>
      <Link
        href={`/transformation/${image.id}`}
        className="flex flex-1 cursor-pointer flex-col gap-5 rounded-2xl border-2 border-primary/15 
    dark:border-primary bg-white dark:bg-card p-4 shadow-xl shadow-primary/10 dark:shadow-primary/60 
    transition-all hover:shadow-primary/20 dark:hover:shadow-primary/70"
      >
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config as Object}
          loading="lazy"
          className="h-52 w-full rounded-xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="justify-between items-center flex">
          <p className="20 line-clamp-1 text-sm font-medium text-gray-900 mr-3 dark:text-white">
            {image.title}
          </p>
          {SvgIcon && <SvgIcon className="w-6 h-6" />}
        </div>
      </Link>
    </li>
  );
}
