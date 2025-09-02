"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

export async function addPet(petdata) {
  await sleep(2000);
  try {
    await prisma.pet.create({
      data: petdata,
    });
  } catch (error) {
    return {
      message: "age parameter is wrong!",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petid, newpetdata) {
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: {
        id: petid,
      },
      data: newpetdata,
    });
  } catch (error) {
    return {
      message: "pet can not be edit.",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petid) {
  await sleep(2000);
  try {
    await prisma.pet.delete({
      where: {
        id: petid,
      },
    });
  } catch (error) {
    return {
      message: "pet can not be deleted.",
    };
  }
  revalidatePath("/app", "layout");
}
