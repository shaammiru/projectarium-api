import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = (data: {
  userId: string;
  partnerId: string;
  comment: string;
  discussionId?: string;
}) => {
  return prisma.partnerDiscussion.create({
    data: {
      userId: data.userId,
      partnerId: data.partnerId,
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

const listByProjectId = (partnerId: string) => {
  return prisma.partnerDiscussion.findMany({
    where: {
      partnerId: partnerId,
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
  return prisma.partnerDiscussion.findUnique({
    where: {
      id: id,
    },
  });
};

const deleteById = (id: string) => {
  return prisma.partnerDiscussion.delete({
    where: {
      id: id,
    },
  });
};

export default {
  create,
  listByProjectId,
  getById,
  deleteById,
};
