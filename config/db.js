import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const db = await mongoose.connect(
            process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        const url =  `${db.connection.host}:${db.connection.port}`


    } catch (error){
        console.log("ocurrio un error : ", error);
        process.exit(1); 
    }
}

export default connectDB;