import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = (data: {
  userId: string;
  projectId: string;
  comment: string;
  discussionId?: string;
}) => {
  return prisma.projectDiscussion.create({
    data: {
      userId: data.userId,
      projectId: data.projectId,
      comment: data.comment,
      discussionId: data.discussionId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
        },
      },
    },
  });
};

const list = () => {
  return prisma.projectDiscussion.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
        },
      },
      replies: {
        select: {
          comment: true,
          user: {
            select: {
              id: true,
              username: true,
              fullname: true,
            },
          },
        },
      },
    },
  });
};

const listByProjectId = (projectId: string) => {
  return prisma.projectDiscussion.findMany({
    where: {
      projectId: projectId,
      discussionId: null,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
        },
      },
      replies: {
        select: {
          comment: true,
          user: {
            select: {
              id: true,
              username: true,
              fullname: true,
            },
          },
        },
      },
    },
  });
};

const getById = (id: string) => {
  return prisma.projectDiscussion.findUnique({
    where: {
      id: id,
    },
  });
};

const deleteById = (id: string) => {
  return prisma.projectDiscussion.delete({
    where: {
      id: id,
    },
  });
};

export default {
  create,
  list,
  listByProjectId,
  getById,
  deleteById,
};
