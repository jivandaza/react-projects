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

       return res.status(400).json({
           message: 'Ocurrió un error al editar una tarea'
       });
   }
});

// CAMBIAR ESTADO DE TAREA
ruta.put('/cambiarEstadoTarea/:id', async (req, res) => {
   try {
       const { correo } = req.body;

       if ( !correo ) {
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
           const id = req.params.id;
           const { estado } = await Lista.findOne({ _id: id });
           const nuevoEstado = !estado;

           const lista = await Lista.findByIdAndUpdate(req.params.id, { estado: nuevoEstado });

           lista.save().then(() => res.status(200).json({
               message: 'El estado de la tarea se ha cambiado'
           }));
       }
   } catch(err) {
       console.error(err);

       return res.status(400).json({
           message: 'Ocurrió un error al cambiar estado de una tarea'
       });
   }
});

// REMOVER TAREA
ruta.delete('/removerTarea/:id', async (req, res) => {
   try {
       const { correo } = req.body;

       if ( !correo ) {
           return res.status(400).json({
               message: 'El correo electrónico esta vació'
           });
       }

       const id = req.params.id;
       const existeUsuario = await Usuario.findOneAndUpdate(
           { correo },
           { $pull: { lista: id } }
       );

       if ( !existeUsuario ) {
           return res.status(400).json({
               message: 'El usuario no existe'
           });
       } else {
            await Lista.findByIdAndDelete(id).then(() =>
                res.status(200).json({ message: 'La tarea se ha removido' })
            );
       }
   }  catch (err) {
       console.error(err);

       return res.status(400).json({
           message: 'Ocurrió un error al remover una tarea'
       });
   }
});

// OBTENER TAREAS DE UN USUARIO
ruta.get('/obtenerTareas/:id', async (req, res) => {
    const lista = await Lista.find({ usuario: req.params.id }).sort({ createdAt: -1 });
    if ( lista.length !== 0 ) {
        return res.status(200).json({ lista });
    } else {
        return res.status(200).json({ message: 'No se encontraron tareas' });
    }
});

export default ruta;