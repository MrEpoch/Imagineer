"use server";

import { User } from "@prisma/client";
import { prisma } from "../db";
import { revalidatePath } from "next/cache";
import { handleError } from "../handleError";

export async function createUser(user: User, url: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        ...user,
      },
    });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError("user-exists", url);
  }
}

export async function getUserById(id: string, url: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) handleError("user-not-found", url);

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError("user-not-found", url);
  }
}

export async function updateUser(clerkId: string, user: User, url: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId,
      },
      data: {
        ...user,
      },
    });

    if (!updatedUser) handleError("user-update-failed", url);

    return JSON.parse(JSON.stringify(updateUser));
  } catch (e) {
    handleError("user-update-failed", url);
  }
}

export async function deleteUser(clerkId: string, url: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) handleError("user-not-found", url);

    const deletedUser = await prisma.user.delete({
      where: {
        clerkId,
      },
    });

    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (e) {
    handleError("user-delete-failed", url);
  }
}

export async function updateCredits(
  id: string,
  creditFee: number,
  url: string,
) {
  try {
    const updatedUserCredits = await prisma.user.update({
      where: {
        id,
      },
      data: {
        creditBalance: {
          increment: creditFee,
        },
      },
    });

    if (!updatedUserCredits) handleError("user-credit-update-failed", url);

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (e) {
    handleError("user-credit-update-failed", url);
  }
}
