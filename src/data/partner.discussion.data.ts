import prisma from "../helper/prisma.helper";

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

const listByPartnerId = (partnerId: string) => {
  return prisma.partnerDiscussion.findMany({
    where: {
      AND: [{ partnerId: partnerId }, { discussionId: null }],
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
          id: true,
          comment: true,
          user: {
            select: {
              id: true,
              username: true,
              fullname: true,
            },
          },
          createdAt: true,
          updatedAt: true,
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
  listByPartnerId,
  getById,
  deleteById,
};
