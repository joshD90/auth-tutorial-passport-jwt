import { Router, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import config from "../../config";
import db from "../../db";
import { generateHash } from "../../utils/passwords";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const newUser = req.body;

  try {
    newUser.password = await generateHash(newUser.password);
    const result = await db.users.insert(newUser);
    if (!result) throw new Error("Could not save to db");

    // we will handle the signing of the token here
    const token = jwt.sign(
      { email: newUser.email, userId: result.insertId, role: 1 },
      config.jwt.secret as string,
      { expiresIn: "1d" }
    );
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
