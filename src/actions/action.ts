"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import {
  authformschema,
  petformvalidation,
  petIdSchema,
} from "@/lib/validation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkauth, getpetbyid } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

//user

export async function logIn(prevstate: unknown, formdata: unknown) {
  if (!(formdata instanceof FormData)) {
    return {
      message: "invalid credentials",
    };
  }
  try {
    await signIn("credentials", formdata);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials!",
          };
        }
        default: {
          return {
            message: "Could not logIn",
          };
        }
      }
    }
    throw error;
  }
}

export async function signout() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(prevState: unknown, formdata: unknown) {
  if (!(formdata instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const authdata = Object.fromEntries(formdata.entries());

  const validatedformdata = authformschema.safeParse(authdata);
  if (!validatedformdata.success) {
    return {
      message: "Invalid form data",
    };
  }

  const { email, password } = validatedformdata.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        Hashpassword: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists",
        };
      }
    }
    return {
      message: "could not find the user!",
    };
  }
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
  const pet = await getpetbyid(validatepetId.data);

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

  const pet = await getpetbyid(validatepetId.data);

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
