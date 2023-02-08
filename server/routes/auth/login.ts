import { Router, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import db from "../../db";
import { compareHash } from "../../utils/passwords";
import config from "../../config";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userFound = await db.users.find("email", email);
    if (!userFound || userFound.length === 0)
      return res.status(401).json({ message: "Invalid Credentials" });
    const result = await compareHash(password, userFound[0].password);
    if (!result)
      return res.status(401).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      { email: userFound.email, userId: userFound.id, role: 1 },
      config.jwt.secret as string,
      { expiresIn: "1d" }
    );
    res.json(userFound);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
