import mongoose from "mongoose";
import generarID from "../../helpers/generarId.js";
import bcrypt from "bcrypt";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    instagram:{
       type: String,
       default: null,
        
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarID()
    },
    confirmado: {
        type:Boolean,
        default: false
    }
});

veterinarioSchema.pre('save', async function(next) {
if (!this.isModified("password")){
    next();
}
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

export default Veterinario;