import { Request, Response } from "express";
import { Context } from "openapi-backend";
import { blake3 } from "hash-wasm";
import { NextFunction } from "express-serve-static-core";
import type { fileObject } from "./types";
import type { FileArray, UploadedFile } from "express-fileupload"


export function addUserMedia(c: Context, req: Request, res: Response) {


  //  console.log(req.files.imagefile as UploadedFile);

  const uploadFiles = req.files;

  if (uploadFiles.imageFile !== undefined) {
    try {
      console.log(uploadFiles.imagefile as fileObject)
    } catch (e) {

    }

    res.status(200).send();

  } else {
    res.status(500).send();
  }

}
