var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: {
        type: String,
        default: 'NULL'
    },
    name: {
        type: String,
        default: 'NULL'
    },
    email: {
        type: String,
        default: 'NULL'
    },
    password: {
        type: String,
        default: 'NULL'
    },
    phone: {
        type: String,
        default: 'NULL'
    },
    avatar: String
});

userSchema.methods.comparePassword = function(_password) {
  return bcrypt.compareSync(_password, this.password);
};

module.exports = mongoose.model('user', userSchema, 'user');
