const mongoose = require('mongoose');
const connectDB=async()=>{
    let con = await mongoose.connect("mongodb://localhost:27017/blogsDB");
    console.log(`connection successfullly : ${con.connection.host}`);
    return con;
}

module.exports = connectDB;