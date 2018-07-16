import mongoose from 'mongoose';
import _ from 'lodash';

import { User } from './model';

/**
 * POST user
 */
export const createUser = async (req, res) => {
  try {
    var body = _.pick(req.body, ['email', 'password', 'shop_name', 'address', 'phone_number', '_branch', 'user_name', '_admin']);
    var user = new User(body);
    console.log(user);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

export const loginUser = async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (err) {
    res.status(400).send();
  }
}

export const logoutUser = async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
}

export const authenticateUser = async (req, res) => {
  res.send(req.user);
}

// update User
export const updateUser = async (req, res) => {
  try {
    var body = _.pick(req.body, ['email', 'shop_name', 'address', 'phone_number', '_branch', 'user_name', '_admin']);

    var user = await User.findByIdAndUpdate(req.user._id, {$set: body}, {new: true});
    if (!user) res.status(404).send();
      else res.send({ user });
  } catch (err) {
    res.status(err.status || 400).json({ err: true, message: err.message });
  }
}

// update User by admin
export const updateUserByAdmin = async (req, res) => {
  try {
    var id = req.params.id;
    var body = _.pick(req.body, ['email', 'shop_name', 'address', 'phone_number', '_branch', 'user_name', '_admin']);

    var user = await User.findByIdAndUpdate(id, {$set: body}, {new: true});
    if (!user) res.status(404).send();
      else res.send({ user });
  } catch (err) {
    res.status(err.status || 400).json({ err: true, message: err.message });
  }
}
