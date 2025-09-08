import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
  email: "example@gmail.com",
  Hashpassword: "",
  pets: {
    create: [
      {
        name: "Benjamin",
        ownerName: "John Doe",
        imageUrl:
          "https://images.unsplash.com/photo-1517849855423-d02e0b19f041?auto=format&fit=crop&q=100&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MXxwYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        age: 2,
        notes:
          "Doesn't like to be touched on the belly. Plays well with other dogs.",
      },
      {
        name: "Richard",
        ownerName: "Josephine Dane",
        imageUrl:
          "https://images.unsplash.com/photo-1583337130635-f01de18f8819?auto=format&fit=crop&q=100&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MXxwYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        age: 5,
        notes: "Needs medication twice a day.",
      },
      {
        name: "Anna",
        ownerName: "Frank Doe",
        imageUrl:
          "https://images.unsplash.com/photo-1537151625747-eb6c6f92b2?auto=format&fit=crop&q=100&w=1970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MXxwYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        age: 4,
        notes: "Allergic to chicken.",
      },
    ],
  },
};

async function main() {
  console.log("Start seeding ...");
  const hashedPassword = await bcrypt.hash("example", 10);
  userData.Hashpassword = hashedPassword;

  await prisma.user.create({
    data: userData,
  });
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
