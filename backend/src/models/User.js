import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['FAN', 'ORGANIZER', 'VOLUNTEER', 'SECURITY_STAFF', 'ADMIN'],
    default: 'FAN'
  },
  preferredLanguage: { type: String, default: 'en' },
  favoriteTeam: { type: String },
  accessibilityMode: { type: Boolean, default: false },
  stadiumId: { type: String, default: 'stadium_001' }
}, { timestamps: true });

// Transform output to match mock id format
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

export const User = mongoose.model('User', userSchema);
