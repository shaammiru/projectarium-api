import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = (data: {
  title: string;
  userId: string;
  content: string;
  projectImages: { imageUrl: string }[];
  projectTags?: { name: string }[];
}) => {
  return prisma.project.create({
    data: {
      title: data.title,
      content: data.content,
      userId: data.userId,
      projectTags: {
        create: data.projectTags,
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
      projectImages: {
        select: {
          imageUrl: true,
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
      projectImages: {
        select: {
          imageUrl: true,
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
      projectImages: {
        select: {
          imageUrl: true,
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
  }
) => {
  return prisma.$transaction(async (prisma) => {
    const deleteProjectTags = data.projectTags
      ? prisma.projectTag.deleteMany({
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
        projectImages: {
          create: data.projectImages,
        },
      },
    });

    return updatedProject;
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
