import multer from "multer";

const MulterMw = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "./upload/");
    },
    filename(req, file, callback) {
      const fileName =
        file.originalname.length > 14
          ? file.originalname.substring(file.originalname.length - 14)
          : file.originalname;
      callback(null, Date.now() + "_" + fileName);
    },
  }),
});

export default MulterMw;
