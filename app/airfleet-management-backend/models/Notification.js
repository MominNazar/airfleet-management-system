const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Important', 'Info', 'Critical'],
      required: true
    },
    status: {
      type: String,
      enum: ['Unread', 'Read'],
      default: 'Unread'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
