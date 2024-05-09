import * as bcrypt from "bcrypt";
import prismaClient from "../src/prisma.client";

async function main() {
  const email = process.env.EMAIL || "admin@mail.com";
  const password = process.env.PASSWORD || "123456789";
  const emailExist = await prismaClient.login.findUnique({
    where: {
      email,
    },
  });

  const passwordCrypt = await bcrypt.hash(
    password,
    process.env.SALT_ROUNDS_CRYPT ? parseInt(process.env.SALT_ROUNDS_CRYPT) : 10
  );

  if (emailExist)
    await prismaClient.login.update({
      where: { id: emailExist.id },
      data: {
        password: passwordCrypt,
      },
    });
  else
    await prismaClient.login.create({
      data: {
        email,
        password: passwordCrypt,
      },
    });

  console.log("Login generated successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
