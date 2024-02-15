import { Request, Response } from "express";
import { Context } from "openapi-backend";
import { blake3 } from "hash-wasm";
import { NextFunction } from "express-serve-static-core";
import type { fileObject } from "./types";
import type { FileArray, UploadedFile } from "express-fileupload"
import { eachItem } from "ajv/dist/compile/util";
import { mkdir, access } from "node:fs/promises";

const media_root = '/user_media'



export async function addUserMedia(c: Context, req: Request, res: Response) {



  if (req.files !== undefined) {

    const fileArray = (req.files as unknown as FileArray)

    try {

      if (Buffer.isBuffer((fileArray.imagefile as UploadedFile).data)) {

        console.log("Yksi tiedosto");

      } else if (Array.isArray(fileArray.imagefile)) {

        if (req.session.user !== undefined) {

          // Set uid and calculate 
          const uid = req.session.user.uid
          const dir: string = `${media_root}/${uid}`
          // Check if directory is accessible 
          // and create directory if not.

          try {
            await access(dir)
          } catch (e) {
            console.log(`Creating directory for uid ${uid}`)
            await mkdir(dir)
          }

          fileArray.imagefile.forEach(async (file) => {

            // Calculate blacke hash for file name

            const hashName = await blake3(file.name, 128);
            await file.mv(`${dir}/${hashName}`);
          })

        }


      }

    } catch (e) {
      res.status(500).send();
    }

    res.status(200).send();

  } else {
    res.status(500).send();
  }
}
