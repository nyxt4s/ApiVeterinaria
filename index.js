import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import veterinarioRoutes from "./src/routes/veterinarioRoutes.js";
import pacienteRoutes from "./src/routes/pacienteRoutes.js";
import cors from 'cors';


const app = express();
app.use(express.json());
dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

const dominiosPermitidos = [process.env.FRONTURL]


const corsOption = {
    origin: function(origin, callback) {
        if (dominiosPermitidos.indexOf(origin) ==! -1){
            callback(null, true);
        }else {
            callback(null, true);
            // callback(new Error('dominio no permitido'));
        }
    }
}

app.use(cors(corsOption));

app.use("/veterinario", veterinarioRoutes);
app.use("/pacientes", pacienteRoutes);


app.listen(PORT, () => {
    console.table("servidor funcionando");
});


