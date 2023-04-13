import mongoose from 'mongoose';

export default {

    async init() {
        if (process.env.DATABASE_DIALECT === "mongo") {

            const connection = mongoose.connection;
            connection.on('error', (err) => console.error(`database connection error: ${err}`));
            connection.on('disconnected', () => console.info('database disconnected'));
            connection.once('open', async () => {
                console.info(`database connected to ${connection.name} on ${connection.host}`);
                // Delete the collections in development mode
                if (process.env.NODE_ENV == "development") {
                    const collections = await connection.db.listCollections().toArray();
                    collections.forEach((c) => connection.dropCollection(c.name));
                    console.info("Cleared all collections!");
                }
            });

            mongoose.connect(process.env.DATABASE_URL);
        }
    }
};