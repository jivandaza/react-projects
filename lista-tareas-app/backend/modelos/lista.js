import mongoose from 'mongoose';

const listaSchema = new mongoose.Schema({
   titulo: {
       type: String,
       required: true
   },
   estado: {
       type: Boolean,
       required: true
   }
});

export default mongoose.model("Lista", listaSchema);