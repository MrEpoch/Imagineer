"use server";

import { prisma } from "../db";
import { revalidatePath } from "next/cache";
import { handleError } from "../handleError";

interface UserCreate {
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  clerkId: string;
  photo: string;
}

interface UserUpdate {
  username: string;
  lastName: string;
  firstName: string;
  photo: string;
}

export async function createUser(user: UserCreate) {
  try {
    const newUser = await prisma.user.create({
      data: {
        ...user,
      },
    });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    throw new Error("Failed to create user: " + error);
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error("");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new Error("Failed to get user: " + error);
  }
}

export async function updateUser(clerkId: string, user: UserUpdate) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId,
      },
      data: {
        ...user,
      },
    });

    if (!updatedUser) throw new Error("");

    return JSON.parse(JSON.stringify(updateUser));
  } catch (e) {
    throw new Error("Failed to update user: " + e);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) throw new Error("User not found");

    const deletedUser = await prisma.user.delete({
      where: {
        clerkId,
      },
    });

    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (e) {
    throw new Error("Failed to delete user: " + e);
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
