import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  stadiumId: { type: String, required: true },
  kickoff: { type: Date, required: true },
  city: { type: String, required: true },
  tournamentPhase: { type: String, default: "Group Stage" }
}, {
  timestamps: true
});

export const Match = mongoose.model('Match', matchSchema);
