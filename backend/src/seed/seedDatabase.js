import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { Stadium } from '../models/Stadium.js';
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    
    // Check if seeded
    const existingStadium = await Stadium.findOne();
    if (existingStadium) {
      console.log("Database already seeded");
      process.exit(0);
    }

    console.log("Seeding Stadium Data...");
    const stadium = new Stadium({
      name: "MetLife Stadium",
      country: "USA",
      city: "New York",
      zones: [
        { name: "Gate A", type: "ENTRY_GATE", capacity: 5000 },
        { name: "Gate B", type: "ENTRY_GATE", capacity: 5000 },
        { name: "East Wing Washroom", type: "WASHROOM", capacity: 500 },
        { name: "Main Concourse Food Court", type: "FOOD", capacity: 3000 }
      ]
    });
    
    await stadium.save();
    console.log("Stadium Saved!");

    console.log("Seeding Users...");
    const hashedPass = await bcrypt.hash("password", 10);
    await User.create([
      { name: "John Fan", email: "fan@example.com", password: hashedPass, role: "FAN", stadiumId: stadium._id },
      { name: "Jane Organizer", email: "org@example.com", password: hashedPass, role: "ORGANIZER", stadiumId: stadium._id }
    ]);
    console.log("Users Saved!");
    
    console.log("Seeding Complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
};

seedData();
