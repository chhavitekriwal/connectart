const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("Database connected");
    }
    catch(err) {
        console.log(err.message);
    }
}

module.exports = connectDB;