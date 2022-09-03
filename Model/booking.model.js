const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    slots: { type: String, requared: true },
    patientid: { type: String, requared: true },
    dbuid: { type: [String], requared: true },
    duration: { type: [Date], required: true }

},
    {
        timestamps: true,
    });
const Hospital = mongoose.model('Hospital', bookingSchema);
module.exports = Hospital;