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

router.get("/:menuId", getItems);
router.get("/:menuId/:itemId", getItem);
router.post("/:menuId", upload.single("file"), addItem);
router.put("/:menuId/:itemId", updateItem);
router.delete("/:menuId/:itemId", deleteItem);

export default router;
