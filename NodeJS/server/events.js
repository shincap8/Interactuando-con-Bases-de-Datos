const mongoose = require('mongoose'),
      Schema = mongoose.Schema

let EventSchema = new Schema({
          title: { type: String, required: true },
          start: { type: String, required: true},
          end: { type: String, required: false},
          fk_usuario: {type: String, required: true}
      })

let EventoModel = mongoose.model('Evento', EventSchema)

module.exports = EventoModel