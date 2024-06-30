import express from "express";
import {
  addItem,
  deleteItem,
  getItems,
  getItem,
  updateItem,
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
