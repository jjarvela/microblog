import multer from "multer";
import path from "path";

/*create multer instance*/

const upload = multer({
  /*initialise storage object which sets the upload filepath and filename */
  storage: multer.diskStorage({
    destination(
      req,
      _file,
      callback: (error: Error | null, destination: string) => void
    ) {
      /*filepath as user-media/userId */
      callback(null, "./src/user-media/" + req.body.user_id);
    },
    filename(
      req,
      file,
      callback: (error: Error | null, destination: string) => void
    ) {
      /*get userId and fileId from either request parametres or body
      (may need to put fileId into req body before calling upload)*/
      console.log("************MULTER START****************");
      const userId = req.params.userId;
      console.log(userId);
      const fileType = path.extname(file.originalname);
      const filename = parseName(userId, Date.now().toString(), fileType);
      console.log(filename);

      /* apply file path to request body */
      req.body.filePath =
        "./src/user-media/" + req.body.user_id + "/" + filename;
      console.log(req.body);
      console.log("************MULTER END****************");

      callback(null, filename);
    }
  }),
  /*set filesize limit to 100 0000 bytes*/
  limits: { fileSize: 100000 }
});

function parseName(userId: string | number, fileId: string, filetype: string) {
  const imgTypes = [".jpg", ".jpeg", ".png", ".gif", ".svg"];
  const vidTypes = [".mp4", ".mpeg", ".avi"];
  let type = "";

  /*check that file type is valid and set type name for filename*/
  if (imgTypes.indexOf(filetype) > -1) type = "img";
  else if (vidTypes.indexOf(filetype) > -1) type = "vid";
  else {
    throw new Error("Invalid file type");
  }

  /*give filename in form userId - Date as number - media ID - img/vid */
  return userId + "-" + new Date().getTime + "-" + fileId + "-" + type;
}

/*user-media is the required name for the file upload form field in the FRONTEND
For upload to work, FRONTEND axios request needs to have "Content-Type": "multipart/form-data" in its request header
upload is called by upload(req, res, err => {-error and response handling-})*/
export default upload.array("user-media", 4);
