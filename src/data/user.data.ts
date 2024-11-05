import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = (data: any) => {
  return prisma.user.create({
    data: data,
    select: {
      id: true,
      username: true,
      fullname: true,
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

const updateById = (id: string, data: any) => {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: data,
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
