import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  }, 
  shop_name: {
    type: String,
    required: true,
    minlength: 1
  },
  address: {
    type: String,
    trim: true,
    required: true,
    minlength: 1
  },
  phone_number: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true,
    required: true,
    validate: {
      validator: (phone) => { 
        return validator.isMobilePhone(phone, 'any');
      },
      message: '{VALUE} is not a valid phone number'
    }
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

/**
 * Pick necessary values to return
 * this case _id, email, shop_name, address and phone_number
 */
UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email', 'shop_name', 'address', 'phone_number']);
}

/**
 * generate auth token
 * then return that token
 */
UserSchema.methods.generateAuthToken = async function() {
  var user = this;

  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access }, 'asd123').toString();

  user.tokens.push({ access, token });

  await user.save();
  return token;
}

/**
 * find user by token
 * @param {String} token 
 */
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded = undefined;

  try {
    decoded = jwt.verify(token, 'asd123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

var User = mongoose.model('User', UserSchema);

export { User };
