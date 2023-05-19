import db from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

db.init().then(async () => {
    const app = (await import('./app.js')).default;
    const port = process.env.PORT;
    app.listen(port, () => console.info(`Server running at ${port}`));
}).catch((err) => {
    console.log(err);
});