import express from "express";
import Viewing from "../models/Viewing.js";
import Property from "../models/Property.js";

const router = express.Router();

// POST /api/viewings
router.post("/", async (req, res) => {
  const { propertyId, userName, email, datetime } = req.body;

  const prop = await Property.findById(propertyId);
  if (!prop) return res.status(400).json({ message: "Invalid propertyId" });

  const viewing = await Viewing.create({
    propertyId, userName, email, datetime: new Date(datetime)
  });

  res.status(201).json({ success: true, viewing });
});

export default router;
