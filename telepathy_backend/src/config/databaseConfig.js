import { connect } from "mongoose";

const databaseConfig = async () => {
    try {
        const mongoDbConnection = await connect(process.env.MONGO_URI);
        console.log(`✅ Database connected: ${mongoDbConnection.connection.host}`);
    } catch (error) {
        console.error(`❌ Database connection failed:`, error.message);
        process.exit(1);
    }
};

export default databaseConfig;