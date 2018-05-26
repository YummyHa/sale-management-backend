import express from 'express';
import dbConfig from './config/db';
import cors from 'cors';
import middlewaresConfig from './config/middlewares';
import { CategoryRoutes, ProductRoutes, UserRoutes , AdmnRoutes, BranchRoutes} from './modules';

const app = express();
app.use(cors());
/**
 * Database
 */
dbConfig();

/**
 * Middlewares
 */
middlewaresConfig(app);

app.use('/api', [CategoryRoutes, ProductRoutes, UserRoutes , AdmnRoutes, BranchRoutes]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } {
    console.log(`App listening on port: ${PORT}`);
  }
});
