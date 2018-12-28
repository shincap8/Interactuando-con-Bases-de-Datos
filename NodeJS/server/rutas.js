const Router = require('express').Router();
const Usuario = require('./users.js');
const Evento = require('./events.js');
const Operaciones = require('./crud.js');

//Verificar si existe la base de Datos
Usuario.find({}).countDocuments({}, function(err, count) {
    if (count>0) {
        console.log("Ya existen usuarios en la base de datos");
        
    }else {
        Operaciones.CrearUsuarioDemo((error, result) =>{ 
            if(error){
                res.send(error);
            }else{
                res.send(result);
            }
        }) 
    }
})

Evento.find({}).countDocuments({}, function (err, count) {
    if (count > 0) {
        console.log("Ya existen eventos en la base de datos");
    } else {
        Operaciones.CrearEventoDemo((err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    }
})

//validar formulario de inicio de sesion
Router.post('/login', function(req,res){
    let user =  req.body.user
    let password = req.body.pass,
    sess = req.session;
    Usuario.find({email: user}).countDocuments({}, function(err, count){
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            if(count == 1){
                Usuario.find({email: user, password: password}).countDocuments({}, function(err, count){
                    if(err){
                        res.status(500);
                        res.json(err);
                    }else{
                        if (count == 1) {
                            sess.user = req.body.user;
                            res.send("Validado");
                        }else{
                            res.send("Contraseña incorrecta");
                        }
                    }
                })
            } else{
                res.send("Usuario no registrado");
            }
        }
    })
})

//Obtener todos los eventos del usuario logueado
Router.get('/all', function (req, res) {
    req.session.reload(function (err) {
        if (req.session.user) {
            if (err) {
                res.send('logout');
                res.end();
            } else {
                Usuario.find({ email: req.session.user }).exec({}, function (err, doc) {
                    if (err) {
                        res.send('logout');
                    } else {
                        Evento.find({ fk_usuario: req.session.user }).exec({}, function (err, doc) {
                            if (err) {
                                res.status(500);
                                res.json(err);
                            }
                            res.json(doc);
                        })
                    }
                })
            }
        } else {
            res.send('logout');
            res.end();
        }
    })
})

//Crear eventos
Router.post('/new', function (req, res) {
    if (req.session.user) {
            let title = req.body.title,
            start = req.body.start,
            end = req.body.end,
            start_hour = req.body.start_hour,
            end_hour = req.body.end_hour,
            fk_usuario = req.session.user

        let evento = new Evento({
            title: title,
            start: start,
            end: end,
            start_hour: start_hour,
            end_hour: end_hour,
            fk_usuario: fk_usuario
        });

        evento.save(function (err, doc) {
            if (err) {
                res.status(500);
                res.json(err);
        }
            res.json(doc);
        });
    } else{
        res.send('logout');
    }
})

//Eliminar eventos
Router.post('/delete/:id', function (req, res) {
    let uid = req.params.id;
    req.session.reload(function (err) {
        if(err){
            console.log(err);
            res.send("logout");
        }else{
            Evento.deleteOne({ _id: uid }, function (err) {
                if (err) {
                    res.status(500);
                    res.json(err);
                }
                res.send("El evento ha sido eliminado exitosamente")
            })
        }
    })
        
})

//Actualizar Evento
Router.post('/update', function (req, res) {
    Evento.findOneAndUpdate({_id:req.body.id},
        {
            $set: {
                start: req.body.start,
                end: req.body.end
            }
        }, function (err) {
            if (err) {
                res.status(500);
                res.send(err);
            }
            res.send("Evento Actualizado")
        })
})


module.exports = Router