import express from 'express';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';
import path from 'path';

import openApiDocumentation from "./openapi.json";
import buildDependencies from "./src/config/dependencies";
import errorHandler from './src/utils/ErrorHandler';
import createAccountsRouter from './src/accounts/routes';
import createMoviesRouter from './src/movies/routes';
import createGenresRouter from './src/genres/routes';
import createLanguagesRouter from './src/languages/routes';
import createArtistsRouter from './src/artists/routes';

const dependencies = buildDependencies();
const app = express();
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' })
    ]
});

// Middleware to log requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/genres', createGenresRouter(dependencies));
app.use('/api/languages', createLanguagesRouter(dependencies));
app.use('/api/artists', createArtistsRouter(dependencies));

// Route to serve the test report
app.get('/test-report', (req, res) => {
    const filePath = path.join(__dirname, 'tests', 'test-report.html');
    res.sendFile(filePath);
});

app.use(errorHandler); // Keep it last to catch all errors that may occur in the middleware stack

module.exports = app;