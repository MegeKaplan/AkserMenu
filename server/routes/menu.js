import express from "express";
import {
  addItem,
  deleteItem,
  getItems,
  getItem,
  updateItem,
} from "../controllers/menuController.js";

const router = express.Router();

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", upload.single("file"), addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
