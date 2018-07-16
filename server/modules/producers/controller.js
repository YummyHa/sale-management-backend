import _ from 'lodash';
import Producer from './model';

// create a new producer
export const createProducer = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const newProducer = new Producer({ name, address, phone });

    newProducer._creator = req.user._id;

    var producer = await newProducer.save()
    return res.status(201).send({ producer });
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

// get all producers
export const getProducers = async (req, res) => {
  try {
    var producers = await Producer.find({ _creator: req.user._id })
    if (!producers) {
      throw new Error('No producers was found with this user')
    }

    return res.status(200).json(producers);
  } catch (e) {
    return res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

// delete a producer
export const deleteProducer = async (req, res) => {
  try {
    const id = req.body.id;
    var producer = await Producer.findByIdAndRemove(id);
    if (!producer) res.status(404).send();
      else res.send({ producer });
  } catch (e) {
    res.status(e.status || 404).json({ err: true, message: e.message });
  }
}

// update customer
export const updateProducer = async (req, res) => {
  try {
    const id = req.body.id;
    var body = _.pick(req.body, ['name', 'address', 'phone']);

    var producer = await Producer.findByIdAndUpdate(id, {$set: body}, {new: true});
    if (!producer) res.status(404).send();
      else res.send({ producer });
  } catch (err) {
    res.status(e.status || 400).json({ err: true, message: e.message });
  }
}
