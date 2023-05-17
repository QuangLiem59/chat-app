import prisma from "../libs/prismadb";

import getSession from "./getSession";

const getUsers = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return [];
    }

    const listUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    if (!listUsers) {
      return [];
    }

    return listUsers;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
