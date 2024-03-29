"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { redirect } from "next/navigation";
import { AddImageParams } from "@/types/index";

import { v2 as cloudinary } from "cloudinary";

export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    const author = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!author) throw new Error("User not found");

    const newImage = await prisma.image.create({
      data: {
        ...image,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (e) {
    throw new Error("Failed to add image: " + e);
  }
}

export async function updateImage({ image, userId, path }) {
  try {
    const author = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!author) throw new Error("User not found");

    const updatedImage = await prisma.image.update({
      where: {
        id: image.id,
        authorId: userId,
      },
      data: {
        ...image,
      },
    });

    if (!updatedImage) throw new Error("Image not found");

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (e) {
    throw new Error("Failed to update image: " + e);
  }
}

export async function deleteImage({ image, userId, path }) {
  try {
    const author = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!author) throw new Error("User not found");

    const deletedImage = await prisma.image.delete({
      where: {
        id: image.id,
        authorId: userId,
      },
    });
    if (!deletedImage) throw new Error("Image not found");
  } catch (e) {
    throw new Error("Failed to delete image: " + e);
  } finally {
    redirect("/");
  }
}

export async function getImageById({ image, userId, path }) {
  try {
    const author = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!author) throw new Error("User not found");

    const getImage = await prisma.image.findUnique({
      where: {
        id: image.id,
        authorId: userId,
      },
      include: {
        author: true,
      }
    });

    if (!getImage) throw new Error("Image not found");

    revalidatePath(path);

    return JSON.parse(JSON.stringify(getImage));
  } catch (e) {
    throw new Error("Failed to get image: " + e);
  }
}

export async function getAllImages({ limit = 9, page = 1, searchQuery = "" }: {
  limit?: number;
  page: number;
  searchQuery?: string;
}) {
  try {

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secret: true
    });

    let expression = "folder=imagineer";

    if (searchQuery) expression += ` AND ${searchQuery}`
    
    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourceId = resources.map(resource => resource.public_id);

    let query = {};

    if (searchQuery) query = {
      publicId: {
        in: resourceId
      }
    }

    const skipAmount = (Number(page)-1) * limit;

    const images = await prisma.image.findMany({
      where: query,
      take: limit,
      include: {
        author: true
      },
      skip: skipAmount,
      orderBy: {
        createdAt: "desc",
      },
    })

    const totalImages = await prisma.image.count({
      where: query
    })
    const savedImages = await prisma.image.count();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: Math.ceil(totalImages / limit),
      savedImages
    }

  } catch (e) {

  }
}
