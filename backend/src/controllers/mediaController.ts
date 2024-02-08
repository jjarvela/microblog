import { Request, Response } from "express";
import { Context } from "openapi-backend";
import upload from "../services/upload";
import { MulterError } from "multer";
import * as queries from "../services/mediaQueries";

export async function addUserMedia(c: Context, req: Request, res: Response) {
  const userId = c.request.params.userId;
  console.log(userId);
  const query = c.request.query;
  const blogObj = c.request.body;
  console.log(c.request.body)
  console.log(blogObj);
  if (blogObj.files) {
    console.log(blogObj.files);
    try {
  if(blogObj.files.length < 1 || req.body.formData.files.length < 1) throw new Error("No files!")
      upload(req, res, (err) => {
        if (err instanceof MulterError) {
          //A multer error occurred when uploading
          res
            .status(500)
            .send({ error: { message: "Multer error: " + err.message } });
          return;
        } else if (err) {
          res.status(500).send({
            error: { message: "Internal server error: "  + err.message }
          });
          return;
        }
        //everything worked and Multer has recorded the filepath in req.body.filePath
        console.log("everything worked");
        console.log(req.body);
      });
      if (query.postId !== undefined ) {
        const postId = Number(query.postId);

        for (let i = 0; i < blogObj.files.length; i++)
          try {  
              const result = await queries.insertMediaWithPost({ user_id: userId as string, filename: blogObj.files[i], path: req.body.filePath, blogpost_id: postId as number});
              res.status(200).json(result);
          } catch (e) {
              console.log(e);
              res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
          }
      } else {
        for (let i = 0; i < blogObj.files.length; i++)
          try {  
              const result = await queries.insertMedia({ user_id: userId as string, filename: blogObj.files[i], path: req.body.filePath});
              res.status(200).json(result);
          } catch (e) {
              console.log(e);
              res.status(500).json({ status: 500, err: [{ message: "Unidentified error" }] });
          }
      }
    } catch {
      res.status(500).send("Internal server error");
    }

  }
 
}
