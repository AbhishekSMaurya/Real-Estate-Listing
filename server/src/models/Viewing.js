import mongoose from "mongoose";

const ViewingSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  datetime: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model("Viewing", ViewingSchema);
