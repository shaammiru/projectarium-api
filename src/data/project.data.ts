import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = (data: {
  title: string;
  userId: string;
  projectTags?: { name: string }[];
}) => {
  return prisma.project.create({
    data: {
      title: data.title,
      userId: data.userId,
      projectTags: {
        create: data.projectTags,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          role: true,
        },
      },
      projectTags: {
        select: {
          name: true,
        },
      },
    },
  });
};

const list = () => {
  return prisma.project.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          role: true,
        },
      },
      projectTags: {
        select: {
          name: true,
        },
      },
    },
  });
};

const getById = (id: string) => {
  return prisma.project.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          role: true,
        },
      },
      projectTags: {
        select: {
          name: true,
        },
      },
    },
  });
};

const updateById = (
  id: string,
  data: { title?: string; userId?: string; projectTags?: { name: string }[] }
) => {
  return prisma.project.update({
    where: {
      id: id,
    },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.userId && { userId: data.userId }),
      projectTags: {
        create: data.projectTags,
      },
    },
  });
};

const deleteById = (id: string) => {
  return prisma.project.delete({
    where: {
      id: id,
    },
  });
};

export default {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
