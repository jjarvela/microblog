import { Request, Response } from "express";
import { Context } from "openapi-backend";
import { blake3 } from "hash-wasm";
import { insertMedia, selectMediaByPost } from "../services/mediaQueries";
import type { FileArray, UploadedFile } from "express-fileupload";
import { mkdir, access } from "node:fs/promises";
import { UUID } from "node:crypto";
import { eachItem } from "ajv/dist/compile/util";

const media_root = './user_media'


export async function addUserMedia(c: Context, req: Request, res: Response) {

  const postId = Number(c.request.params.postId);

  if (req.files !== undefined && req.session.user !== undefined && Number.isInteger(postId) === true) {
    console.log("Type checks passed.")
    const fileArray = (req.files as unknown as FileArray)

    // Set uid and user file directory
    console.log(c.request.params);
    const uid = req.session.user.uid as UUID
    const dir: string = `${media_root}/${uid}`

    // Check if directory is accessible 
    // and create directory if not.

    try {
      await access(dir)
    } catch (e) {
      console.log(`Creating directory for uid ${uid}`)
      await mkdir(dir, { recursive: true })
    }

    try {

      if (Buffer.isBuffer((fileArray.imagefile as UploadedFile).data)) {

        const file = fileArray.imagefile as UploadedFile
        const hashName = await blake3(file.name, 128)
        await file.mv(`${dir}/${hashName}`)
        // Insert reference to db
        insertMedia({ user_id: uid, filename: `${hashName}`, path: `${dir}/`, blogpost_id: postId })
        return res.status(200).send();
      } else if (Array.isArray(fileArray.imagefile)) {
        fileArray.imagefile.forEach(async (file) => {

          // Calculate blacke hash for file name
          const hashName = await blake3(file.name, 128);
          insertMedia({ user_id: uid, filename: `${hashName}`, path: `${dir}/`, blogpost_id: postId })
          await file.mv(`${dir}/${hashName}`)


        })
        return res.status(200).send();
      }

    } catch (e) {
      console.log("File type checks failed.");
      console.log(e);
      res.status(500).send();
    }



  } else {
    console.log("Payload format checks failed.");
    res.status(500).send();
  }
}

export async function getUserMedia(c: Context, req: Request, res: Response) {

  const postId = Number(c.request.params.postId);

  if (Number.isInteger(postId) === true) {

    //  const typeDetector = fileTypeFromFile();
    // Get user by postId
    const fileRes = await selectMediaByPost({ blogpost_id: postId });
    const fileResArray = [];
    let mediaRes = {};

    // Generate virtual path for files and prepare mediaRes object.

    if (fileRes !== null) {
      for (const [key, value] of Object.entries(fileRes)) {

        const uid = value.user_medias.user_id;
        const filename = value.user_medias.filename;
        const virtual_path = `/files/${uid}/${filename}`;
        const id = value.id;

        mediaRes = {
          id: id,
          fileUrl: virtual_path,
          user_id: uid
        }
        fileResArray.push(mediaRes);
      }

      return res.status(200).json(fileResArray);
    }



  }



}
