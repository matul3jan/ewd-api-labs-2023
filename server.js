import db from './src/config/db';

require('dotenv').config();

db.init().then(() => {
    const app = require('./app');
    const port = process.env.PORT;
    app.listen(port, () => console.info(`Server running at ${port}`));
}).catch((err) => {
    console.log(err);
});