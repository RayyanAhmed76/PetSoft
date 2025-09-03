"use server";

import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petformvalidation, petIdSchema } from "@/lib/validation";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addPet(petdata: unknown) {
  await sleep(1000);
  const validatedPet = petformvalidation.safeParse(petdata);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Pe cannot be added!",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petid: unknown, newpetdata: unknown) {
  await sleep(1000);

  const validatepetId = petIdSchema.safeParse(petid);
  const validatedPet = petformvalidation.safeParse(newpetdata);
  if (!validatepetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatepetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "pet can not be edit.",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petid: unknown) {
  await sleep(1000);

  const validatepetId = petIdSchema.safeParse(petid);
  if (!validatepetId.success) {
    return {
      message: "Invalid pet data",
    };
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatepetId.data,
      },
    });
  } catch (error) {
    return {
      message: "pet can not be deleted.",
    };
  }
  revalidatePath("/app", "layout");
}
