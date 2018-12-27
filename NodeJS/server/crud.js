var Usuario = require('./users.js')
var Evento = require('./events.js')

module.exports.CrearUsuarioDemo = function (callback) {
    var arr = [{ email: "sara@email.com", user: "Sara Hincapie", password: "123456"}, { email: "rafa@email.com", user: "Rafael Molina", password: "familiaHM"}];
    try {
        Usuario.insertMany(arr)
    } catch (error) {
        console.log(error.message + "Los usuarios no fueron registrados");
    }
}

module.exports.CrearEventoDemo = function (callback) {
    var arr = [{ title: "Navidad en Familia", start: "2018-12-20T12:30:00", fk_usuario: "sara@email.com" }, { title: "Almuerzo especial", start: "2018-12-21", end: "2018-12-21T15:00:00", fk_usuario: "sara@email.com" }, { title: "Navidad", start: "2018-12-24", fk_usuario: "rafa@email.com" }, { title: "Paseo", start: "2018-12-22T08:30:00", end: "2018-12-25", fk_usuario: "rafa@email.com" }, { title: "Regalos con la Suegra", start: "2018-12-20T19:00:00", end: "2018-12-20T22:00:00", fk_usuario: "rafa@email.com" }];
    try {
        Evento.insertMany(arr)
    } catch (error) {
        console.log(error.message + "Los eventos no fueron registrados");
    }
}