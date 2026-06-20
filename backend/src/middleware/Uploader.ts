import multer from "multer";
import fs from "fs";
import path from "path";

const uploader = (dir = "/") => {
  const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      // const filePath = path.join(__dirname, "../../public/uploads", dir);
      const filePath = "./public/uploads/" + dir;
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      cb(null, filePath);
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + "-" + file.originalname;
      cb(null, filename);
    },
  });

  // const imageFilter = (req, file, cb) => {
  //   const ext = file.originalname.split(".").pop();
  //   const allowed = ["jpg", "jpeg", "png", "gif"];
  //   if (allowed.includes(ext)) {
  //     cb(null, true);
  //   } else {
  //     cb({ code: 422, message: "file format not allowed!" });
  //   }
  // }

  const multerobj = multer({
    // dest: "/path for your file",
    // storage: "configure your storage",
    storage: myStorage,
    fileFilter: (req, file, cb) => {
      const ext = file.originalname.split(".").pop() as string;
      const allowed = ["jpg", "jpeg", "png", "gif"];
      if (allowed.includes(ext.toLowerCase())) {
        cb(null, true);
      } else {
        cb(new Error("file format not allowed!"));
      }
    },
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  });
  return multerobj;
};

export default uploader;