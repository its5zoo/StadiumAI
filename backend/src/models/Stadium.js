import mongoose from 'mongoose';

const zoneSchema = new mongoose.Schema({
  id: { type: String, required: true }, // custom id mapping to SVG paths
  name: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
  occupancy: { type: Number, default: 0 },
  status: { type: String, enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'], default: 'LOW' }
});

zoneSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

const stadiumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String },
  map: { type: String }, // Path to SVG asset
  zones: [zoneSchema]
}, { timestamps: true });

stadiumSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

export const Stadium = mongoose.model('Stadium', stadiumSchema);
