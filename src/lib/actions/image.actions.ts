'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { redirect } from "next/navigation";
import { AddImageParams } from "@/types/index";

export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    const author = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!author) throw new Error("User not found");

    const newImage = await prisma.image.create({
      data: {
        ...image,
        author: {
          connect: {
            id: userId
          }
        }
      }
    })

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
        id: userId
      }
    })

    if (!author) throw new Error("User not found");

    const updatedImage = await prisma.image.update({
      where: {
        id: image.id,
        authorId: userId
      },
      data: {
        ...image
      }
    })

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
        id: userId
      }
    })

    if (!author) throw new Error("User not found");

    const deletedImage = await prisma.image.delete({
      where: {
        id: image.id,
        authorId: userId
      }
    })
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
        id: userId
      }
    })

    if (!author) throw new Error("User not found");

    const getImage = await prisma.image.findUnique({
      where: {
        id: image.id,
        authorId: userId
      }
    })

    if (!getImage) throw new Error("Image not found");

    revalidatePath(path);

    return JSON.parse(JSON.stringify(getImage));
  } catch (e) {
    throw new Error("Failed to get image: " + e);
  }
}
