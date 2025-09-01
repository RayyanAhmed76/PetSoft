"use server";

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

export async function addPet(formData) {
  await sleep(2000);
  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return {
      message: "age parameter is wrong!",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petid, formData) {
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: {
        id: petid,
      },
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
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
