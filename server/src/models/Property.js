import mongoose from "mongoose";

const CoordsSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
}, { _id: false });

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  type: { type: String, default: "apartment" }, // apartment | house | office
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  coords: { type: CoordsSchema, required: true }
}, { timestamps: true });

export default mongoose.model("Property", PropertySchema);
