import express from 'express';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';
import path from 'path';
import { readFileSync } from "fs";
import { fileURLToPath } from 'url';

import buildDependencies from "./src/config/dependencies.js";
import errorHandler from './src/utils/ErrorHandler.js';
import createAccountsRouter from './src/accounts/routes/index.js';
import createMoviesRouter from './src/movies/routes/index.js';
import createGenresRouter from './src/genres/routes/index.js';
import createLanguagesRouter from './src/languages/routes/index.js';
import createArtistsRouter from './src/artists/routes/index.js';

const openApiDocumentation = JSON.parse(readFileSync("./openapi.json"));

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
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'tests', 'test-report.html');
    res.sendFile(filePath);
});

app.use(errorHandler); // Keep it last to catch all errors that may occur in the middleware stack

export default app;