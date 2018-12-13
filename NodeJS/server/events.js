const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      autoIncrement = require('mongoose-auto-increment');

let EventSchema = new Schema({
          title: { type: String, required: true },
          start: { type: String, required: true},
          all_day: { type: Boolean, required: true },
          end: { type: String, required: false},
          start_hour: { type: String, required: false},
          end_hour: { type: String, required: false},
          fk_usuario: {type: String, required: true}
      })

autoIncrement.initialize(connection)
EventSchema.plugin(autoIncrement.plugin, {model: 'Evento', startAt: 1});

let EventoModel = mongoose.model('Evento', EventSchema)

module.exports = EventoModel