const mongoose = require('mongoose'),
      Schema = mongoose.Schema

let EventSchema = new Schema({
          title: { type: String, required: true },
          start: { type: String, required: true},
          all_day: { type: Boolean, required: true },
          end: { type: String, required: false},
          start_hour: { type: String, required: false},
          end_hour: { type: String, required: false},
          fk_usuario: {type: String, required: true}
      })

let EventoModel = mongoose.model('Evento', EventSchema)

module.exports = EventoModel