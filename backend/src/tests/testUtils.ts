import prisma from "../utils/prisma";

export const clearTestUsers = async (username: string) => {
  try {
    await prisma.user.delete({
      where: {
        username: username,
      },
    });
  } catch (error) {
    console.log("no users to delete");
  }
};
