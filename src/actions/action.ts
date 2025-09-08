"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { petformvalidation, petIdSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkauth } from "@/lib/server-utils";

//user

export async function logIn(formdata: FormData) {
  const authdata = Object.fromEntries(formdata.entries());
  await signIn("credentials", authdata);
  redirect("/app/dashboard");
}

export async function signout() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formdata: FormData) {
  const hashedPassword = await bcrypt.hash(
    formdata.get("password") as string,
    10
  );
  await prisma.user.create({
    data: {
      email: formdata.get("email") as string,
      Hashpassword: hashedPassword,
    },
  });

  await signIn("credentials", formdata);
}

// pet
export async function addPet(petdata: unknown) {
  const session = await checkauth();
  await sleep(1000);
  const validatedPet = petformvalidation.safeParse(petdata);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
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
  const session = await checkauth();
  await sleep(1000);

  const validatepetId = petIdSchema.safeParse(petid);
  const validatedPet = petformvalidation.safeParse(newpetdata);
  if (!validatepetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatepetId.data,
    },
  });

  if (!pet) {
    return {
      message: "pet not found!",
    };
  }

  if (pet.userid !== session.user.id) {
    return {
      message: "not Authorized!",
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
  const session = await checkauth();
  await sleep(1000);

  const validatepetId = petIdSchema.safeParse(petid);
  if (!validatepetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  const pet = await prisma.pet.findUnique({
    where: {
      id: validatepetId.data,
    },
  });

  if (!pet) {
    return {
      message: "pet not found!",
    };
  }

  if (pet.userid !== session.user.id) {
    return {
      message: "not Authorized!",
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
