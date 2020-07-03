const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  token: {
    type: String,
    require: true,
  },
  // tokenExpiry: {
  //   type: Date,
  //   require: true,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Methods
 */
UserSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'avatar', 'token', 'date'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

module.exports = User = mongoose.model('User', UserSchema);
