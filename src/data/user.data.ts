import prisma from "../helper/prisma.helper";

const create = (data: {
  username: string;
  fullname: string;
  password: string;
  birthdate: string;
  bio?: string;
  userLinks?: { url: string }[];
}) => {
  return prisma.user.create({
    data: {
      username: data.username,
      fullname: data.fullname,
      password: data.password,
      birthdate: data.birthdate,
      bio: data.bio,
      userLinks: {
        create: data.userLinks,
      },
    },
    select: {
      id: true,
      username: true,
      fullname: true,
      birthdate: true,
      bio: true,
      userLinks: {
        select: {
          url: true,
        },
      },
    },
  });
};

const list = () => {
  return prisma.user.findMany();
};

const getById = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

const getByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username: username,
    },
  });
};

const updateById = (
  id: string,
  data: {
    username?: string;
    fullname?: string;
    password?: string;
    birthdate?: string;
    bio?: string;
    userLinks?: { url: string }[];
  }
) => {
  return prisma.$transaction(async (prisma) => {
    const deleteUserLinks = data.userLinks
      ? prisma.userLink.deleteMany({
          where: { userId: id },
        })
      : Promise.resolve(null);

    await deleteUserLinks;

    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...(data.username && { username: data.username }),
        ...(data.fullname && { fullname: data.fullname }),
        ...(data.password && { password: data.password }),
        ...(data.birthdate && { birthdate: data.birthdate }),
        ...(data.bio && { bio: data.bio }),
        userLinks: {
          create: data.userLinks,
        },
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        birthdate: true,
        bio: true,
        userLinks: {
          select: {
            url: true,
          },
        },
      },
    });

    return updateUser;
  });
};

const deleteById = (id: string) => {
  return prisma.user.delete({
    where: {
      id: id,
    },
  });
};

export default {
  create,
  list,
  getById,
  getByUsername,
  updateById,
  deleteById,
};
