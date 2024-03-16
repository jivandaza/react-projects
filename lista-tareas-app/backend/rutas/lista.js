import express from 'express';
import Usuario from './../modelos/usuario.js';
import Lista from './../modelos/lista.js';

const ruta = express.Router();

// AGREGAR TAREA
ruta.post('/agregarTarea', async (req, res) => {
    try {
        const { titulo, estado, id } = req.body;

        const existeUsuario =
            await Usuario.findById(id)
                .catch((err) => console.error(err.message));

        if ( !existeUsuario ) {
            return res.status(200).json({
                message: 'El usuario no esta registrado',
                err: true
            });
        } else {
            const lista = new Lista({ titulo, estado, usuario: existeUsuario });
            await lista.save().then(() => res.status(200).json({ lista, err: false }));
            existeUsuario.lista.push(lista);
            existeUsuario.save();
        }
    } catch(err) {
        console.error(err);

        return res.status(500).json({
            message: 'Ocurrió un error al agregar una tarea'
        });
    }
});

// EDITAR TAREA
ruta.put('/editarTarea/:id', async (req, res) => {
   try {
       const { titulo, correo } = req.body;

       if ( !titulo ) {
           return res.status(400).json({
               message: 'El titulo esta vació'
           });
       } else if ( !correo ) {
           return res.status(400).json({
               message: 'El correo electrónico esta vació'
           });
       }

       const existeUsuario = await Usuario.findOne({ correo });

       if ( !existeUsuario ) {
           return res.status(400).json({
               message: 'El usuario no existe'
           });
       } else {
           const lista = await Lista.findByIdAndUpdate(req.params.id, { titulo });
           lista.save().then(() => res.status(200).json({
               message: 'La tarea se ha editado'
           }));
       }
   } catch (err) {
       console.error(err);

       return res.status(500).json({
           message: 'Ocurrió un error al editar una tarea'
       });
   }
});

// CAMBIAR ESTADO DE TAREA
ruta.put('/cambiarEstadoTarea/:id', async (req, res) => {
   try {
       const { id } = req.body;

       const existeUsuario = await Usuario.findById({ _id: id });

       if ( existeUsuario ) {
           const { estado } = await Lista.findOne({ _id: req.params.id });
           const nuevoEstado = !estado;

           const lista = await Lista.findByIdAndUpdate(req.params.id, { estado: nuevoEstado });

           lista.save().then(() => res.status(200).json({
               message: nuevoEstado ? 'La tarea se realizo' : 'La tarea no se realizo'
           }));
       }
   } catch(err) {
       console.error(err);

       return res.status(500).json({
           message: 'Ocurrió un error al cambiar el estado de una tarea'
       });
   }
});

// REMOVER TAREA
ruta.delete('/removerTarea/:id', async (req, res) => {
   try {
       const { id } = req.body;

       const existeUsuario = await Usuario.findByIdAndUpdate(id, {
           $pull: { lista: req.params.id }
       });

       if ( existeUsuario ) {
           await Lista.findByIdAndDelete(req.params.id).then(() =>
               res.status(200).json({ message: 'La tarea se removió' })
           );
       }
   }  catch (err) {
       console.error(err);

       return res.status(500).json({
           message: 'Ocurrió un error al remover una tarea'
       });
   }
});

// OBTENER TAREAS DE UN USUARIO
ruta.get('/obtenerTareas/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const existeUsuario =
            await Usuario.findById(id)
                .catch((err) => console.error(err.message));

        if ( !existeUsuario ) {
            return res.status(200).json({
                message: 'Se ha cerrado la sesión...',
                err: true
            });
        } else {
            const lista = await Lista.find({ usuario: req.params.id }).sort({ createdAt: -1 });
            if ( lista.length !== 0 ) {
                return res.status(200).json({ lista });
            }
        }
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: 'Ocurrió un error al obtener todas las tareas'
        });
    }
});

export default ruta;