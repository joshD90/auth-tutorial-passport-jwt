import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Pizza Time!" });
});

export default router;
