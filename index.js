import dotenv from 'dotenv';
import express from 'express';

import db from './src/config/db';
import buildDependencies from "./src/config/dependencies";
import errorHandler from './src/utils/ErrorHandler';
import createAccountsRouter from './src/accounts/routes';
import createMoviesRouter from './src/movies/routes';
import createGenresRouter from './src/genres/routes';

dotenv.config();
db.init();

const dependencies = buildDependencies();
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/genres', createGenresRouter(dependencies));

app.use(errorHandler); // Keep it last to catch all errors that may occur in the middleware stack

app.listen(port, () => console.info(`Server running at ${port}`));