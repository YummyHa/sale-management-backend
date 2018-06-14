var env = process.env.NODE_ENV || 'development';
console.log('env ****', env);

var mongo_uri = 'mongodb+srv://hakhanh1106:Kh@nh135246789@sale-management-7i5if.mongodb.net/test?retryWrites=true';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/SaleManagement';
} else {
  process.env.MONGODB_URI = mongo_uri;
}

import mongoose from 'mongoose';

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection
    .once('open', () => console.log('MongoDB running'))
    .on('error', err => console.error(err))
};
