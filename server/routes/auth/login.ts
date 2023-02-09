import { Router, Response } from "express";
import passport from "passport";
import * as jwt from "jsonwebtoken";

import config from "../../config";
import { ReqUser } from "../../types";

const router = Router();

router.post(
  "/",
  passport.authenticate("local", { session: false }),
  async (req: ReqUser, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      // we will handle the signing of the token here
      const token = jwt.sign(
        { email: req.user?.email, userId: req.user?.id, role: 1 },
        config.jwt.secret as string,
        { expiresIn: "1d" }
      );
      res.json(token);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

export default router;
