const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
    username: { type: String, required: true, unique: true },
    local: {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }
    },
    avatar: { type: String, default: '/images/avatars/no-photo.png' },
    following: [{type: schema.Types.ObjectId, ref: 'user'}]
});

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hash(password, 12);
}

userSchema.methods.comparePassword = function(password) { // on peut pas utiliser function flechée a cause de this
  return bcrypt.compare(password, this.local.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;