import mongoose from "mongoose";

const connectDB = async () => {
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
console.error("MONGO_URI is missing. Set it in src/.env before starting the server.");
process.exit(1);
}

try {

await mongoose.connect(mongoUri);

console.log("MongoDB Connected");

} catch (error) {

console.error(error);
process.exit(1);

}

};

export default connectDB;