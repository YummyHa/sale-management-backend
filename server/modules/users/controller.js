import mongoose from 'mongoose';
import _ from 'lodash';

import User from './model';

/**
 * POST user
 */
export const createUser = async (req, res) => {
  const body = _.pick(req.body, ['email', 'password', 'shop_name', 'address', 'phone_number']);
  const user = new User(body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

export const authenticateUser = async (req, res) => {
  res.send(req.user);
}

