import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import veterinarioRoutes from "./src/routes/veterinarioRoutes.js"

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

app.use("/veterinario", veterinarioRoutes);

app.listen(PORT, () => {
    console.table("servidor funcionando");
});


