import express from "express";
import { getAllBarbies, getBarbieById, createBarbie, deleteBarbie } from "./../controllers/barbieControllers.js";

const router = express.Router();

router.get("/", getAllBarbies);
router.get("/:id", getBarbieById);
router.post("/", createBarbie);
router.delete("/:id", deleteBarbie);


export default router;