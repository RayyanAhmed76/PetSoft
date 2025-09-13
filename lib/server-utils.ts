import { redirect } from "next/navigation";
import { auth } from "./auth-no-edge";
import { Pet, User } from "@prisma/client";
import prisma from "@/lib/db";

export async function checkauth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getpetbyid(petid: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petid,
    },
  });

  return pet;
}

export async function getpetbyuserid(userid: User["id"]) {
  const pets = await prisma.pet.findMany({
    where: {
      userid: userid,
    },
  });
  console.log("show current pets: " + pets);

  return pets;
}

export async function getuserbyid(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
