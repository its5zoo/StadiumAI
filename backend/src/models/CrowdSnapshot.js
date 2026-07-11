import mongoose from 'mongoose';

const crowdSnapshotSchema = new mongoose.Schema({
  stadiumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stadium', required: true },
  zones: [{
    zoneId: { type: mongoose.Schema.Types.ObjectId, required: true },
    density: { type: Number, required: true },
    status: { type: String, required: true }
  }],
  timestamp: { type: Date, default: Date.now }
});

export const CrowdSnapshot = mongoose.model('CrowdSnapshot', crowdSnapshotSchema);
