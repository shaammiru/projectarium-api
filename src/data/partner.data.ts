import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = (data: {
  title: string;
  userId: string;
  content: string;
  validUntil: string;
  partnerTags?: { name: string }[];
  partnerLinks?: { url: string }[];
}) => {
  return prisma.partner.create({
    data: {
      title: data.title,
      content: data.content,
      userId: data.userId,
      validUntil: data.validUntil,
      partnerTags: {
        create: data.partnerTags,
      },
      partnerLinks: {
        create: data.partnerLinks,
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
      partnerTags: {
        select: {
          name: true,
        },
      },
      partnerLinks: {
        select: {
          url: true,
        },
      },
      _count: {
        select: {
          partnerLikes: true,
          partnerDiscussions: true,
        },
      },
    },
  });
};

const createLikeById = (userId: string, partnerId: string) => {
  return prisma.partnerLike.create({
    data: {
      userId: userId,
      partnerId: partnerId,
    },
  });
};

const list = () => {
  return prisma.partner.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
          fullname: true,
          role: true,
        },
      },
      partnerTags: {
        select: {
          name: true,
        },
      },
      partnerLikes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          partnerLikes: true,
          partnerDiscussions: true,
        },
      },
    },
  });
};

const getById = (id: string) => {
  return prisma.partner.findUnique({
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
      partnerTags: {
        select: {
          name: true,
        },
      },
      partnerLikes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          partnerLikes: true,
          partnerDiscussions: true,
        },
      },
    },
  });
};

const updateById = (
  id: string,
  data: {
    title?: string;
    userId?: string;
    content?: string;
    validUntil?: string;
    partnerTags?: { name: string }[];
    partnerLinks?: { url: string }[];
  }
) => {
  return prisma.$transaction(async (prisma) => {
    const deletePartnerTags = data.partnerTags
      ? prisma.partnerTag.deleteMany({
          where: { partnerId: id },
        })
      : Promise.resolve(null);

    const deletePartnerLinks = data.partnerLinks
      ? prisma.partnerLink.deleteMany({
          where: { partnerId: id },
        })
      : Promise.resolve(null);

    await deletePartnerTags;
    await deletePartnerLinks;

    const updatedPartner = await prisma.partner.update({
      where: {
        id: id,
      },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.content && { content: data.content }),
        ...(data.userId && { userId: data.userId }),
        ...(data.validUntil && { validUntil: data.validUntil }),
        partnerTags: {
          create: data.partnerTags,
        },
        partnerLinks: {
          create: data.partnerLinks,
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
        partnerTags: {
          select: {
            name: true,
          },
        },
        partnerLinks: {
          select: {
            url: true,
          },
        },
        _count: {
          select: {
            partnerLikes: true,
            partnerDiscussions: true,
          },
        },
      },
    });

    return updatedPartner;
  });
};

const getLikeById = (partnerId: string) => {
  return prisma.partnerLike.count({
    where: {
      partnerId: partnerId,
    },
  });
};

const deleteById = (id: string) => {
  return prisma.partner.delete({
    where: {
      id: id,
    },
  });
};

const deletLikeById = (userId: string, partnerId: string) => {
  return prisma.partnerLike.delete({
    where: {
      userId_partnerId: {
        userId: userId,
        partnerId: partnerId,
      },
    },
  });
};

export default {
  create,
  createLikeById,
  list,
  getById,
  getLikeById,
  updateById,
  deleteById,
  deletLikeById,
};
