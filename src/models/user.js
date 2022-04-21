const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    emailAddress: {
      type: String,
      trim: true,
      default: 'a@bc.com',
    },
    gender: {
      type: String,
      trim: true,
      enum: ['male', 'female', 'non-binary', 'none'],
      default: 'none',
    },
    books: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'UserBook',
      },
    ],
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  if (this.password.startsWith('$')) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method. method available in the whole model
UserSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword,
) {
  const passwordStatus = await bcrypt.compare(candidatePassword, userPassword);
  return passwordStatus;
};

module.exports = mongoose.model('User', UserSchema);
