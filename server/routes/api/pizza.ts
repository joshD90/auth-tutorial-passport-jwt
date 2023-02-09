import { Router } from "express";
import passport from "passport";

import { ReqUser } from "../../types";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: ReqUser, res) => {
    try {
      res.json({ message: `Enjoy your pizza ${req.user?.email}` });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res
          .status(500)
          .json({ message: "Error with Auth", error: error.message });
      }
    }
  }
);

export default router;
