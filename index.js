import dotenv from 'dotenv';
import express from 'express';
import genresRouter from './src/genres';
import buildDependencies from "./src/config/dependencies";
import createAccountsRouter from './src/accounts/routes';
import createMoviesRouter from './src/movies/routes';

dotenv.config();

const dependencies = buildDependencies();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/genres', genresRouter);
app.use('/api/accounts', createAccountsRouter(dependencies));

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
