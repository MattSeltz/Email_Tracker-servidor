import { Router } from "express";

import {
  getData,
  getOneData,
  postData,
  putData,
  deleteData,
} from "../controllers/email.controllers";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.post("/", postData);
router.put("/:id", putData);
router.delete("/:id", deleteData);

export default router;
