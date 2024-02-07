import { Request, Response } from "express";
import { Context } from "openapi-backend";
import upload from "../services/upload";
import { MulterError } from "multer";

export async function addUserMedia(c: Context, req: Request, res: Response) {
  const params = c.request.params;
  const blogObj = c.request.requestBody.formData;
  if (blogObj.files) {
    try {
      upload(req, res, (err) => {
        if (err instanceof MulterError) {
          //A multer error occurred when uploading
          res
            .status(500)
            .send({ error: { message: "Multer error: " + err.message } });
          return;
        } else if (err) {
          res.status(500).send({
            error: { message: "Internal server error: " + err.message }
          });
          return;
        }
        //everything worked and Multer has recorded the filepath in req.body.filePath
        console.log(req.body)
      });
    } catch {
      res.status(500).send("Internal server error");
    }
  }
 
}
