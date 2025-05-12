const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const contactDetailsSchema = new mongoose.Schema({
  phone: { type: String },
  emergencyContact: { type: String },
});

const userSchema = new mongoose.Schema({
  role: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  contactDetails: contactDetailsSchema,
  travelPreferences: [String],
  loyaltyPoints: { type: Number, default: 0 },
  status: { type: String, default: 'Active' },  // Added status field
  booking: { type: String, default: 'PK123' },      // Added booking field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});
// Method to update loyalty points
userSchema.methods.updateLoyaltyPoints = function (points) {
  this.loyaltyPoints += points;
  this.updatedAt = Date.now();
  return this.save();
};

// Method to redeem loyalty points
userSchema.methods.redeemPoints = function (points) {
  if (this.loyaltyPoints < points) {
    throw new Error("Insufficient loyalty points.");
  }
  this.loyaltyPoints -= points;
  this.updatedAt = Date.now();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
