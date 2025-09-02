import express from "express";
import Property from "../models/Property.js";

const router = express.Router();

// GET /api/properties
router.get("/", async (req, res) => {
  const { q, minPrice, maxPrice, type } = req.query;

  const filter = {};
  if (q) {
    filter.$or = [
      { title: new RegExp(q, "i") },
      { location: new RegExp(q, "i") }
    ];
  }
  if (minPrice) filter.price = { ...(filter.price || {}), $gte: Number(minPrice) };
  if (maxPrice) filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };
  if (type) filter.type = type;

  const props = await Property.find(filter).sort({ createdAt: -1 });
  res.json(props);
});

// GET /api/properties/:id
router.get("/:id", async (req, res) => {
  const prop = await Property.findById(req.params.id);
  if (!prop) return res.status(404).json({ message: "Property not found" });
  res.json(prop);
});

// (Optional) POST /api/properties — seed or admin create
router.post("/", async (req, res) => {
  const created = await Property.create(req.body);
  res.status(201).json(created);
});

export default router;
