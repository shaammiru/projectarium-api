import path from "path";
import fs from "fs/promises";
import { v4 } from "uuid";

const staticDirectory = path.join(__dirname, `../../images`);

const upload = async (files: Express.Multer.File[]) => {
  const fileUrls = [];

  for (const file of files) {
    const fileName = `${Date.now().toString()}-${v4()}.${
      file.mimetype.split("/")[1]
    }`;
    const filePath = path.join(staticDirectory, fileName);

    await fs.writeFile(filePath, file.buffer);
    const fileUrl = `${process.env.HOST}/api/images/${fileName}`;
    fileUrls.push(fileUrl);
  }

  return fileUrls;
};

const remove = async (url: string) => {
  const fileName = url.split(`/${process.env.STATIC_DIR}`)[1];
  const filePath = path.join(staticDirectory, fileName);
  await fs.unlink(filePath);
};

export default {
  upload,
  remove,
};
