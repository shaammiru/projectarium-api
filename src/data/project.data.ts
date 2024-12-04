import prisma from "../helper/prisma.helper";

const create = (data: {
  title: string;
  userId: string;
  content: string;
  projectImages: { imageUrl: string }[];
  projectTags?: { name: string }[];
  projectLinks?: { url: string }[];
}) => {
  return prisma.project.create({
    data: {
      title: data.title,
      content: data.content,
      userId: data.userId,
      projectTags: {
        create: data.projectTags,
      },
      projectLinks: {
        create: data.projectLinks,
      },
      projectImages: {
        create: data.projectImages,
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
      projectLinks: {
        select: {
          url: true,
        },
      },
      projectImages: {
        select: {
          imageUrl: true,
        },
      },
      _count: {
        select: {
          projectLikes: true,
        },
      },
    },
  });
};

const createLikeById = (userId: string, projectId: string) => {
  return prisma.projectLike.create({
    data: {
      userId: userId,
      projectId: projectId,
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
      projectImages: {
        select: {
          imageUrl: true,
        },
      },
      projectLikes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          projectLikes: true,
          projectDiscussions: true,
        },
      },
    },
  });
};

const listProjectImages = (projectId: string) => {
  return prisma.projectImage.findMany({
    where: { projectId: projectId },
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
      projectImages: {
        select: {
          imageUrl: true,
        },
      },
      projectLikes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          projectLikes: true,
          projectDiscussions: true,
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
    projectImages?: { imageUrl: string }[];
    projectTags?: { name: string }[];
    projectLinks?: { url: string }[];
  }
) => {
  return prisma.$transaction(async (prisma) => {
    const deleteProjectTags = data.projectTags
      ? prisma.projectTag.deleteMany({
          where: { projectId: id },
        })
      : Promise.resolve(null);

    const deleteProjectLinks = data.projectLinks
      ? prisma.projectLink.deleteMany({
          where: { projectId: id },
        })
      : Promise.resolve(null);

    const deleteProjectImages = data.projectImages
      ? prisma.projectImage.deleteMany({
          where: { projectId: id },
        })
      : Promise.resolve(null);

    await deleteProjectTags;
    await deleteProjectImages;
    await deleteProjectLinks;

    const updatedProject = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.content && { content: data.content }),
        ...(data.userId && { userId: data.userId }),
        projectTags: {
          create: data.projectTags,
        },
        projectLinks: {
          create: data.projectLinks,
        },
        projectImages: {
          create: data.projectImages,
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
        projectLinks: {
          select: {
            url: true,
          },
        },
        projectImages: {
          select: {
            imageUrl: true,
          },
        },
        _count: {
          select: {
            projectLikes: true,
          },
        },
      },
    });

    return updatedProject;
  });
};

const getLikeById = (projectId: string) => {
  return prisma.projectLike.count({
    where: {
      projectId: projectId,
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

const deletLikeById = (userId: string, projectId: string) => {
  return prisma.projectLike.delete({
    where: {
      userId_projectId: {
        userId: userId,
        projectId: projectId,
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
  listProjectImages,
  updateById,
  deleteById,
  deletLikeById,
};
