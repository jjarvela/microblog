import { Request, Response} from "express";
import { Router } from "express";
import queries from "../services/prismaqueries";


const router = Router();

router.post("/:userId", async (req: Request, res: Response) => {
    const userid = req.params.userId;
    const {blog_text} = req.body;
    const post = {user_uuid: userid, text: blog_text, timestamp: Date.now()};
    const result = await queries.insertPost(post);
    res.json(result);
});

