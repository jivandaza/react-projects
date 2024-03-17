import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    correo: {
        type: String,
        required: true,
        unique: true
    },
    nombreUsuario: {
        type: String,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    lista: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Lista'
        }
    ]
});

export default mongoose.model("Usuario", usuarioSchema);