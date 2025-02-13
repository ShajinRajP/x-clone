import mongoose from "mongoose";

const coonectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected");

    } catch(error){
        console.log(`Error in connecting DB: ${error} `)
        process.exit(1);
    }
    
    
}

export default coonectDB;