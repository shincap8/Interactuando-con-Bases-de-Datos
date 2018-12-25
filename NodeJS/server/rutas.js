const Router = require('express').Router();
const Usuario = require('./users.js');
const Evento = require('./events.js');
const Operaciones = require('./crud.js');
let ObjectId = require('mongoose').Types.ObjectId;

//Verificar si existe la base de Datos
Usuario.find({}).count({}, function(err, count) {
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

Evento.find({}).count({}, function (err, count) {
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
    let password = req.body.password,
    sess = req.session;
    Usuario.find({user: user}).count({}, function(err, count){
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            if(count == 1){
                Usuario.find({user: user, password: password}).count({}, function(err, count){
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
                Usuario.find({ user: req.session.user }).exec({}, function (err, doc) {
                    if (err) {
                        res.send('logout');
                    } else {
                        Evento.find({ fk_usuario: req.session.email_user }).exec({}, function (err, doc) {
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
    req.session.reload(function (err) {
        if (err) {
            console.log(err);
            res.json('logout');
        } else {
            Usuario.findOne({ user: req.session.user }).exec({}, function (err, doc){
                Evento.nextCount(function (err, count) {
                    newID = count;
                });

                let title = req.body.title,
                    start = req.body.start,
                    end = req.body.end,
                    start_hour = req.body.start_hour,
                    end_hour = req.body.end_hour,
                    fk_usuario = req.session.email_user
                
                let evento = new Evento({
                    title: title,
                    start: start,
                    end: end,
                    start_hour: start_hour,
                    end_hour: end_hour,
                    fk_usuario: fk_usuario
                })

                evento.save(function(err){
                    if (err){
                        console.log(err);
                        res.json(err);
                    }
                    res.json(newID)
                    res.send("El evento ha sido guardado exitosamente")
                })
            })
        }
    })
})

//Eliminar eventos
Router.post('/delete/:_id', function (req, res) {
    let id = req.params._id; 
    req.session.reload(function (err) {
        if (err) {
            console.log(err);
            res.send("logout");
        }else{
            Evento.remove({_id: id}, function(err){
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.json(err);
                }
                res.send("El evento ha sido eliminado exitosamente")
            })
        }
    })
})

//Actualizar Evento
Router.post('/update/:_id&:start&:end', function (req, res) {
    req.session.reload(function(err){
        if(err){
            console.log(err)
            res.send("logout")
        }else{
            Evento.find({_id:req.params._id}).exec((error, result) => {
                let id = req.params._id,
                start = req.params.start,
                end = req.params.end
                if (err) {
                    res.send(err)
                }else{
                    Evento.update({_id: id}, {start:start, end:end}, (err, res)=>{
                        if(err){
                            res.send(err)
                        }else{
                            res.send("El evento ha sido actualizado exitosamente")
                        }
                    })
                }
            })
        }
    })
})


module.exports = Router