import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connection = {};

const connect = async () => {
    if (connection.isConnected) {
        console.log("Using existing connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("MongoDB new connection");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
};

const disconnect = async () => {
    try {
        if (connection.isConnected) {
            await mongoose.disconnect();
            connection.isConnected = false;
            console.log("MongoDB disconnected");
        }
    } catch (error) {
        console.error("Error disconnecting to MongoDB", error);
    }
};

const convertDocToObj = doc => {
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc;
};

const db = { connect, disconnect, convertDocToObj };
export default db;
