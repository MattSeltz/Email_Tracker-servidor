import { Router } from "express";

import {
  getData,
  getOneData,
  postData,
  putData,
  deleteData,
  updateIsSend,
} from "../controllers/email.controllers";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.post("/", postData);
router.put("/send/:id", updateIsSend);
router.put("/:id", putData);
router.delete("/:id", deleteData);

export default router;
