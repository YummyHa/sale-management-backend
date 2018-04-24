import express from 'express';
import dbConfig from './config/db';
import middlewaresConfig from './config/middlewares';
import { CategoryRoutes, ProductRoutes, UserRoutes } from './modules';

const app = express();

/**
 * Database
 */
dbConfig();

/**
 * Middlewares
 */
middlewaresConfig(app);

app.use('/api', [CategoryRoutes, ProductRoutes, UserRoutes]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } {
    console.log(`App listening on port: ${PORT}`);
  }
});
